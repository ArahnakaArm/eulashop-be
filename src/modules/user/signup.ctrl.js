const status = require('../../utils/enum/status');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validateBody = require('../../service/validate');
exports.signup = async (req, res) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const validate = validateBody.usersSchema(body, 'POST');
        if (validate) {
            resMessage = {
                resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
                developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
                validate: validate,
            };
            return res.status(400).send(resMessage);
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                resMessage = {
                    resultCode: status.SYSTEM_ERROR.RESULT_CODE,
                    developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
                };
                return res.status(500).send(resMessage);
            }
            bcrypt.hash(body.password, salt, async function (err, hash) {
                if (err) {
                    resMessage = {
                        resultCode: status.SYSTEM_ERROR.RESULT_CODE,
                        developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
                    };
                    return res.status(500).send(resMessage);
                }

                await User.create({
                    email: body.email,
                    password: hash,
                    name: body.name,
                    surname: body.surname,
                    address: body.address,
                    phoneNumber: body.phoneNumber,
                });

                // Store hash in your password DB.
            });
            resMessage = {
                resultCode: status.CREATED.RESULT_CODE,
                developerMessage: status.CREATED.DEVELOPER_MESSAGE,
            };
            return res.status(201).send(resMessage);
        });
    } catch (error) {
        console.log(error);
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
