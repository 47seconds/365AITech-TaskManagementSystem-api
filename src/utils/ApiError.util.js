// Standard ApiError class to return systematic error response
class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
