import { HTTPStatusCodeDTO, SuccessPayloadDTO, ErrorPayloadDTO } from "@squelch/shared";

export type HTTPResponse<B> = SuccessResponse<B> | ErrorResponse;

export type SuccessResponse<B> = SuccessPayloadDTO<B> & {
  statusCode: HTTPStatusCodeDTO;
};

export type ErrorResponse = ErrorPayloadDTO & {
  statusCode: HTTPStatusCodeDTO;
};
