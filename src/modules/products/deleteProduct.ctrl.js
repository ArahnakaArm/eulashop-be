const Products = require('../../models/products');
exports.deleteProduct = (req, res, next) => {
    Products.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: 'Deleted!',
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
