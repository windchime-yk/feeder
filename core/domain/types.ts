/**
 * Core domain types and exports
 */

// Value objects
export { FeedId } from "./valueObjects/feedId.ts";
export { FeedItemId } from "./valueObjects/feedItemId.ts";

// Domain errors
export {
  DomainError,
  type ValueObjectErrorCode,
  ValueObjectErrorCodes,
  ValueObjectValidationError,
} from "./errors/mod.ts";

// Placeholder types for entities and value objects (to be implemented in subsequent tasks)
export type Feed = unknown;
export type FeedItem = unknown;
export type FeedUrl = unknown;
export type FeedMetadata = unknown;
