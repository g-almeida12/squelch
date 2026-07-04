import type { ErrorPayload, HTTPStatusCode } from "@squelch/shared";

export type ExtendedErrorPayload = ErrorPayload & {
  statusCode: HTTPStatusCode
}