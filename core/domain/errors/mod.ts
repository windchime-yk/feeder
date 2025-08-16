/**
 * Domain errors module
 *
 * This module exports all domain-specific error classes.
 * These errors provide clear identification of where errors originated.
 */

export { DomainError } from "./domainError.ts";
export {
  type ValueObjectErrorCode,
  ValueObjectErrorCodes,
  ValueObjectValidationError,
} from "./valueObjectError.ts";
