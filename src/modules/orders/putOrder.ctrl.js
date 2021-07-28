const status = require('../../utils/enum/status');
const Order = require('../../models/order');
exports.putOrder = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const id = req.params.id;
        await Order.findByIdAndUpdate(id, body);
        const order = await Order.findById(id);
        resMessage = {
            ...resMessage,
            resultData: order,
        };
        return res.status(200).send(resMessage);
    } catch {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
