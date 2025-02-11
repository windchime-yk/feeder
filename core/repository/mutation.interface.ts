export interface MutationRepositoryInterface {
  /** Mark as read based on GUID */
  markAsReadById(id: string): Promise<OnlyId>;
  /** Mark as read based on an array of GUIDs */
  markAsReadByIds(ids: string[]): Promise<OnlyId[]>;
  /** Mark as unread based on GUID */
  markAsUnreadById(id: string): Promise<OnlyId>;
  /** Mark as unread based on an array of GUIDs */
  markAsUnreadByIds(ids: string[]): Promise<OnlyId[]>;
  /** Update all items based on RSS feed URL */
  update(urls: string): Promise<OnlyId[]>;
}

export interface OnlyId {
  id: string;
}
