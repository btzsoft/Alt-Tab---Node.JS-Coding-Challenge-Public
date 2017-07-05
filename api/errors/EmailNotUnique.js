const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor (content) {
    super('Email must be unique.', 'email_not_unique', 409, content)
  }
}
