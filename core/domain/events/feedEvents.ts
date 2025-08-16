import type { DomainEvent } from "../../cqrs/interfaces/event.ts";

/**
 * Event data for feed added event
 */
export interface FeedAddedEventData {
  feedId: string;
  url: string;
  title: string;
  description: string;
}

/**
 * Event data for feed updated event
 */
export interface FeedUpdatedEventData {
  feedId: string;
  newItems: Array<{
    id: string;
    title: string;
    description: string;
    link: string;
    publishedDate: Date;
    guid: string;
  }>;
  lastUpdated: Date;
}

/**
 * Event data for feed deleted event
 */
export interface FeedDeletedEventData {
  feedId: string;
}

/**
 * Domain event emitted when a feed is added
 */
export interface FeedAddedEvent extends DomainEvent {
  readonly eventType: "FeedAdded";
  readonly eventData: FeedAddedEventData;
}

/**
 * Domain event emitted when a feed is updated
 */
export interface FeedUpdatedEvent extends DomainEvent {
  readonly eventType: "FeedUpdated";
  readonly eventData: FeedUpdatedEventData;
}

/**
 * Domain event emitted when a feed is deleted
 */
export interface FeedDeletedEvent extends DomainEvent {
  readonly eventType: "FeedDeleted";
  readonly eventData: FeedDeletedEventData;
}