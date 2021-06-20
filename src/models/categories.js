const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: false },
});

module.exports = mongoose.model('Categories', categoriesSchema);
