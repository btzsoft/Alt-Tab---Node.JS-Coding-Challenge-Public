/**
 * Error Middleware
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
      code: err.code,
      stack: process.env.NODE_ENV == 'development' ? err.stack : null,
    }
  });
};
