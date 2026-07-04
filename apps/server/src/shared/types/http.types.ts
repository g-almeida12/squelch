import { HTTPStatusCode, SuccessPayload, ErrorPayload } from "@squelch/shared";

export type HTTPResponse<B> = SuccessResponse<B> | ErrorResponse;

export type SuccessResponse<B> = SuccessPayload<B> & {
  statusCode: HTTPStatusCode;
};

export type ErrorResponse = ErrorPayload & {
  statusCode: HTTPStatusCode;
};
