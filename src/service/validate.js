const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const jwt = require('jsonwebtoken');
const status = require('../utils/enum/status');
ajv.addKeyword('emptyChecker', {
    modifying: true,
    schema: false, // keywords value is not used, can be true
    validate: function (data, dataPath, parentData, parentDataProperty) {
        return parentData[parentDataProperty] !== '' && parentData[parentDataProperty] != null;
    },
});

exports.auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            const resMessage = {
                resultCode: status.ACCESS_DENIED.RESULT_CODE,
                developerMessage: status.ACCESS_DENIED.DEVELOPER_MESSAGE,
            };
            return res.status(401).json(resMessage);
        } else {
            next();
        }
    } catch (error) {
        const resMessage = {
            resultCode: status.ACCESS_DENIED.RESULT_CODE,
            developerMessage: status.ACCESS_DENIED.DEVELOPER_MESSAGE,
        };
        return res.status(401).json(resMessage);
    }
};

exports.productsSchema = (body, method) => {
    let requiredSchema = [];
    if (method === 'POST' || method === 'PUT')
        requiredSchema = [...requiredSchema, 'title', 'description', 'imageUrl', 'category', 'rating'];
    const schema = {
        type: 'object',
        additionalProperties: false,
        required: requiredSchema,
        properties: {
            title: {
                emptyChecker: true,
                type: 'string',
            },
            description: {
                emptyChecker: true,
                type: 'string',
            },
            imageUrl: {
                emptyChecker: true,
                type: 'string',
            },
            category: {
                emptyChecker: true,
                type: 'string',
            },
            rating: {
                emptyChecker: true,
                type: 'number',
            },
        },
    };

    const validateBody = ajv.validate(schema, body);
    if (validateBody) {
        return null;
    } else {
        const validateError = ajv.errorsText();
        return validateError;
    }
};

exports.categoriesSchema = (body, method) => {
    let requiredSchema = [];
    if (method === 'POST' || method === 'PUT') requiredSchema = [...requiredSchema, 'title', 'description'];
    const schema = {
        type: 'object',
        additionalProperties: false,
        required: requiredSchema,
        properties: {
            title: {
                emptyChecker: true,
                type: 'string',
            },
            description: {
                emptyChecker: true,
                type: 'string',
            },
        },
    };

    const validateBody = ajv.validate(schema, body);
    if (validateBody) {
        return null;
    } else {
        const validateError = ajv.errorsText();
        return validateError;
    }
};

exports.usersSchema = (body, method) => {
    let requiredSchema = [];
    if (method === 'POST' || method === 'PUT')
        requiredSchema = [...requiredSchema, 'email', 'password', 'name', 'surname', 'address', 'telephoneNumber'];
    const schema = {
        type: 'object',
        additionalProperties: false,
        required: requiredSchema,
        properties: {
            email: {
                emptyChecker: true,
                type: 'string',
            },
            password: {
                emptyChecker: true,
                type: 'string',
            },
            name: {
                emptyChecker: true,
                type: 'string',
            },
            surname: {
                emptyChecker: true,
                type: 'string',
            },
            address: {
                emptyChecker: true,
                type: 'string',
            },
            telephoneNumber: {
                emptyChecker: true,
                type: 'string',
                pattern: '^[0][0-9]{8,9}$',
            },
        },
    };

    const validateBody = ajv.validate(schema, body);
    if (validateBody) {
        return null;
    } else {
        const validateError = ajv.errorsText();
        return validateError;
    }
};
