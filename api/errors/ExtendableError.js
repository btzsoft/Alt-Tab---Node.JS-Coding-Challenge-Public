module.exports = class ExtendableError extends Error {
  constructor(message, code, statusCode, content) {
    super();
    this.message = message;
    this.code = code;
    this.content = content;
    this.status = statusCode;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor.name);
  }
};
