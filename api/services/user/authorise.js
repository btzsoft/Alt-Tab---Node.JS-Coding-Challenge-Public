const is = require('is_js')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('api/config')
const InvalidTokenError = require('api/errors/InvalidToken')
const UserNotExistsError = require('api/errors/UserNotExists')
const TokenExpiredError = require('api/errors/TokenExpired')
const TokenNotExistsError = require('api/errors/TokenNotExists')
const UserModel = require('api/models/user')
const TokenModel = require('api/models/token')

/**
 * Authorisation based on token
 * @description Authorise user with token and returns user object
 * @param token {String}
 * @returns {Promise.<Object>}
 */
module.exports = (token) => {

  if (is.not.existy(token) || is.empty(token)) throw new InvalidTokenError()

  try {
    jwt.verify(token, JWT_SECRET)
  } catch (e) {
    throw new InvalidTokenError(e)
  }

  return TokenModel
  .findOne({token})
  .exec()
  .then(tokenModel => {
    if (!tokenModel) {
      throw new TokenNotExistsError(token)
    }
    if (tokenModel.status !== 'active') {
      throw new TokenExpiredError(token)
    }
    return UserModel
    .findOne({_id: tokenModel.user_id})
    .exec()
    .then(userModel => {
      if (!userModel) {
        throw new UserNotExistsError()
      }
      return userModel
    })
  })
}
