interface MessageResponse {
  message: string;
  status: boolean;
  [key: string]: unknown;
}

export function Success(
  message: string,
  otherResponses?: Record<string, unknown>
): MessageResponse {
  return { message, status: true, ...otherResponses };
}

export function CreatedSuccessfully(
  message: string,
  otherResponses?: Record<string, unknown>
): MessageResponse {
  return { status: true, message, success: true, ...otherResponses };
}

export function InternalServerError(message?: string): MessageResponse {
  return {
    message: message || "Something Went Wrong",
    status: false,
  };
}

export function Forbidden(message: string): MessageResponse {
  return { message, status: false };
}

export function Unauthorize(message: string): MessageResponse {
  return { message, status: false };
}

export function BadRequest(
  message: string,
  otherResponses?: Record<string, unknown>
): MessageResponse {
  return { message, status: false, ...otherResponses };
}

export function NotFound(message: string): MessageResponse {
  return { message, status: false };
}
