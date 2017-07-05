const bcrypt = require('bcrypt')
const mongoose = require('api/db')
const {Schema} = mongoose

const schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  token: {
    type: String,
    index: 'hashed',
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
})

module.exports = mongoose.model('Token', schema)
