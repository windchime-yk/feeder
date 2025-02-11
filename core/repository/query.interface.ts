export interface QueryRepositoryInterface {
  /** Retrieve a single feed based on GUID (including read status) */
  getById(id: string): Promise<FeedItem>;
  /** Retrieve multiple feeds based on an array of GUIDs (including read status) */
  getByIds(ids: string[]): Promise<FeedItem[]>;
}

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  markedAsRead: boolean;
}
