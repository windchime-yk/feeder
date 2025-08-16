import type { CommandHandler } from "../../cqrs/interfaces/command.ts";
import type {
  AddFeedCommand,
  UpdateFeedCommand,
  DeleteFeedCommand,
  RefreshFeedCommand,
} from "../commands/feedCommands.ts";

/**
 * Command handler for adding new feeds
 */
export interface AddFeedCommandHandler extends CommandHandler<AddFeedCommand> {}

/**
 * Command handler for updating existing feeds
 */
export interface UpdateFeedCommandHandler extends CommandHandler<UpdateFeedCommand> {}

/**
 * Command handler for deleting feeds
 */
export interface DeleteFeedCommandHandler extends CommandHandler<DeleteFeedCommand> {}

/**
 * Command handler for refreshing feeds
 */
export interface RefreshFeedCommandHandler extends CommandHandler<RefreshFeedCommand> {}