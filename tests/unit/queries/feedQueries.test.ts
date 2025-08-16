import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import type {
  GetFeedQuery,
  GetAllFeedsQuery,
  GetFeedItemsQuery,
  FeedReadModel,
  FeedSummaryReadModel,
  FeedItemReadModel,
} from "../../../src/application/queries/feedQueries.ts";
import type { FeedId } from "../../../src/domain/types.ts";

describe("Feed Queries", () => {
  describe("GetFeedQuery", () => {
    it("should have correct structure", () => {
      const query: GetFeedQuery = {
        queryType: "GetFeed",
        feedId: "feed-123" as FeedId,
      };

      assertEquals(query.queryType, "GetFeed");
      assertEquals(query.feedId, "feed-123");
    });
  });

  describe("GetAllFeedsQuery", () => {
    it("should have correct structure", () => {
      const query: GetAllFeedsQuery = {
        queryType: "GetAllFeeds",
        userId: "user-123",
        limit: 10,
        offset: 0,
      };

      assertEquals(query.queryType, "GetAllFeeds");
      assertEquals(query.userId, "user-123");
      assertEquals(query.limit, 10);
      assertEquals(query.offset, 0);
    });
  });

  describe("GetFeedItemsQuery", () => {
    it("should have correct structure", () => {
      const since = new Date();
      const query: GetFeedItemsQuery = {
        queryType: "GetFeedItems",
        feedId: "feed-123" as FeedId,
        limit: 20,
        since,
      };

      assertEquals(query.queryType, "GetFeedItems");
      assertEquals(query.feedId, "feed-123");
      assertEquals(query.limit, 20);
      assertEquals(query.since, since);
    });
  });

  describe("Read Models", () => {
    describe("FeedReadModel", () => {
      it("should have correct structure", () => {
        const readModel: FeedReadModel = {
          id: "feed-123",
          url: "https://example.com/feed.xml",
          title: "Test Feed",
          description: "Test Description",
          lastUpdated: new Date(),
          itemCount: 5,
        };

        assertEquals(readModel.id, "feed-123");
        assertEquals(readModel.url, "https://example.com/feed.xml");
        assertEquals(readModel.title, "Test Feed");
        assertEquals(readModel.description, "Test Description");
        assertEquals(readModel.itemCount, 5);
        assertEquals(typeof readModel.lastUpdated, "object");
      });
    });

    describe("FeedSummaryReadModel", () => {
      it("should have correct structure", () => {
        const summaryModel: FeedSummaryReadModel = {
          id: "feed-123",
          title: "Test Feed",
          url: "https://example.com/feed.xml",
          lastUpdated: new Date(),
          itemCount: 5,
        };

        assertEquals(summaryModel.id, "feed-123");
        assertEquals(summaryModel.title, "Test Feed");
        assertEquals(summaryModel.url, "https://example.com/feed.xml");
        assertEquals(summaryModel.itemCount, 5);
        assertEquals(typeof summaryModel.lastUpdated, "object");
      });
    });

    describe("FeedItemReadModel", () => {
      it("should have correct structure", () => {
        const itemModel: FeedItemReadModel = {
          id: "item-123",
          feedId: "feed-123",
          title: "Test Item",
          description: "Test Item Description",
          link: "https://example.com/item",
          publishedDate: new Date(),
          guid: "item-guid-123",
        };

        assertEquals(itemModel.id, "item-123");
        assertEquals(itemModel.feedId, "feed-123");
        assertEquals(itemModel.title, "Test Item");
        assertEquals(itemModel.description, "Test Item Description");
        assertEquals(itemModel.link, "https://example.com/item");
        assertEquals(itemModel.guid, "item-guid-123");
        assertEquals(typeof itemModel.publishedDate, "object");
      });
    });
  });

  describe("Query interface compliance", () => {
    it("should extend base Query interface", () => {
      const getFeedQuery: GetFeedQuery = {
        queryType: "GetFeed",
        feedId: "feed-123" as FeedId,
      };

      const getAllFeedsQuery: GetAllFeedsQuery = {
        queryType: "GetAllFeeds",
      };

      const getFeedItemsQuery: GetFeedItemsQuery = {
        queryType: "GetFeedItems",
        feedId: "feed-123" as FeedId,
      };

      // All queries should have queryType property
      assertEquals(typeof getFeedQuery.queryType, "string");
      assertEquals(typeof getAllFeedsQuery.queryType, "string");
      assertEquals(typeof getFeedItemsQuery.queryType, "string");
    });
  });
});