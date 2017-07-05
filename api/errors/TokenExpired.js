const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor (content) {
    super('Token expired.', 'token_expired', 401, content)
  }
}
