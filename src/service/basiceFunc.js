exports.buildQuery = (keys, query) => {
    const limit = query.limit ? parseInt(query.limit) : query.limit;
    delete query.limit;
    const offset = query.offset ? parseInt(query.offset) : query.offset;
    delete query.offset;
    let orderby = {};
    if (query.orderby) {
        let replace = query.orderby ? query.orderby.replace(/desc/gi, 1).replace(/asc/gi, -1) : '';
        replace = replace.split(',');
        for (const item of replace) {
            orderby[item.split(':')[0]] = parseInt(item.split(':')[1]);
        }
    } else {
        orderby = query.orderby;
    }
    delete query.orderby;
    const fields = query.fields ? query.fields.replace(/,/g, ' ') : '';
    delete query.fields;
    for (const key of keys) {
        if (query[key]) query[key] = new RegExp(`${query[key]}`, 'i');
    }
    return { query, offset, limit, fields, orderby };
};
