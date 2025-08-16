import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import type {
  AddFeedCommand,
  DeleteFeedCommand,
  RefreshFeedCommand,
  UpdateFeedCommand,
} from "./feedCommands.ts";
import { FeedId } from "../../domain/types.ts";

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
      const feedId = FeedId.create("feed-123");
      const command: UpdateFeedCommand = {
        commandType: "UpdateFeed",
        feedId: feedId,
        url: "https://example.com/updated-feed.xml",
      };

      assertEquals(command.commandType, "UpdateFeed");
      assertEquals(command.feedId, feedId);
      assertEquals(command.url, "https://example.com/updated-feed.xml");
    });
  });

  describe("DeleteFeedCommand", () => {
    it("should have correct structure", () => {
      const feedId = FeedId.create("feed-123");
      const command: DeleteFeedCommand = {
        commandType: "DeleteFeed",
        feedId: feedId,
      };

      assertEquals(command.commandType, "DeleteFeed");
      assertEquals(command.feedId, feedId);
    });
  });

  describe("RefreshFeedCommand", () => {
    it("should have correct structure", () => {
      const feedId = FeedId.create("feed-123");
      const command: RefreshFeedCommand = {
        commandType: "RefreshFeed",
        feedId: feedId,
      };

      assertEquals(command.commandType, "RefreshFeed");
      assertEquals(command.feedId, feedId);
    });
  });

  describe("Command interface compliance", () => {
    it("should extend base Command interface", () => {
      const addCommand: AddFeedCommand = {
        commandType: "AddFeed",
        url: "https://example.com/feed.xml",
      };

      const feedId = FeedId.create("feed-123");

      const updateCommand: UpdateFeedCommand = {
        commandType: "UpdateFeed",
        feedId: feedId,
      };

      const deleteCommand: DeleteFeedCommand = {
        commandType: "DeleteFeed",
        feedId: feedId,
      };

      const refreshCommand: RefreshFeedCommand = {
        commandType: "RefreshFeed",
        feedId: feedId,
      };

      // All commands should have commandType property
      assertEquals(typeof addCommand.commandType, "string");
      assertEquals(typeof updateCommand.commandType, "string");
      assertEquals(typeof deleteCommand.commandType, "string");
      assertEquals(typeof refreshCommand.commandType, "string");
    });
  });
});
