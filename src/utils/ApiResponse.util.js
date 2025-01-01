// Standard ApiResponse class to return systematic response
class ApiResponse {
  constructor(statusCode = 200, data = {}, user = null, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.user = user;
  }
}

export { ApiResponse };
