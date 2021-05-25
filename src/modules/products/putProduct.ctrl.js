const status = require('../../utils/enum/status');
const Products = require('../../models/products');
exports.putProduct = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const id = req.params.id;
        await Products.findByIdAndUpdate(id, body);
        const product = await Products.findById(id);
        resMessage = {
            ...resMessage,
            resultData: product,
        };
        return res.status(200).send(resMessage);
    } catch {}
};
