import { DomainError } from "./domainError.ts";

/**
 * Error thrown when value object validation fails
 */
export class ValueObjectValidationError extends DomainError {
  constructor(message: string, valueObjectType: string, errorCode: string) {
    super(message, `ValueObject.${valueObjectType}`, errorCode);
  }
}

/**
 * Specific error codes for value object validation
 */
export const ValueObjectErrorCodes = {
  INVALID_FORMAT: "INVALID_FORMAT",
  EMPTY_VALUE: "EMPTY_VALUE",
  INVALID_TYPE: "INVALID_TYPE",
  TOO_LONG: "TOO_LONG",
  TOO_SHORT: "TOO_SHORT",
  INVALID_CHARACTERS: "INVALID_CHARACTERS",
} as const;

export type ValueObjectErrorCode =
  typeof ValueObjectErrorCodes[keyof typeof ValueObjectErrorCodes];
