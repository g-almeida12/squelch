import type { ErrorPayloadDTO, HTTPStatusCodeDTO } from "@squelch/shared";

export type ExtendedErrorPayload = ErrorPayloadDTO & {
  statusCode: HTTPStatusCodeDTO
}