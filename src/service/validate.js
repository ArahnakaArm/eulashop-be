const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

ajv.addKeyword('emptyChecker', {
    modifying: true,
    schema: false, // keywords value is not used, can be true
    validate: function (data, dataPath, parentData, parentDataProperty) {
        return parentData[parentDataProperty] !== '' && parentData[parentDataProperty] != null;
    },
});

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
