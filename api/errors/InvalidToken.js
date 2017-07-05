const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor (content) {
    super('Not a valid token.', 'not_valid_token', 401, content)
  }
}
