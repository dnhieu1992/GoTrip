function cleanObject(object) {
    Object.keys(object).forEach(key => {
        if (!object[key] || (typeof (object[key]) === "string" && object[key] === '')) {
            delete object[key];
        }
    });

    return object;
}

export {
    cleanObject
}