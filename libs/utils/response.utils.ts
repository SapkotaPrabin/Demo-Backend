export interface ResponseType {
  success: boolean;
  message: string;
  error: object;
  data: object;
}

export const ResponseData = (
  message: string,
  data: object,
  success: boolean,
  error: object,
): ResponseType => {
  const response = {
    success: success,
    message: message,
    error: error,
    data: data,
  };

  return response;
};
