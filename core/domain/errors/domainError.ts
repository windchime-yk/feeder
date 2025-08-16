/**
 * Base class for all domain-specific errors.
 * Provides clear identification of errors originating from the domain layer.
 */
export abstract class DomainError extends Error {
  /**
   * The domain context where this error occurred
   */
  public readonly domain: string;

  /**
   * The specific error code for this domain error
   */
  public readonly errorCode: string;

  constructor(message: string, domain: string, errorCode: string) {
    super(message);
    this.name = this.constructor.name;
    this.domain = domain;
    this.errorCode = errorCode;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Get a structured representation of the error
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      domain: this.domain,
      errorCode: this.errorCode,
      stack: this.stack,
    };
  }

  /**
   * Get a human-readable string representation
   */
  override toString(): string {
    return `${this.name} [${this.domain}:${this.errorCode}]: ${this.message}`;
  }
}
