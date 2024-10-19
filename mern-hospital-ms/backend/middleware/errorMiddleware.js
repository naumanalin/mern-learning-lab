class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    // 11000 code comes form database when same data insert
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
      const message = `Json Web Token is invalid, Try again!`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is expired, Try again!`;
      err = new ErrorHandler(message, 400);
    }
    // enter.insert data with wrong type example: entering number in fullname, email, message etc..
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}`,
        err = new ErrorHandler(message, 400);
    }
  
    // if we want that only error show in terminal like: phone: phone must contain 11 digits, Name must be a string etc..
    const errorMessage = err.errors
      ? Object.values(err.errors)
          .map((error) => error.message)
          .join(" ")
      : err.message;
  
    return res.status(err.statusCode).json({
      success: false,
      // message: err.message,
      message: errorMessage,
    });
  };
  
  export default ErrorHandler;