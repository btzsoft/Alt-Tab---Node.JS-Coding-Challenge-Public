const is = require('is_js')
const InvalidTokenError = require('api/errors/InvalidToken')
const TokenModel = require('api/models/token')

/**
 * Logout User
 * @param token {String}
 * @returns {Promise.<Object>}
 */
module.exports = (token) => {

  if (is.not.existy(token) || is.empty(token)) throw new InvalidTokenError()

  return TokenModel
  .update({token}, {$set: {status: 'inactive'}})
  .exec()
}
