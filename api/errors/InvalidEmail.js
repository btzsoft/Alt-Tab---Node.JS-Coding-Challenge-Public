const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor (content) {
    super('Not a valid email.', 'not_valid_email', 401, content)
  }
}
