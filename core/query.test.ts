import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { FeederQuery } from "./query.ts";
import { QueryRepositoryInterface } from "./repository/query.interface.ts";
import { createMock } from "../utils/mock.ts";

describe("FeederQuery", () => {
  describe("getByIdOrThrow", () => {
    const FEED_URL = "https://example.com";

    it("should return a feed by id", async () => {
      const mock = createMock<QueryRepositoryInterface>();

      mock.getByIdOrThrow.mockResolvedValue({
        id: "https://example.com/item/1",
        title: "Test",
        link: "https://example.com/item/1",
        markedAsRead: false,
      });

      const feederQuery = new FeederQuery(mock);
      const result = await feederQuery.getByIdOrThrow(FEED_URL, "1");
      expect(result).toEqual({
        id: "https://example.com/item/1",
        title: "Test",
        link: "https://example.com/item/1",
        markedAsRead: false,
      });
    });
    it("repository error", async () => {
      const mock = createMock<QueryRepositoryInterface>();
      mock.getByIdOrThrow.mockRejectedValue(new Error("UT"));

      const feederQuery = new FeederQuery(mock);
      try {
        await feederQuery.getByIdOrThrow(FEED_URL, "1");
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe("UT");
        }
      }
    });
  });
});
