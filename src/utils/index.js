const {statusCodes} = require('http-status-codes')

class ServiceError extends Error{
    constructor(
        message,
        explaination,
        StatusCodes = statusCodes.INTERNAL_SERVER_ERROR
    ){
        this.name = 'ServiceError'
        this.message = message
        this.explaination = explaination
        this.StatusCodes = StatusCodes
    }
}
module.exports = ServiceError