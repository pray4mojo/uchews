const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/uchews', { mongoUseClient: true});


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: { type: String },
  ateAt: [String]
});

const User = mongoose.model('User', UserSchema);

const saveNewUser = (username, password, cb) => {
  return new User({
    username: username,
    password: password,
    ateAt: []
  }).save(cb);
}