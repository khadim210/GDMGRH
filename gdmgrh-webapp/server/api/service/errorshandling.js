import logger from '../../components/logger';

function ErrorsHandlingService() {
  this.handleError = (res, statusCode, loggerMessage, clientMessage) => {
    logger.error(loggerMessage);
    res.status(statusCode).json({
      message: clientMessage
    });
  };
  this.verifyModel = (res, model) => {
    let errors = model.validateSync();
    if(errors) {
      return this.handleError(res, 400, errors, 'Bad or missing parameters');
    }
  };

  this.throwError = (serverError, clientMessage, messageCode) => {
    logger.error(serverError);
    let err = new Error(clientMessage);
    err.code = messageCode;
    logger.error(err);
    throw err;
  };
}

module.exports = new ErrorsHandlingService();
