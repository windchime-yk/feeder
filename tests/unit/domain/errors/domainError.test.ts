import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { DomainError } from "../../../../core/domain/errors/domainError.ts";

// Test implementation of DomainError for testing purposes
class TestDomainError extends DomainError {
  constructor(message: string, errorCode: string) {
    super(message, "TestDomain", errorCode);
  }
}

describe("DomainError", () => {
  describe("construction", () => {
    it("should create a domain error with message, domain, and error code", () => {
      // Given
      const message = "Test error message";
      const errorCode = "TEST_ERROR";

      // When
      const error = new TestDomainError(message, errorCode);

      // Then
      assertEquals(error.message, message);
      assertEquals(error.domain, "TestDomain");
      assertEquals(error.errorCode, errorCode);
      assertEquals(error.name, "TestDomainError");
    });

    it("should be an instance of Error", () => {
      // Given
      const error = new TestDomainError("Test message", "TEST_CODE");

      // When & Then
      assertEquals(error instanceof Error, true);
      assertEquals(error instanceof DomainError, true);
    });
  });

  describe("JSON serialization", () => {
    it("should serialize to JSON with all properties", () => {
      // Given
      const message = "Test error message";
      const errorCode = "TEST_ERROR";
      const error = new TestDomainError(message, errorCode);

      // When
      const json = error.toJSON();

      // Then
      assertEquals(json.name, "TestDomainError");
      assertEquals(json.message, message);
      assertEquals(json.domain, "TestDomain");
      assertEquals(json.errorCode, errorCode);
      assertEquals(typeof json.stack, "string");
    });
  });

  describe("string representation", () => {
    it("should return formatted string with domain and error code", () => {
      // Given
      const message = "Test error message";
      const errorCode = "TEST_ERROR";
      const error = new TestDomainError(message, errorCode);

      // When
      const stringValue = error.toString();

      // Then
      assertEquals(
        stringValue,
        "TestDomainError [TestDomain:TEST_ERROR]: Test error message",
      );
    });
  });

  describe("stack trace", () => {
    it("should have a stack trace", () => {
      // Given
      const error = new TestDomainError("Test message", "TEST_CODE");

      // When & Then
      assertEquals(typeof error.stack, "string");
      assertEquals(error.stack!.length > 0, true);
    });
  });
});
