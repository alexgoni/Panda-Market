export default class HttpError extends Error {
  public response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}
