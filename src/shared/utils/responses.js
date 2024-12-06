const sendResponse = (res, success, status, message, data = null) => {
  res.status(status).json({
    success,
    status,
    message,
    data,
  });
};

const sendSuccess = (res, status, message, data = null) => {
  sendResponse(res, true, status, message, data);
};

const sendFailure = (res, status, message, data = null) => {
  sendResponse(res, false, status, message, data);
};

module.exports = { sendSuccess, sendFailure };
