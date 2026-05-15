export type SuccessResponse<B> = {
  success: true;
  body: B;
};

export type ErrorResponse = {
  success: false;
  message: string;
  invalidFields?: { message?: string };
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