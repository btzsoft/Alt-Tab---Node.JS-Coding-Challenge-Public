const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor (content) {
    super('Token not exist.', 'token_not_found', 404, content)
  }
}
