import type { Command } from "../../cqrs/interfaces/Command.ts";
import type { FeedId } from "../../domain/types.ts";

/**
 * Command to add a new RSS feed
 */
export interface AddFeedCommand extends Command {
  readonly commandType: "AddFeed";
  readonly url: string;
  readonly userId?: string;
}

/**
 * Command to update an existing feed
 */
export interface UpdateFeedCommand extends Command {
  readonly commandType: "UpdateFeed";
  readonly feedId: FeedId;
  readonly url?: string;
}

/**
 * Command to delete a feed
 */
export interface DeleteFeedCommand extends Command {
  readonly commandType: "DeleteFeed";
  readonly feedId: FeedId;
}

/**
 * Command to refresh a feed with latest content
 */
export interface RefreshFeedCommand extends Command {
  readonly commandType: "RefreshFeed";
  readonly feedId: FeedId;
}
