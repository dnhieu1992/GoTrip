function successResponse(res, result) {
    if (!res) return;
    if (result) {
        res.status(200).json(result);
        return;
    }
    res.status(200);
};

function errorResponse(res, errorMsg) {
    if (res) return;
    res.status(500).json({
        success: false,
        error: errorMsg,
    });
}

export {
    successResponse,
    errorResponse
}