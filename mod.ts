/**
 * RSS Feed Library for Deno
 *
 * A comprehensive RSS feed parsing, management, and storage library
 * built with Domain-Driven Design principles and Deno KV persistence.
 */

// Re-export main interfaces and types
export type { FeedService } from "./src/application/services/feedService.ts";
export type { FeedWriteRepository, FeedReadRepository } from "./src/domain/interfaces/feedRepository.ts";
export type {
  ParsedFeedData,
  ParsedFeedItem,
  RSSParser,
} from "./src/domain/interfaces/rssParser.ts";

// Domain entities and value objects will be exported as they are implemented
// export { Feed } from "./src/domain/entities/Feed.ts";
// export { FeedItem } from "./src/domain/entities/FeedItem.ts";
// export { FeedId } from "./src/domain/value-objects/FeedId.ts";
// export { FeedUrl } from "./src/domain/value-objects/FeedUrl.ts";
// export { FeedMetadata } from "./src/domain/value-objects/FeedMetadata.ts";

// Application services and infrastructure implementations will be exported as they are implemented
// export { FeedServiceImpl } from "./src/application/services/FeedServiceImpl.ts";
// export { DenoKVFeedRepository } from "./src/infrastructure/repositories/DenoKVFeedRepository.ts";
// export { XMLRSSParser } from "./src/infrastructure/parsers/XMLRSSParser.ts";
