/**
 * Domain event interface for CQRS event-driven architecture
 */
export interface DomainEvent {
  readonly aggregateId: string;
  readonly eventType: string;
  readonly eventData: any;
  readonly timestamp: Date;
  readonly version: number;
}

/**
 * Event handler interface for processing domain events
 */
export interface EventHandler<TEvent extends DomainEvent> {
  handle(event: TEvent): Promise<void>;
}
