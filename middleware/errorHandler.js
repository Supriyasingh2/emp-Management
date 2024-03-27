const errorHandler = (err, req, res, next) => {
        let statusCode = res.statusCode ? res.statusCode : 500;
      
        // A generic error response structure
        const errorResponse = {
          message: err.message || "An unknown error occurred",
          // Include stack trace only in development mode for debugging
          stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        };
      
        // Handling specific error types
        if (err.name === 'ValidationError') {
          // Mongoose validation error
          statusCode = 400;
          errorResponse.errors = Object.values(err.errors).map(el => el.message);
          errorResponse.message = "Data validation failed";
        } else if (err.name === 'JsonWebTokenError') {
          // JWT authentication error
          statusCode = 401;
          errorResponse.message = "Invalid token";
        } else if (err.name === 'TokenExpiredError') {
          // JWT token expired
          statusCode = 401;
          errorResponse.message = "Token expired";
        } else if (err.code && err.code === 11000) {
          // Handle duplicate key errors
          statusCode = 400;
          const field = Object.keys(err.keyValue);
          errorResponse.message = `An item already exists with the same ${field}: ${err.keyValue[field]}`;
        }
      
        res.status(statusCode).json(errorResponse);
      };
      
      module.exports = errorHandler;
      