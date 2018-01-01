const fs = require('fs');
const {
  EnvPlugin,
  FuseBox,
  Sparky,
  UglifyJSPlugin,
  BabelPlugin,
  CSSModules,
  CSSPlugin,
  SassPlugin,
  ImageBase64Plugin,
} = require('fuse-box');
const path = require('path');

const babelrc = fs.readFileSync('./.babelrc');
const pkg = require('./package.json');

const envVars = {
  VERSION: pkg.version,
  NODE_ENV: 'development',
  YEAR: new Date().getFullYear(),
};

// require('fuse-box/modules/fuse-box-css')
let serverBundle;
let clientBundle;
let fuse;
let options = [];

const directory = {
  homeDir: 'src',
  outFolder: 'build',
  js: 'js',
};

Sparky.task('default', ['clean', 'version-file', 'options', 'build', 'start', 'run'], () => {
  //
});

Sparky.task('start-prod', ['set-prod', 'clean', 'version-file', 'options', 'build', 'start', 'run'], () => {
  //
});

Sparky.task('prod-build', ['set-prod', 'clean', 'version-file', 'options', 'build', 'run'], () => {
  //
});

Sparky.task('set-prod', () => {
  envVars.NODE_ENV = 'production';
});

Sparky.task('clean', () => Sparky.src(`${directory.outFolder}/*`).clean(`${directory.outFolder}`));

Sparky.task('version-file', () => {
  const outputDir = path.join(__dirname, directory.outFolder);
  const pubDir = path.join(outputDir, 'public');
  const versionFilePath = path.join(pubDir, 'version.json');
  fs.mkdirSync(outputDir);
  fs.mkdirSync(pubDir);
  fs.writeFileSync(versionFilePath, JSON.stringify({ version: envVars.VERSION }, undefined, 4));
});
Sparky.task('options', () => {
  options = {
    homeDir: directory.homeDir,
    output: `${directory.outFolder}/$name.js`,
    cache: envVars.NODE_ENV !== 'production',
    hash: false,
    plugins: [
      EnvPlugin(envVars),
      [SassPlugin(), CSSModules(), CSSPlugin()],
      BabelPlugin({
        config: Object.assign({}, { sourceMaps: true }, JSON.parse(babelrc)),
      }),
      ImageBase64Plugin(),
    ],
    globals: {
      default: {
        'aaa': 'ajoi'
      },
    },
  };
});

Sparky.task('build', () => {
  if (envVars.NODE_ENV === 'production') {
    options.plugins.push(
      UglifyJSPlugin(),
    );
  }

  fuse = FuseBox.init(options);

  clientBundle = fuse.bundle(`public/${directory.js}/vendor`).instructions('~client.js');

  // Server Bundle
  serverBundle = fuse.bundle('server').splitConfig({
    server: `build/public/${directory.js}`,
    dest: `public/${directory.js}`,
  });

  // Client Bundle
  clientBundle = fuse.bundle(`public/${directory.js}/bundle`).splitConfig({
    browser: `/${directory.js}`,
    dest: `public/${directory.js}`,
  });

  serverBundle.instructions(' > [server.js] + process + fuse-box-css')
    .completed(() => {
      console.log('\x1b[36m%s\x1b[0m', 'server bundled');
    });
  clientBundle.instructions('!> [client.js]')
    .completed(() => {
      console.log('\x1b[36m%s\x1b[0m', 'client bundled');
    });
});

Sparky.task('start', () => {
  if (envVars.NODE_ENV === 'development') {
    fuse.dev({ hmr: true, httpServer: false });
    serverBundle.watch('server/**');
    clientBundle.hmr().watch();
  }

  serverBundle.completed(proc => proc.start());
});

Sparky.task('run', async () => {
  const producer = await fuse.run();
  const bundle = producer.bundles.get(`public/${directory.js}/bundle`);
  const vendor = producer.bundles.get(`public/${directory.js}/vendor`);
  const bundles = {
    bundle: bundle.context.output.lastGeneratedFileName,
    vendor: vendor.context.output.lastGeneratedFileName,
  };
  const outputDir = path.join(__dirname, directory.outFolder);
  fs.writeFileSync(path.join(outputDir, 'bundles.json'), JSON.stringify(bundles));
});
