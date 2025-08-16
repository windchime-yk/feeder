import { ValueObject } from "./valueObject.ts";
import {
  ValueObjectErrorCodes,
  ValueObjectValidationError,
} from "../errors/valueObjectError.ts";

/**
 * Value object representing a unique identifier for RSS feed items.
 * Ensures feed item IDs are valid and provides type safety.
 */
export class FeedItemId extends ValueObject<string> {
  private static readonly ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 255;

  constructor(value: string) {
    FeedItemId.validate(value);
    super(value);
  }

  /**
   * Create a new FeedItemId with validation
   */
  static create(value: string): FeedItemId {
    return new FeedItemId(value);
  }

  /**
   * Generate a new unique FeedItemId using crypto.randomUUID
   */
  static generate(): FeedItemId {
    const uuid = crypto.randomUUID();
    // Remove hyphens to create a cleaner ID format
    const cleanId = uuid.replace(/-/g, "");
    return new FeedItemId(cleanId);
  }

  /**
   * Create FeedItemId from existing string (for deserialization)
   */
  static fromString(value: string): FeedItemId {
    return new FeedItemId(value);
  }

  /**
   * Create FeedItemId from GUID (common in RSS feeds)
   */
  static fromGuid(guid: string): FeedItemId {
    // Clean up GUID to create a valid ID
    const cleanGuid = guid
      .replace(/[^a-zA-Z0-9_-]/g, "_") // Replace invalid chars with underscore
      .substring(0, FeedItemId.MAX_LENGTH); // Ensure max length

    return new FeedItemId(cleanGuid);
  }

  /**
   * Validate the feed item ID format and constraints
   */
  private static validate(value: string): void {
    if (!value || typeof value !== "string") {
      throw new ValueObjectValidationError(
        "FeedItemId must be a non-empty string",
        "FeedItemId",
        ValueObjectErrorCodes.EMPTY_VALUE,
      );
    }

    if (value.length < FeedItemId.MIN_LENGTH) {
      throw new ValueObjectValidationError(
        `FeedItemId must be at least ${FeedItemId.MIN_LENGTH} character long`,
        "FeedItemId",
        ValueObjectErrorCodes.TOO_SHORT,
      );
    }

    if (value.length > FeedItemId.MAX_LENGTH) {
      throw new ValueObjectValidationError(
        `FeedItemId must not exceed ${FeedItemId.MAX_LENGTH} characters`,
        "FeedItemId",
        ValueObjectErrorCodes.TOO_LONG,
      );
    }

    if (!FeedItemId.ID_PATTERN.test(value)) {
      throw new ValueObjectValidationError(
        "FeedItemId must contain only alphanumeric characters, underscores, and hyphens",
        "FeedItemId",
        ValueObjectErrorCodes.INVALID_CHARACTERS,
      );
    }
  }

  /**
   * Check if this FeedItemId is equal to another
   */
  override equals(other: FeedItemId): boolean {
    return super.equals(other);
  }
}
