import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { FeedItemId } from "../../../../core/domain/valueObjects/feedItemId.ts";
import { ValueObjectValidationError, ValueObjectErrorCodes } from "../../../../core/domain/errors/valueObjectError.ts";

describe("FeedItemId", () => {
  describe("creation", () => {
    it("should create a FeedItemId with valid string", () => {
      // Given
      const validId = "valid-item-id-123";

      // When
      const feedItemId = FeedItemId.create(validId);

      // Then
      assertEquals(feedItemId.value, validId);
    });

    it("should create a FeedItemId from string", () => {
      // Given
      const validId = "item_123";

      // When
      const feedItemId = FeedItemId.fromString(validId);

      // Then
      assertEquals(feedItemId.value, validId);
    });

    it("should generate a unique FeedItemId", () => {
      // When
      const feedItemId1 = FeedItemId.generate();
      const feedItemId2 = FeedItemId.generate();

      // Then
      assertEquals(typeof feedItemId1.value, "string");
      assertEquals(typeof feedItemId2.value, "string");
      assertEquals(feedItemId1.equals(feedItemId2), false);
    });

    it("should generate FeedItemId with valid format", () => {
      // When
      const feedItemId = FeedItemId.generate();

      // Then
      // Should contain only alphanumeric characters and underscores (hyphens removed)
      assertEquals(/^[a-zA-Z0-9_]+$/.test(feedItemId.value), true);
      assertEquals(feedItemId.value.length > 0, true);
      assertEquals(feedItemId.value.length <= 255, true);
    });

    it("should create FeedItemId from GUID", () => {
      // Given
      const guid = "https://example.com/item/123?param=value";

      // When
      const feedItemId = FeedItemId.fromGuid(guid);

      // Then
      assertEquals(typeof feedItemId.value, "string");
      assertEquals(feedItemId.value.length > 0, true);
      assertEquals(/^[a-zA-Z0-9_-]+$/.test(feedItemId.value), true);
    });

    it("should handle complex GUID with special characters", () => {
      // Given
      const complexGuid = "tag:example.com,2023-01-01:/posts/123#comment-456";

      // When
      const feedItemId = FeedItemId.fromGuid(complexGuid);

      // Then
      assertEquals(typeof feedItemId.value, "string");
      assertEquals(feedItemId.value.length > 0, true);
      assertEquals(/^[a-zA-Z0-9_-]+$/.test(feedItemId.value), true);
      // Should replace invalid characters with underscores
      assertEquals(feedItemId.value.includes("_"), true);
    });

    it("should truncate long GUID to max length", () => {
      // Given
      const longGuid = "a".repeat(300); // Longer than MAX_LENGTH

      // When
      const feedItemId = FeedItemId.fromGuid(longGuid);

      // Then
      assertEquals(feedItemId.value.length, 255);
    });
  });

  describe("validation", () => {
    it("should throw ValueObjectValidationError for empty string", () => {
      // Given
      const emptyId = "";

      // When & Then
      assertThrows(
        () => FeedItemId.create(emptyId),
        ValueObjectValidationError,
        "FeedItemId must be a non-empty string"
      );
    });

    it("should throw ValueObjectValidationError for null value", () => {
      // When & Then
      assertThrows(
        () => FeedItemId.create(null as any),
        ValueObjectValidationError,
        "FeedItemId must be a non-empty string"
      );
    });

    it("should throw ValueObjectValidationError for undefined value", () => {
      // When & Then
      assertThrows(
        () => FeedItemId.create(undefined as any),
        ValueObjectValidationError,
        "FeedItemId must be a non-empty string"
      );
    });

    it("should throw ValueObjectValidationError for non-string value", () => {
      // When & Then
      assertThrows(
        () => FeedItemId.create(123 as any),
        ValueObjectValidationError,
        "FeedItemId must be a non-empty string"
      );
    });

    it("should throw ValueObjectValidationError for string that is too long", () => {
      // Given
      const longId = "a".repeat(256); // Exceeds MAX_LENGTH of 255

      // When & Then
      assertThrows(
        () => FeedItemId.create(longId),
        ValueObjectValidationError,
        "FeedItemId must not exceed 255 characters"
      );
    });

    it("should throw ValueObjectValidationError for string with invalid characters", () => {
      // Given
      const invalidIds = [
        "item@id",
        "item id", // space
        "item#id",
        "item$id",
        "item%id",
        "item.id",
      ];

      // When & Then
      invalidIds.forEach(invalidId => {
        assertThrows(
          () => FeedItemId.create(invalidId),
          ValueObjectValidationError,
          "FeedItemId must contain only alphanumeric characters, underscores, and hyphens"
        );
      });
    });

    it("should provide detailed error information", () => {
      // Given
      const invalidId = "item@id";

      // When & Then
      try {
        FeedItemId.create(invalidId);
      } catch (error) {
        assertEquals(error instanceof ValueObjectValidationError, true);
        const domainError = error as ValueObjectValidationError;
        assertEquals(domainError.domain, "ValueObject.FeedItemId");
        assertEquals(domainError.errorCode, ValueObjectErrorCodes.INVALID_CHARACTERS);
        assertEquals(domainError.name, "ValueObjectValidationError");
      }
    });

    it("should accept valid characters", () => {
      // Given
      const validIds = [
        "item123",
        "item_id",
        "item-id",
        "ITEM_ID_123",
        "a",
        "123",
        "item-123_test",
      ];

      // When & Then
      validIds.forEach(validId => {
        const feedItemId = FeedItemId.create(validId);
        assertEquals(feedItemId.value, validId);
      });
    });
  });

  describe("equality", () => {
    it("should be equal to another FeedItemId with same value", () => {
      // Given
      const value = "same-item-id";
      const feedItemId1 = FeedItemId.create(value);
      const feedItemId2 = FeedItemId.create(value);

      // When
      const isEqual = feedItemId1.equals(feedItemId2);

      // Then
      assertEquals(isEqual, true);
    });

    it("should not be equal to another FeedItemId with different value", () => {
      // Given
      const feedItemId1 = FeedItemId.create("item-id-1");
      const feedItemId2 = FeedItemId.create("item-id-2");

      // When
      const isEqual = feedItemId1.equals(feedItemId2);

      // Then
      assertEquals(isEqual, false);
    });
  });

  describe("string representation", () => {
    it("should return the ID value as string", () => {
      // Given
      const idValue = "test-item-id";
      const feedItemId = FeedItemId.create(idValue);

      // When
      const stringValue = feedItemId.toString();

      // Then
      assertEquals(stringValue, idValue);
    });
  });

  describe("JSON serialization", () => {
    it("should serialize to the ID value", () => {
      // Given
      const idValue = "test-item-id";
      const feedItemId = FeedItemId.create(idValue);

      // When
      const jsonValue = feedItemId.toJSON();

      // Then
      assertEquals(jsonValue, idValue);
    });

    it("should work with JSON.stringify", () => {
      // Given
      const idValue = "test-item-id";
      const feedItemId = FeedItemId.create(idValue);

      // When
      const jsonString = JSON.stringify(feedItemId);

      // Then
      assertEquals(jsonString, `"${idValue}"`);
    });
  });
});