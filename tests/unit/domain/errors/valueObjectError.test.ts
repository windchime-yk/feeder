import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { 
  ValueObjectValidationError, 
  ValueObjectErrorCodes 
} from "../../../../core/domain/errors/valueObjectError.ts";
import { DomainError } from "../../../../core/domain/errors/domainError.ts";

describe("ValueObjectValidationError", () => {
  describe("construction", () => {
    it("should create a value object validation error", () => {
      // Given
      const message = "Invalid value";
      const valueObjectType = "TestValueObject";
      const errorCode = ValueObjectErrorCodes.INVALID_FORMAT;

      // When
      const error = new ValueObjectValidationError(message, valueObjectType, errorCode);

      // Then
      assertEquals(error.message, message);
      assertEquals(error.domain, "ValueObject.TestValueObject");
      assertEquals(error.errorCode, errorCode);
      assertEquals(error.name, "ValueObjectValidationError");
    });

    it("should be an instance of DomainError", () => {
      // Given
      const error = new ValueObjectValidationError(
        "Test message", 
        "TestValueObject", 
        ValueObjectErrorCodes.EMPTY_VALUE
      );

      // When & Then
      assertEquals(error instanceof Error, true);
      assertEquals(error instanceof DomainError, true);
      assertEquals(error instanceof ValueObjectValidationError, true);
    });
  });

  describe("error codes", () => {
    it("should have all expected error codes", () => {
      // When & Then
      assertEquals(ValueObjectErrorCodes.INVALID_FORMAT, "INVALID_FORMAT");
      assertEquals(ValueObjectErrorCodes.EMPTY_VALUE, "EMPTY_VALUE");
      assertEquals(ValueObjectErrorCodes.INVALID_TYPE, "INVALID_TYPE");
      assertEquals(ValueObjectErrorCodes.TOO_LONG, "TOO_LONG");
      assertEquals(ValueObjectErrorCodes.TOO_SHORT, "TOO_SHORT");
      assertEquals(ValueObjectErrorCodes.INVALID_CHARACTERS, "INVALID_CHARACTERS");
    });
  });

  describe("domain identification", () => {
    it("should clearly identify the value object type in domain", () => {
      // Given
      const error = new ValueObjectValidationError(
        "Test message", 
        "FeedId", 
        ValueObjectErrorCodes.INVALID_CHARACTERS
      );

      // When
      const domainString = error.toString();

      // Then
      assertEquals(error.domain, "ValueObject.FeedId");
      assertEquals(domainString.includes("ValueObject.FeedId"), true);
      assertEquals(domainString.includes("INVALID_CHARACTERS"), true);
    });
  });

  describe("JSON serialization", () => {
    it("should serialize with domain context", () => {
      // Given
      const error = new ValueObjectValidationError(
        "Invalid characters", 
        "FeedId", 
        ValueObjectErrorCodes.INVALID_CHARACTERS
      );

      // When
      const json = error.toJSON();

      // Then
      assertEquals(json.name, "ValueObjectValidationError");
      assertEquals(json.message, "Invalid characters");
      assertEquals(json.domain, "ValueObject.FeedId");
      assertEquals(json.errorCode, ValueObjectErrorCodes.INVALID_CHARACTERS);
    });
  });
});