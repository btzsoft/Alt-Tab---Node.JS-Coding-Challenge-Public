const is = require('is_js')
const jwt = require('jsonwebtoken')
const {JWT_SECRET, JWT_OPTIONS} = require('api/config')
const InvalidEmailError = require('api/errors/InvalidEmail')
const InvalidPasswordError = require('api/errors/InvalidPassword')
const UserModel = require('api/models/user')
const TokenModel = require('api/models/token')

/**
 * Signup User
 * @param name {String}
 * @param email {String}
 * @param password {String}
 * @returns {Promise.<Object>} Token Model
 */
module.exports = (name, email, password) => {

  if (is.not.email(email)) throw new InvalidEmailError()
  if (is.not.existy(password) || is.empty(password)) throw new InvalidPasswordError()

  return new UserModel({
    name,
    email,
    password,
  })
  .save()
  .then(userModel => {
    const token = jwt.sign(userModel, JWT_SECRET, JWT_OPTIONS)
    return new TokenModel({
      user_id: userModel._id,
      token,
    })
    .save()
  })
}
