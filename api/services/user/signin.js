const is = require('is_js')
const jwt = require('jsonwebtoken')
const {JWT_SECRET, JWT_OPTIONS} = require('api/config')
const InvalidEmailError = require('api/errors/InvalidEmail')
const InvalidPasswordError = require('api/errors/InvalidPassword')
const UserNotExistsError = require('api/errors/UserNotExists')
const UserModel = require('api/models/user')
const TokenModel = require('api/models/token')

/**
 * Signin User
 * @param email {String}
 * @param password {String}
 * @returns {Promise.<Object>} Token Model
 */
module.exports = (email, password) => {

  if (is.not.email(email)) throw new InvalidEmailError()
  if (is.not.existy(password) || is.empty(password)) throw new InvalidPasswordError()

  return UserModel
  .findOne({email, status: 'active'})
  .exec()
  .then(userModel => {
    if (!userModel) {
      throw new UserNotExistsError()
    }
    return userModel
    .comparePassword(password)
    .then(isMatch => {
      if (!isMatch) {
        throw new InvalidPasswordError()
      }
      const token = jwt.sign(userModel, JWT_SECRET, JWT_OPTIONS)
      return new TokenModel({
        user_id: userModel._id,
        token,
      })
      .save()
    })
  })
}
