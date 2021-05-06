function cleanObject(object) {
    Object.keys(object).forEach(key => {
        if (object[key] === undefined || object[key] === null || (typeof (object[key]) === "String" && object[key] === '')) {
            delete object[key];
        }
    });

    return object;
}
function searchQuery(object) {
    const result = {};

    Object.keys(object).forEach(key => {
        if (key !== "pageNumber" && key !== "pageSize" && key !== "sortDirection" && key !== "sortField") {
            //result[key] = { $regex: new RegExp("^" + object[key].toLowerCase(), "i") };/
            result[key] = { $regex: `.*${object[key].toLowerCase()}*.` };
        }
    });

    return result;
}

export {
    cleanObject,
    searchQuery
}