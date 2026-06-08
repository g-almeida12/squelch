export type HTTPResponse<B> = SuccessResponse<B> | ErrorResponse;

export type SuccessResponse<B> = {
  success: true;
  statusCode: HTTPStatusCode;
  body: B;
};

export type ErrorResponse = {
  success: false;
  statusCode: HTTPStatusCode;
  body: {
    message: string;
    invalidFields?: { message?: string }[];
    data?: unknown;
  };
};

export type HTTPStatusCode =
  | 200
  | 201
  | 204
  | 400
  | 401
  | 403
  | 404
  | 409
  | 422
  | 500;
