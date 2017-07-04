const authorise = require('api/services/user/authorise');

/**
 * Authorise Middleware
 * @description Allow authorisation from req object
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  req.auth = () => {
    return authorise(authorization)
    .then(user => {
      const { _id, name, email, status, createdAt, updatedAt } = user;
      req.session = {
        token: authorization,
      };
      req.user = { //store only this fields
        _id,
        name,
        email,
        status,
        createdAt,
        updatedAt,
      };
      return req.user;
    })
  };

  next()
};
