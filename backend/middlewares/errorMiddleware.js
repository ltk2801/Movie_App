// error handling middleware

exports.errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

exports.createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;

  return err;
};
