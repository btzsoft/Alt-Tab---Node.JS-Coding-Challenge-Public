'use strict'

const assert = require('chai').assert
const request = require('supertest-as-promised')

const app = require('../../app')
const _user = {
  name: 'Integration Test',
  email: 'integration_test_' + Math.floor(Date.now() / 1000) + '@alttab.co',
  password: 'integration',
}

describe('Authentication Controller', () => {

  it('should register a new user and return token', () => {
    let _token = null

    return request(app)
    .post('/api/v1/users/signup')
    .send({
      email: _user.email,
      password: _user.password,
      name: _user.name,
    })
    .expect(200)
    .then((data) => {
      _token = data.body.token
      assert.ok(_token)
    })
  })

  it('should login existing User', () => {
    let _token = null
    return request(app)
    .post('/api/v1/users/signin')
    .send({
      email: _user.email,
      password: _user.password,
    })
    .expect(200)
    .then((data) => {
      _token = data.body.token
      assert.ok(_token)
    })
  })

  it('should return an error bad request if email is used', () => {
    return request(app)
    .post('/api/v1/users/signup')
    .send({
      email: _user.email,
      password: _user.password,
      name: _user.name,
    })
    .expect(409)
  })

  it('should return an error bad request if email isn\'t specified', () => {
    return request(app)
    .post('/api/v1/users/signup')
    .send({
      password: _user.password,
      name: _user.name,
    })
    .expect(401)
  })

  it('should return an error bad request if password isn\'t specified', () => {
    return request(app)
    .post('/api/v1/users/signup')
    .send({
      email: _user.email,
      name: _user.name,
    })
    .expect(401)
  })
})

describe('Profile controller', () => {

  let _token = null

  before(() => {
    return request(app)
    .post('/api/v1/users/signin')
    .send({
      email: _user.email,
      password: _user.password,
    })
    .then((data) => {
      _token = data.body.token
      assert.ok(_token)
    })
  })

  it('should fetch the profile info of existing user', () => {
    return request(app)
    .get('/api/v1/users/profile')
    .set('Authorization', _token)
    .expect(200)
    .then((data) => {
      assert.equal(data.body.email, _user.email)
    })
  })

  it('should return an error when token is not specified', () => {
    return request(app)
    .get('/api/v1/users/profile')
    .expect(401)
  })
})