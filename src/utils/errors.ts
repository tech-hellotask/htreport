export interface CustomError {
  message: string;
  response: {
    data: {
      message: string;
      error: string;
    };
  };
}

export const axiosErrorMsg = (error: CustomError): string => {
  const { message, response } = error;

  if (response && response.data) {
    return response.data.message || response.data.error;
  }

  if (message) {
    return message;
  }

  return "Something went wrong";
};
