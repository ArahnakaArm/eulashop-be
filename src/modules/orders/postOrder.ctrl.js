const status = require('../../utils/enum/status');
const Order = require('../../models/order');
const validateBody = require('../../service/validate');
const jwt = require('jsonwebtoken');
const user = require('../../models/user');
exports.postOrder = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const validate = validateBody.orderSchema(body, 'POST');
        if (validate) {
            resMessage = {
                resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
                developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
                validate: validate,
            };
            return res.status(400).send(resMessage);
        }

        const order = await Order.create({
            sendType: body.sendType,
            user: userId,
            product: body.product,
        });

        resMessage = {
            resultCode: status.CREATED.RESULT_CODE,
            developerMessage: status.CREATED.DEVELOPER_MESSAGE,
            resultData: order,
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
