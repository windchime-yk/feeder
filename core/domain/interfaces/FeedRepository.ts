import type { Feed, FeedId } from "../types.ts";
import type {
  FeedItemReadModel,
  FeedReadModel,
  FeedSummaryReadModel,
} from "../../application/queries/feedQueries.ts";

/**
 * Write repository interface for Feed persistence operations.
 * Handles write operations and aggregate persistence.
 */
export interface FeedWriteRepository {
  /**
   * Save a feed aggregate to the repository
   */
  save(feed: Feed): Promise<void>;

  /**
   * Find a feed aggregate by its unique identifier
   */
  findById(id: FeedId): Promise<Feed | null>;

  /**
   * Delete a feed aggregate from the repository
   */
  delete(id: FeedId): Promise<void>;
}

/**
 * Read repository interface for Feed query operations.
 * Handles read operations and optimized queries.
 */
export interface FeedReadRepository {
  /**
   * Get a feed read model by its unique identifier
   */
  getFeed(id: FeedId): Promise<FeedReadModel | null>;

  /**
   * Get all feeds as summary read models
   */
  getAllFeeds(
    userId?: string,
    limit?: number,
    offset?: number,
  ): Promise<FeedSummaryReadModel[]>;

  /**
   * Get feed items for a specific feed
   */
  getFeedItems(
    feedId: FeedId,
    limit?: number,
    since?: Date,
  ): Promise<FeedItemReadModel[]>;
}
