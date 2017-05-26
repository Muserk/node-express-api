/**
 * Contains simple response objects and handlers
 */

exports.createDataResponse = function(data) {
    return {
        data: data
    }
}

exports.createErrorResponse = function(errors) {
    return {
        errors: errors
    }
}