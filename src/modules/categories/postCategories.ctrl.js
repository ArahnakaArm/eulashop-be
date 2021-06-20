const status = require('../../utils/enum/status');
const Categories = require('../../models/categories');
const validateBody = require('../../service/validate');

exports.postCategory = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const param = req.params;
        const validate = validateBody.categoriesSchema(body, 'POST');

        if (validate) {
            resMessage = {
                resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
                developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
            };
            return res.status(400).send(resMessage);
        }
        const category = await Categories.create({
            title: body.title,
            description: body.description,
        });
        resMessage = {
            resultCode: status.CREATED.RESULT_CODE,
            developerMessage: status.CREATED.DEVELOPER_MESSAGE,
            resultData: category,
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
