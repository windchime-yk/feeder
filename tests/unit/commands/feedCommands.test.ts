import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import type {
  AddFeedCommand,
  UpdateFeedCommand,
  DeleteFeedCommand,
  RefreshFeedCommand,
} from "../../../src/application/commands/feedCommands.ts";
import type { FeedId } from "../../../src/domain/types.ts";

describe("Feed Commands", () => {
  describe("AddFeedCommand", () => {
    it("should have correct structure", () => {
      const command: AddFeedCommand = {
        commandType: "AddFeed",
        url: "https://example.com/feed.xml",
        userId: "user-123",
      };

      assertEquals(command.commandType, "AddFeed");
      assertEquals(command.url, "https://example.com/feed.xml");
      assertEquals(command.userId, "user-123");
    });
  });

  describe("UpdateFeedCommand", () => {
    it("should have correct structure", () => {
      const command: UpdateFeedCommand = {
        commandType: "UpdateFeed",
        feedId: "feed-123" as FeedId,
        url: "https://example.com/updated-feed.xml",
      };

      assertEquals(command.commandType, "UpdateFeed");
      assertEquals(command.feedId, "feed-123");
      assertEquals(command.url, "https://example.com/updated-feed.xml");
    });
  });

  describe("DeleteFeedCommand", () => {
    it("should have correct structure", () => {
      const command: DeleteFeedCommand = {
        commandType: "DeleteFeed",
        feedId: "feed-123" as FeedId,
      };

      assertEquals(command.commandType, "DeleteFeed");
      assertEquals(command.feedId, "feed-123");
    });
  });

  describe("RefreshFeedCommand", () => {
    it("should have correct structure", () => {
      const command: RefreshFeedCommand = {
        commandType: "RefreshFeed",
        feedId: "feed-123" as FeedId,
      };

      assertEquals(command.commandType, "RefreshFeed");
      assertEquals(command.feedId, "feed-123");
    });
  });

  describe("Command interface compliance", () => {
    it("should extend base Command interface", () => {
      const addCommand: AddFeedCommand = {
        commandType: "AddFeed",
        url: "https://example.com/feed.xml",
      };

      const updateCommand: UpdateFeedCommand = {
        commandType: "UpdateFeed",
        feedId: "feed-123" as FeedId,
      };

      const deleteCommand: DeleteFeedCommand = {
        commandType: "DeleteFeed",
        feedId: "feed-123" as FeedId,
      };

      const refreshCommand: RefreshFeedCommand = {
        commandType: "RefreshFeed",
        feedId: "feed-123" as FeedId,
      };

      // All commands should have commandType property
      assertEquals(typeof addCommand.commandType, "string");
      assertEquals(typeof updateCommand.commandType, "string");
      assertEquals(typeof deleteCommand.commandType, "string");
      assertEquals(typeof refreshCommand.commandType, "string");
    });
  });
});