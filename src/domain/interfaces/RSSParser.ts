/**
 * Parsed RSS feed data structure
 */
export interface ParsedFeedData {
  title: string;
  description: string;
  link: string;
  language?: string;
  lastBuildDate?: Date;
  items: ParsedFeedItem[];
}

/**
 * Parsed RSS feed item structure
 */
export interface ParsedFeedItem {
  title: string;
  description: string;
  link: string;
  publishedDate?: Date;
  guid?: string;
}

/**
 * RSS Parser interface for converting XML content to structured data
 */
export interface RSSParser {
  /**
   * Parse RSS XML content into structured feed data
   */
  parse(xmlContent: string): Promise<ParsedFeedData>;
}
