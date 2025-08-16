/**
 * RSS Feed Library for Deno
 *
 * A comprehensive RSS feed parsing, management, and storage library
 * built with Domain-Driven Design principles and Deno KV persistence.
 */

// Re-export main interfaces and types
export type { FeedService } from "./core/application/services/feedService.ts";
export type { FeedWriteRepository, FeedReadRepository } from "./core/domain/interfaces/feedRepository.ts";
export type {
  ParsedFeedData,
  ParsedFeedItem,
  RSSParser,
} from "./core/domain/interfaces/rssParser.ts";

// Domain entities and value objects will be exported as they are implemented
// export { Feed } from "./core/domain/entities/Feed.ts";
// export { FeedItem } from "./core/domain/entities/FeedItem.ts";
// export { FeedId } from "./core/domain/value-objects/FeedId.ts";
// export { FeedUrl } from "./core/domain/value-objects/FeedUrl.ts";
// export { FeedMetadata } from "./core/domain/value-objects/FeedMetadata.ts";

// Application services and infrastructure implementations will be exported as they are implemented
// export { FeedServiceImpl } from "./core/application/services/FeedServiceImpl.ts";
// export { DenoKVFeedRepository } from "./core/infrastructure/repositories/DenoKVFeedRepository.ts";
// export { XMLRSSParser } from "./core/infrastructure/parsers/XMLRSSParser.ts";
