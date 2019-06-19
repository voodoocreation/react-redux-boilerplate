export interface IError {
  message: string;
  status: number;
}

export const error = (options: Partial<IError> = {}): IError => ({
  message: options.message || "An error has occurred",
  status: options.status || 500
});
