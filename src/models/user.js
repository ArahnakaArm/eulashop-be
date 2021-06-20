const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    surname: { type: String, require: true },
    address: { type: String },
    telephoneNumber: { type: String, require: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
