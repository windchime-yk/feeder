import type { DomainEvent } from "./Event.ts";

/**
 * Event store interface for persisting domain events
 */
export interface EventStore {
  saveEvents(aggregateId: string, events: DomainEvent[], expectedVersion: number): Promise<void>;
  getEvents(aggregateId: string): Promise<DomainEvent[]>;
}