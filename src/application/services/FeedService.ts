import type { Feed, FeedId } from "../../domain/types.ts";

/**
 * Application service interface for feed management operations.
 * Coordinates between domain logic and infrastructure concerns.
 */
export interface FeedService {
  /**
   * Parse an RSS feed from a URL and return the structured feed data
   */
  parseFeed(url: string): Promise<Feed>;

  /**
   * Save a feed to persistent storage
   */
  saveFeed(feed: Feed): Promise<void>;

  /**
   * Retrieve a feed by its unique identifier
   */
  getFeed(id: FeedId): Promise<Feed | null>;

  /**
   * Retrieve all stored feeds
   */
  getAllFeeds(): Promise<Feed[]>;

  /**
   * Update an existing feed with fresh content from its URL
   */
  updateFeed(id: FeedId): Promise<Feed>;

  /**
   * Delete a feed from storage
   */
  deleteFeed(id: FeedId): Promise<void>;
}
