const status = require('../../utils/enum/status');
const User = require('../../models/user');
const validateBody = require('../../service/validate');
const jwt = require('jsonwebtoken');
exports.postWallet = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const validate = validateBody.walletSchema(body, 'POST');
        if (validate) {
            resMessage = {
                resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
                developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
                validate: validate,
            };
            return res.status(400).send(resMessage);
        }

        let user = await User.findById(userId);

        let userWallet = user.wallet;

        if (body.option === 'Add') userWallet = userWallet + body.amount;
        else userWallet = userWallet - body.amount;

        if (userWallet < 0) {
            resMessage = {
                resultCode: status.NOT_ENOUGH_WALLET.RESULT_CODE,
                developerMessage: status.NOT_ENOUGH_WALLET.DEVELOPER_MESSAGE,
            };
            return res.status(400).send(resMessage);
        }

        await User.updateOne({ _id: userId }, { $set: { wallet: userWallet } });

        user = await User.findById(userId);

        resMessage = {
            resultCode: status.SUCCESS.RESULT_CODE,
            developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
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
