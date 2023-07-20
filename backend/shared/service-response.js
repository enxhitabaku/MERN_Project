/**
 * Used for returning the result of an action performed by a service.
 * @property {boolean} success - Shows if the action was performed successfully or not.
 * @property {object} result - The result of the performed action. If the execution of the action was not successful,
 *                             this value will be null.
 * @property {string} message - A message from the executed action. Will be an error message if the action was not
 *                              performed successfully or a confirmation/success message if otherwise.
 * @property {number} httpStatusCode - The HTTP Status code, by default it has a value of 200 or 500
 */
module.exports = class ServiceResponse {
    success;
    result;
    message;
    httpStatusCode;

    /**
     * Create a ServiceResponse
     * @param {boolean} success
     * @param {object} result
     * @param {string} message
     * @param {number} httpStatusCode
     */
    constructor(success, result, message, httpStatusCode) {
        this.success = success;
        this.result = result;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

    /**
     * Create a ServiceResponse when the action is executed successfully
     * @param {object} result
     * @param {number} httpStatusCode
     * @param {string} message
     * @returns {ServiceResponse}
     */
    static success(result, httpStatusCode = 200, message = "") {
        return new ServiceResponse(true, result, message, httpStatusCode);
    }


    /**
     * Create a ServiceResponse when the action is not executed successfully
     * @param {string} message
     * @param {number} httpStatusCode
     * @returns {ServiceResponse}
     */
    static error(message, httpStatusCode = 500) {
        return new ServiceResponse(false, null, message, httpStatusCode);
    }
}
