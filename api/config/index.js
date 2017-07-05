const merge = require('deepmerge')
let config = require('./default')

switch (process.env.NODE_ENV) {
  case 'production':
    config = merge(config, require('./production'))
    break
  case 'test':
    config = merge(config, require('./test'))
    break
  default:
    config = merge(config, require('./development'))
    break
}

module.exports = config
