const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    imageUrl: { type: String, require: false },
    category: { type: Schema.Types.ObjectId, ref: 'Categories' },
    rating: { type: Number, require: true },
});

module.exports = mongoose.model('Products', productSchema);
