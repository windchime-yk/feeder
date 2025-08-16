import { ValueObject } from "./valueObject.ts";
import {
  ValueObjectErrorCodes,
  ValueObjectValidationError,
} from "../errors/valueObjectError.ts";

/**
 * Value object representing a unique identifier for RSS feeds.
 * Ensures feed IDs are valid and provides type safety.
 */
export class FeedId extends ValueObject<string> {
  private static readonly ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 255;

  constructor(value: string) {
    FeedId.validate(value);
    super(value);
  }

  /**
   * Create a new FeedId with validation
   */
  static create(value: string): FeedId {
    return new FeedId(value);
  }

  /**
   * Generate a new unique FeedId using crypto.randomUUID
   */
  static generate(): FeedId {
    const uuid = crypto.randomUUID();
    // Remove hyphens to create a cleaner ID format
    const cleanId = uuid.replace(/-/g, "");
    return new FeedId(cleanId);
  }

  /**
   * Create FeedId from existing string (for deserialization)
   */
  static fromString(value: string): FeedId {
    return new FeedId(value);
  }

  /**
   * Validate the feed ID format and constraints
   */
  private static validate(value: string): void {
    if (!value || typeof value !== "string") {
      throw new ValueObjectValidationError(
        "FeedId must be a non-empty string",
        "FeedId",
        ValueObjectErrorCodes.EMPTY_VALUE,
      );
    }

    if (value.length < FeedId.MIN_LENGTH) {
      throw new ValueObjectValidationError(
        `FeedId must be at least ${FeedId.MIN_LENGTH} character long`,
        "FeedId",
        ValueObjectErrorCodes.TOO_SHORT,
      );
    }

    if (value.length > FeedId.MAX_LENGTH) {
      throw new ValueObjectValidationError(
        `FeedId must not exceed ${FeedId.MAX_LENGTH} characters`,
        "FeedId",
        ValueObjectErrorCodes.TOO_LONG,
      );
    }

    if (!FeedId.ID_PATTERN.test(value)) {
      throw new ValueObjectValidationError(
        "FeedId must contain only alphanumeric characters, underscores, and hyphens",
        "FeedId",
        ValueObjectErrorCodes.INVALID_CHARACTERS,
      );
    }
  }

  /**
   * Check if this FeedId is equal to another
   */
  override equals(other: FeedId): boolean {
    return super.equals(other);
  }
}
