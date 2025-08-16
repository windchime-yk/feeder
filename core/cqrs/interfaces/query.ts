/**
 * Base interface for all queries in CQRS pattern
 */
export interface Query<TResult = any> {
  readonly queryType: string;
}

/**
 * Query handler interface for processing queries
 */
export interface QueryHandler<TQuery extends Query<TResult>, TResult = any> {
  handle(query: TQuery): Promise<TResult>;
}
