const status = require('../../utils/enum/status');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        if (!user) {
            resMessage = {
                resultCode: status.UNAUTHORIZED.RESULT_CODE,
                developerMessage: status.UNAUTHORIZED.DEVELOPER_MESSAGE,
            };
            return res.status(401).send(resMessage);
        }
        const match = await bcrypt.compare(body.password, user.password);
        if (!match) {
            resMessage = {
                resultCode: status.UNAUTHORIZED.RESULT_CODE,
                developerMessage: status.UNAUTHORIZED.DEVELOPER_MESSAGE,
            };
            return res.status(401).send(resMessage);
        }
        const token = jwt.sign({ userId: user._id }, 'SECRET', { expiresIn: '24h' });
        res.status(200).send({
            userId: user._id,
            token: token,
        });
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
