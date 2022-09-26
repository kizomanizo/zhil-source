function apiResponse (req, res, success, status, type, title, message) {
    return res.status(status).json({
        success: success,
        type: type,
        title: title,
        message: message,
    })
}

module.exports = {
    apiResponse,
}