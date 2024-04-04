export type Error = {
  errorCode: number;
  error: string;
  errorMessage: string;
  fieldErrors: [string];
};

export type ErrorResponse = {
  timestamp?: Date;
  status: number;
  error: string;
  path: string;
};
