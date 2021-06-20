const Category = require('../../models/categories');
const validateBody = require('../../service/validate');
const status = require('../../utils/enum/status');
exports.deleteCategory = async (req, res, next) => {
    let resMessage = {
        resultCode: status.SUCCESS.RESULT_CODE,
        developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
    };
    try {
        const body = req.body;
        const param = req.params;
        await Category.findByIdAndDelete(param.id);
        res.status(200).send(resMessage);
    } catch (error) {
        resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
