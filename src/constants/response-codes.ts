export const RESPONSE_CODE = {
  OK: {
    HTTP_STATUS: 200,
    CODE: 2000,
    MESSAGE: 'Success'
  },
  CREATED: {
    HTTP_STATUS: 201,
    CODE: 2010,
    MESSAGE: 'Resource Was Created'
  },
  UPDATED: {
    HTTP_STATUS: 204,
    CODE: 2040,
    MESSAGE: 'Resource Was Updated'
  },
  BAD_REQUEST: {
    HTTP_STATUS: 400,
    CODE: 4000,
    MESSAGE: 'Bad Request'
  },
  UNAUTHORIZED: {
    HTTP_STATUS: 401,
    CODE: 4010,
    MESSAGE: 'Unauthorized'
  },
  INCORRECT_PASSWORD: {
    HTTP_STATUS: 401,
    CODE: 4011,
    MESSAGE: 'Incorrect Username Or Password'
  },
  PASSWORD_REUSE: {
    HTTP_STATUS: 401,
    CODE: 4012,
    MESSAGE: 'Password Reuse Not Allowed'
  },
  FORBIDDEN: {
    HTTP_STATUS: 403,
    CODE: 4030,
    MESSAGE: 'Forbidden'
  },
  MISSING_OR_INVALID: {
    HTTP_STATUS: 422,
    CODE: 4220,
    MESSAGE: 'Missing or Invalid Request'
  },
  URL_NOT_FOUND: {
    HTTP_STATUS: 404,
    CODE: 4040,
    MESSAGE: 'Unknown URL'
  },
  DATA_NOT_FOUND: {
    HTTP_STATUS: 200,
    CODE: 2001,
    MESSAGE: 'Data Not Found'
  },
  TOO_MANY_REQUESTS: {
    HTTP_STATUS: 429,
    CODE: 4290,
    MESSAGE: 'Too Many Requests'
  },
  INTERNAL_SERVER_ERROR: {
    HTTP_STATUS: 500,
    CODE: 5000,
    MESSAGE: 'Internal Server Error'
  },
  SERVICE_UNAVAILABLE: {
    HTTP_STATUS: 503,
    CODE: 5030,
    MESSAGE: 'External Server Error'
  },
  NOT_VERIFIED_EMAIL: {
    HTTP_STATUS: 401,
    CODE: 4013,
    MESSAGE: 'Account is not verified'
  },
}
