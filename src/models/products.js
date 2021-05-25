const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: false },
    imageUrl: { type: String, require: false },
    category: { type: String, require: false },
    rating: { type: Number, require: true },
});

module.exports = mongoose.model('Products', productSchema);
