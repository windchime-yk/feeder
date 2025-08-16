/**
 * @deprecated This interface is being replaced by CQRS pattern.
 * Use command handlers for write operations and query handlers for read operations.
 *
 * Write operations:
 * - parseFeed + saveFeed -> AddFeedCommand + AddFeedCommandHandler
 * - updateFeed -> RefreshFeedCommand + RefreshFeedCommandHandler
 * - deleteFeed -> DeleteFeedCommand + DeleteFeedCommandHandler
 *
 * Read operations:
 * - getFeed -> GetFeedQuery + GetFeedQueryHandler
 * - getAllFeeds -> GetAllFeedsQuery + GetAllFeedsQueryHandler
 *
 * See:
 * - src/application/commands/FeedCommands.ts
 * - src/application/queries/FeedQueries.ts
 * - src/application/handlers/CommandHandlers.ts
 * - src/application/handlers/QueryHandlers.ts
 */

import type { Feed, FeedId } from "../../domain/types.ts";

/**
 * @deprecated Application service interface for feed management operations.
 * This interface will be removed in favor of CQRS command and query handlers.
 */
export interface FeedService {
  /**
   * @deprecated Use AddFeedCommand instead
   */
  parseFeed(url: string): Promise<Feed>;

  /**
   * @deprecated Use AddFeedCommand instead
   */
  saveFeed(feed: Feed): Promise<void>;

  /**
   * @deprecated Use GetFeedQuery instead
   */
  getFeed(id: FeedId): Promise<Feed | null>;

  /**
   * @deprecated Use GetAllFeedsQuery instead
   */
  getAllFeeds(): Promise<Feed[]>;

  /**
   * @deprecated Use RefreshFeedCommand instead
   */
  updateFeed(id: FeedId): Promise<Feed>;

  /**
   * @deprecated Use DeleteFeedCommand instead
   */
  deleteFeed(id: FeedId): Promise<void>;
}
