import process from 'process';

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[(process && process.env.NODE_ENV) || 'development'];

export default Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 4001,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3030,
}, environment);
