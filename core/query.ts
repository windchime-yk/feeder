import {
  FeedItem,
  QueryRepositoryInterface,
} from "./repository/query.interface.ts";

export class FeederQuery {
  constructor(private readonly queryRepository: QueryRepositoryInterface) {}

  /** Retrieve one Feed based on GUID */
  getByIdOrThrow(feed: string, id: string): Promise<FeedItem> {
    return this.queryRepository.getByIdOrThrow(feed, id);
  }
}
