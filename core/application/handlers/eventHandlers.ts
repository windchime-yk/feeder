import type { EventHandler } from "../../cqrs/interfaces/event.ts";
import type {
  FeedAddedEvent,
  FeedDeletedEvent,
  FeedUpdatedEvent,
} from "../../domain/events/feedEvents.ts";

/**
 * Event handler for feed projection updates
 */
export interface FeedProjectionHandler {
  handleFeedAdded(event: FeedAddedEvent): Promise<void>;
  handleFeedUpdated(event: FeedUpdatedEvent): Promise<void>;
  handleFeedDeleted(event: FeedDeletedEvent): Promise<void>;
}

/**
 * Event handler for feed added events
 */
export interface FeedAddedEventHandler extends EventHandler<FeedAddedEvent> {}

/**
 * Event handler for feed updated events
 */
export interface FeedUpdatedEventHandler
  extends EventHandler<FeedUpdatedEvent> {}

/**
 * Event handler for feed deleted events
 */
export interface FeedDeletedEventHandler
  extends EventHandler<FeedDeletedEvent> {}
