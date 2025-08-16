import type { Query, QueryHandler } from "../interfaces/query.ts";

/**
 * Query bus interface for routing queries to their handlers
 */
export interface QueryBus {
  /**
   * Register a query handler for a specific query type
   */
  register<TQuery extends Query<TResult>, TResult>(
    queryType: string,
    handler: QueryHandler<TQuery, TResult>
  ): void;

  /**
   * Execute a query by routing it to the appropriate handler
   */
  execute<TQuery extends Query<TResult>, TResult>(query: TQuery): Promise<TResult>;
}