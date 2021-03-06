const status = require('../../utils/enum/status');
const Products = require('../../models/products');
const basicFunction = require('../../service/basiceFunc');
exports.getProducts = async (req, res) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const query = req.query;
        const search = basicFunction.buildQuery([''], query);
        const products = await Products.find(search.query)
            .skip(search.offset)
            .limit(search.limit)
            .sort(search.orderby)
            .populate('category', 'title');
        resMessage = { ...resMessage, resultData: products };
        return res.status(200).json(resMessage);
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};

exports.getProductByid = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const product = await Products.findOne({ _id: req.params.id });
        resMessage = { ...resMessage, resultData: product };
        return res.status(200).json(resMessage);
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
