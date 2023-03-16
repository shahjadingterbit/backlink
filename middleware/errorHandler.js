module.exports = function (err, req, res, next) {
    console.error(err);
    const status = err.statusCode || 500;
    const message = err.message;

    return res.status(status).json({ message: message });
}