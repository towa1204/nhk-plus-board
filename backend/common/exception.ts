export interface BaseErrorOptions {
  message?: string;
  cause?: unknown;
}

export interface ApiClientErrorOptions extends BaseErrorOptions {
  url: string;
  status: number;
  responseBody: string;
}

class BaseError extends Error {
  constructor(options: BaseErrorOptions) {
    super(options?.message, { cause: options?.cause });
    this.name = this.constructor.name;
  }
}

export class SetConfigError extends BaseError {
  constructor(options: BaseErrorOptions) {
    super(options);
    this.name = this.constructor.name;
  }
}

export class ApiClientError extends BaseError {
  constructor(options: ApiClientErrorOptions) {
    const message = [
      `${options.message}`,
      `URL: ${options.url}`,
      `Status: ${options.status}`,
      `ResponseBody: ${options.responseBody}`,
    ].join("\n");
    super({ message, cause: options.cause });
  }
}
