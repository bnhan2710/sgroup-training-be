module.exports = (err, req, res, next) => {
    let error = { ...err };

    if(err?.name == 'CastError') {
        error.message = `Resource not found`;
        error.statusCode = 404;
    }

    if(err.statusCode === 400 ){
        error.statusCode = 400;
        error.message = err.message;
    }
    if(err.statusCode === 401 ){
        error.statusCode = 401;
        error.message = err.message;
    }
    if(err.statusCode === 403 ){
        error.statusCode = 403;
        error.message = err.message;
    }
    if(err.statusCode === 404 ){
        error.statusCode = 404;
        error.message = err.message;
    }
    if(err?.code === 11000) {
        error.message = `Duplicate field value entered`;
        error.statusCode = 400;
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        statusCode,
        message
    });
}