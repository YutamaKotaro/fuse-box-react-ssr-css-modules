#!/usr/bin/env node
require('../server.babel') // babel registration (runtime transpilation for node)
var path = require('path')
var rootDir = path.resolve(__dirname, '..')

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (global.__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return
  }
}

require('../src/server')
