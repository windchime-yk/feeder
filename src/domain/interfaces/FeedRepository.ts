import type { Feed, FeedId } from "../types.ts";

/**
 * Repository interface for Feed persistence operations.
 * Abstracts storage implementation details from domain logic.
 */
export interface FeedRepository {
  /**
   * Save a feed to the repository
   */
  save(feed: Feed): Promise<void>;

  /**
   * Find a feed by its unique identifier
   */
  findById(id: FeedId): Promise<Feed | null>;

  /**
   * Retrieve all feeds from the repository
   */
  findAll(): Promise<Feed[]>;

  /**
   * Delete a feed from the repository
   */
  delete(id: FeedId): Promise<void>;
}
