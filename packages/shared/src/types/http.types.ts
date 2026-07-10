export type SuccessPayloadDTO<B> = {
  success: true;
  body: B;
};

export type ErrorPayloadDTO = {
  success: false;
  body: {
    message: string;
    invalidFields?: { message?: string }[];
    data?: unknown;
  };
};

export type HTTPStatusCodeDTO =
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
