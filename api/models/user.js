const bcrypt = require('bcrypt');
const mongoose = require('api/db');
const EmailNotUniqueError = require('api/errors/EmailNotUnique');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

schema.pre('save', function (next) {

  if (this.isModified('password') || this.isNew) {

    mongoose.models["User"].findOne({ email: this.email }, (err, results) => {

      if (err) {
        return next(err);
      }

      if (results) {
        next(new EmailNotUniqueError());
      } else {
        bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
          this.password = hash;
          next();
        })
        .catch(next);
      }
    });

  } else {
    return next();
  }

});

schema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('User', schema);
