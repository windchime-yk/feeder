import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { FeedId } from "../../../../core/domain/valueObjects/feedId.ts";
import { ValueObjectValidationError, ValueObjectErrorCodes } from "../../../../core/domain/errors/valueObjectError.ts";

describe("FeedId", () => {
  describe("creation", () => {
    it("should create a FeedId with valid string", () => {
      // Given
      const validId = "valid-feed-id-123";

      // When
      const feedId = FeedId.create(validId);

      // Then
      assertEquals(feedId.value, validId);
    });

    it("should create a FeedId from string", () => {
      // Given
      const validId = "feed_123";

      // When
      const feedId = FeedId.fromString(validId);

      // Then
      assertEquals(feedId.value, validId);
    });

    it("should generate a unique FeedId", () => {
      // When
      const feedId1 = FeedId.generate();
      const feedId2 = FeedId.generate();

      // Then
      assertEquals(typeof feedId1.value, "string");
      assertEquals(typeof feedId2.value, "string");
      assertEquals(feedId1.equals(feedId2), false);
    });

    it("should generate FeedId with valid format", () => {
      // When
      const feedId = FeedId.generate();

      // Then
      // Should contain only alphanumeric characters and underscores (hyphens removed)
      assertEquals(/^[a-zA-Z0-9_]+$/.test(feedId.value), true);
      assertEquals(feedId.value.length > 0, true);
      assertEquals(feedId.value.length <= 255, true);
    });
  });

  describe("validation", () => {
    it("should throw ValueObjectValidationError for empty string", () => {
      // Given
      const emptyId = "";

      // When & Then
      assertThrows(
        () => FeedId.create(emptyId),
        ValueObjectValidationError,
        "FeedId must be a non-empty string"
      );
    });

    it("should throw ValueObjectValidationError for null value", () => {
      // When & Then
      assertThrows(
        () => FeedId.create(null as any),
        ValueObjectValidationError,
        "FeedId must be a non-empty string"
      );
    });

    it("should throw ValueObjectValidationError for undefined value", () => {
      // When & Then
      assertThrows(
        () => FeedId.create(undefined as any),
        ValueObjectValidationError,
        "FeedId must be a non-empty string"
      );
    });

    it("should throw ValueObjectValidationError for non-string value", () => {
      // When & Then
      assertThrows(
        () => FeedId.create(123 as any),
        ValueObjectValidationError,
        "FeedId must be a non-empty string"
      );
    });

    it("should throw ValueObjectValidationError for string that is too long", () => {
      // Given
      const longId = "a".repeat(256); // Exceeds MAX_LENGTH of 255

      // When & Then
      assertThrows(
        () => FeedId.create(longId),
        ValueObjectValidationError,
        "FeedId must not exceed 255 characters"
      );
    });

    it("should throw ValueObjectValidationError for string with invalid characters", () => {
      // Given
      const invalidIds = [
        "feed@id",
        "feed id", // space
        "feed#id",
        "feed$id",
        "feed%id",
        "feed.id",
      ];

      // When & Then
      invalidIds.forEach(invalidId => {
        assertThrows(
          () => FeedId.create(invalidId),
          ValueObjectValidationError,
          "FeedId must contain only alphanumeric characters, underscores, and hyphens"
        );
      });
    });

    it("should provide detailed error information", () => {
      // Given
      const invalidId = "feed@id";

      // When & Then
      try {
        FeedId.create(invalidId);
      } catch (error) {
        assertEquals(error instanceof ValueObjectValidationError, true);
        const domainError = error as ValueObjectValidationError;
        assertEquals(domainError.domain, "ValueObject.FeedId");
        assertEquals(domainError.errorCode, ValueObjectErrorCodes.INVALID_CHARACTERS);
        assertEquals(domainError.name, "ValueObjectValidationError");
      }
    });

    it("should accept valid characters", () => {
      // Given
      const validIds = [
        "feed123",
        "feed_id",
        "feed-id",
        "FEED_ID_123",
        "a",
        "123",
        "feed-123_test",
      ];

      // When & Then
      validIds.forEach(validId => {
        const feedId = FeedId.create(validId);
        assertEquals(feedId.value, validId);
      });
    });
  });

  describe("equality", () => {
    it("should be equal to another FeedId with same value", () => {
      // Given
      const value = "same-feed-id";
      const feedId1 = FeedId.create(value);
      const feedId2 = FeedId.create(value);

      // When
      const isEqual = feedId1.equals(feedId2);

      // Then
      assertEquals(isEqual, true);
    });

    it("should not be equal to another FeedId with different value", () => {
      // Given
      const feedId1 = FeedId.create("feed-id-1");
      const feedId2 = FeedId.create("feed-id-2");

      // When
      const isEqual = feedId1.equals(feedId2);

      // Then
      assertEquals(isEqual, false);
    });
  });

  describe("string representation", () => {
    it("should return the ID value as string", () => {
      // Given
      const idValue = "test-feed-id";
      const feedId = FeedId.create(idValue);

      // When
      const stringValue = feedId.toString();

      // Then
      assertEquals(stringValue, idValue);
    });
  });

  describe("JSON serialization", () => {
    it("should serialize to the ID value", () => {
      // Given
      const idValue = "test-feed-id";
      const feedId = FeedId.create(idValue);

      // When
      const jsonValue = feedId.toJSON();

      // Then
      assertEquals(jsonValue, idValue);
    });

    it("should work with JSON.stringify", () => {
      // Given
      const idValue = "test-feed-id";
      const feedId = FeedId.create(idValue);

      // When
      const jsonString = JSON.stringify(feedId);

      // Then
      assertEquals(jsonString, `"${idValue}"`);
    });
  });
});