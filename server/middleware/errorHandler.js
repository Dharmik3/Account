const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Something went wrong',
    });
};

module.exports = errorHandler;