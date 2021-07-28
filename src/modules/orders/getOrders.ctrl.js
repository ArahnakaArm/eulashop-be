const status = require('../../utils/enum/status');
const Orders = require('../../models/order');
const basicFunction = require('../../service/basiceFunc');
exports.getOrders = async (req, res) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const query = req.query;
        const search = basicFunction.buildQuery([''], query);
        const orders = await Orders.find(search.query)
            .skip(search.offset)
            .limit(search.limit)
            .sort(search.orderby)
            .populate('user')
            .populate('product');
        resMessage = { ...resMessage, resultData: orders };
        return res.status(200).json(resMessage);
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};

exports.getOrderByid = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const order = await Orders.findOne({ _id: req.params.id }).populate('user').populate('product');
        resMessage = { ...resMessage, resultData: order };
        return res.status(200).json(resMessage);
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
