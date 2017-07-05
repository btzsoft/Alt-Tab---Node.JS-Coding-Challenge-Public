const express = require('express')
const router = express.Router()

const signup = require('api/services/user/signup')
const signin = require('api/services/user/signin')
const logout = require('api/services/user/logout')

router.post('/signup', (req, res, next) => {
  const {name, email, password} = req.body

  signup(name, email, password)
  .then(result => res.send({
    token: result.token,
  }))
  .catch(next)
})

router.post('/signin', (req, res, next) => {
  const {email, password} = req.body

  signin(email, password)
  .then(result => res.send({
    token: result.token,
  }))
  .catch(next)
})

router.post('/logout', (req, res, next) => {
  req
  .auth()
  .then(() => {
    return logout(req.session.token)
  })
  .then(result => res.send({
    status: 'success',
  }))
  .catch(next)
})

router.get('/profile', (req, res, next) => {
  req
  .auth()
  .then(user => {
    res.send(user)
  })
  .catch(next)
})

module.exports = router