import {
  ByIdsOption,
  FeederItem,
  FeedItem,
  MarkAsReadItem,
  QueryRepositoryInterface,
} from "./query.interface.ts";

export class QueryRepository implements QueryRepositoryInterface {
  constructor(private readonly kv: Deno.Kv) {}

  async getByIdOrThrow(feed: string, id: string): Promise<FeederItem> {
    const item = await this.kv.get<Omit<FeedItem, "markedAsRead">>([
      "feed",
      feed,
      id,
    ]);
    const markAsReadItem = await this.getMarkAsReadItemById(feed, id);

    if (!item.value) throw new Error(`Feed item with ID ${id} not found`);

    return {
      ...item.value,
      ...markAsReadItem,
    };
  }

  getByIds(options: ByIdsOption[]): Promise<FeederItem[]> {
    throw new Error("Method not implemented.");
  }

  private async getMarkAsReadItemById(
    feed: string,
    id: string,
  ): Promise<MarkAsReadItem> {
    try {
      const markAsRead = await this.kv.get<number>(["feed", "read", feed, id]);

      if (markAsRead.value === null) {
        return {
          markedAsRead: false,
        };
      } else {
        return {
          markedAsRead: true,
          updatedAt: Intl.DateTimeFormat().format(new Date(markAsRead.value)),
        };
      }
    } catch (_error) {
      return {
        markedAsRead: false,
      };
    }
  }
}
