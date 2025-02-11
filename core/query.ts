import {
  FeedItem,
  QueryRepositoryInterface,
} from "./repository/query.interface.ts";

export class FeederQuery {
  constructor(private readonly queryRepository: QueryRepositoryInterface) {}

  /** Retrieve one Feed based on GUID */
  getById(id: string): Promise<FeedItem> {
    return this.queryRepository.getById(id);
  }
}
