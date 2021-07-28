const Order = require('../../models/order');
const status = require('../../utils/enum/status');
exports.deleteOrder = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const param = req.params;
        const order = await Order.findById(param.id);
        if (!order) {
            resMessage = {
                resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
                developerMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
            };
            return res.status(400).send(resMessage);
        }
        await Order.findByIdAndDelete(param.id);
        return res.status(200).send(resMessage);
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
