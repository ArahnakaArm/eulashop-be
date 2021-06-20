const status = require('../../utils/enum/status');
const User = require('../../models/user');
exports.getUsers = async (req, res) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const users = await User.find();
        resMessage = { ...resMessage, resultData: users };
        return res.status(200).json(resMessage);
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};

exports.getUserByid = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const user = await User.findOne({ _id: req.params.id });
        resMessage = { ...resMessage, resultData: user };
        return res.status(200).json(resMessage);
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
