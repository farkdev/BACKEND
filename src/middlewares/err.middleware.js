const { Error } = require('../utils/CustomError/error')

exports.errorHandler = (error, req, res, next) =>{
    console.log(error)
    switch (error.code) {
        case Error.INVALID_TYPE_ERROR:
            return res.send({status: 'error', error: error.name})
            break;
    
        default:
            return res.send({status: 'error', error: 'unhandled error'})
            break;
    }
}