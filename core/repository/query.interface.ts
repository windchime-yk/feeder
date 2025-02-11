export interface QueryRepositoryInterface {
  /** Retrieve a single feed based on GUID (including read status) */
  getByIdOrThrow(feed: string, id: string): Promise<FeederItem>;
  /** Retrieve multiple feeds based on an array of GUIDs (including read status) */
  getByIds(options: ByIdsOption[]): Promise<FeederItem[]>;
}

export interface ByIdsOption {
  feed: string;
  id: string;
}

export type FeederItem = FeedItem & MarkAsReadItem;

export type FeedItem = {
  id: string;
  title: string;
  link: string;
};

export type MarkAsReadItem = {
  markedAsRead: true;
  updatedAt: string;
} | {
  markedAsRead: false;
};
