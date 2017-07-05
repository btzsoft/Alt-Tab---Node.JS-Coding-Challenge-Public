const ExtendableError = require('./ExtendableError')

module.exports = class extends ExtendableError {
  constructor (content) {
    super('User not exists.', 'user_not_exists', 404, content)
  }
}
