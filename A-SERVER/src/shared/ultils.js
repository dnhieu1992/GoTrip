function cleanObject(object) {
    Object.keys(object).forEach(key => {
        if (object[key] === undefined || object[key] === null || (typeof (object[key]) === "String" && object[key] === '')) {
            delete object[key];
        }
    });
    return object;
}

export {
    cleanObject
}