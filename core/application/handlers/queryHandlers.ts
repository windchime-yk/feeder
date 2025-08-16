import type { QueryHandler } from "../../cqrs/interfaces/Query.ts";
import type {
  FeedItemReadModel,
  FeedReadModel,
  FeedSummaryReadModel,
  GetAllFeedsQuery,
  GetFeedItemsQuery,
  GetFeedQuery,
} from "../queries/FeedQueries.ts";

/**
 * Query handler for getting a specific feed
 */
export interface GetFeedQueryHandler
  extends QueryHandler<GetFeedQuery, FeedReadModel | null> {}

/**
 * Query handler for getting all feeds
 */
export interface GetAllFeedsQueryHandler
  extends QueryHandler<GetAllFeedsQuery, FeedSummaryReadModel[]> {}

/**
 * Query handler for getting feed items
 */
export interface GetFeedItemsQueryHandler
  extends QueryHandler<GetFeedItemsQuery, FeedItemReadModel[]> {}
