const status = require('../../utils/enum/status');
const Products = require('../../models/products');
const validateBody = require('../../service/validate');

exports.postProduct = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const param = req.params;
        const validate = validateBody.productsSchema(body, 'POST');
        if (validate) {
            resMessage = {
                resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
                developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
            };
            return res.status(400).send(resMessage);
        }
        const product = await Products.create({ body });
        resMessage = {
            resultCode: status.CREATED.RESULT_CODE,
            developerMessage: status.CREATED.DEVELOPER_MESSAGE,
            resultData: product,
        };
        return res.status(201).send(resMessage);
    } catch (error) {
        console.log(error);
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
