const ExtendableError =  require('./ExtendableError');

module.exports = class extends ExtendableError {
  constructor(content) {
    super('Not a valid password.', 'not_valid_password', 401, content)
  }
};
