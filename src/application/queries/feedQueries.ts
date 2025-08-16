import type { Query } from "../../cqrs/interfaces/query.ts";
import type { FeedId } from "../../domain/types.ts";

/**
 * Read model for feed summary information
 */
export interface FeedSummaryReadModel {
  id: string;
  title: string;
  url: string;
  lastUpdated: Date;
  itemCount: number;
}

/**
 * Read model for complete feed information
 */
export interface FeedReadModel {
  id: string;
  url: string;
  title: string;
  description: string;
  lastUpdated: Date;
  itemCount: number;
}

/**
 * Read model for feed items
 */
export interface FeedItemReadModel {
  id: string;
  feedId: string;
  title: string;
  description: string;
  link: string;
  publishedDate: Date;
  guid: string;
}

/**
 * Query to get a specific feed
 */
export interface GetFeedQuery extends Query<FeedReadModel | null> {
  readonly queryType: "GetFeed";
  readonly feedId: FeedId;
}

/**
 * Query to get all feeds
 */
export interface GetAllFeedsQuery extends Query<FeedSummaryReadModel[]> {
  readonly queryType: "GetAllFeeds";
  readonly userId?: string;
  readonly limit?: number;
  readonly offset?: number;
}

/**
 * Query to get feed items
 */
export interface GetFeedItemsQuery extends Query<FeedItemReadModel[]> {
  readonly queryType: "GetFeedItems";
  readonly feedId: FeedId;
  readonly limit?: number;
  readonly since?: Date;
}