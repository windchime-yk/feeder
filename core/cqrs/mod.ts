/**
 * CQRS (Command Query Responsibility Segregation) infrastructure
 *
 * This module provides the core CQRS interfaces and infrastructure
 * components needed to implement the CQRS pattern in the RSS feed library.
 */

// Command interfaces
export type { Command, CommandHandler } from "./interfaces/command.ts";

// Query interfaces
export type { Query, QueryHandler } from "./interfaces/query.ts";

// Event interfaces
export type { DomainEvent, EventHandler } from "./interfaces/event.ts";

// Event store interface
export type { EventStore } from "./interfaces/eventStore.ts";

// Bus interfaces
export type { CommandBus } from "./buses/commandBus.ts";
export type { QueryBus } from "./buses/queryBus.ts";
