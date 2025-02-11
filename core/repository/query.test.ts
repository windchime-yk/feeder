import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { QueryRepository } from "./query.ts";
import { expect } from "@std/expect/expect";

describe("QueryRepository", () => {
  let kv: Deno.Kv;

  beforeEach(async () => {
    kv = await Deno.openKv();
  });

  afterEach(async () => {
    const items = kv.list({ prefix: ["feed"] });
    for await (const item of items) {
      await kv.delete(item.key);
    }
    kv.close();
  });

  describe("getByIdOrThrow", () => {
    it("get no read item", async () => {
      const queryRepository = new QueryRepository(kv);
      const FEED_URL = "https:example.com";
      const ITEM_ID = "https:example.com/item/1";
      const itemData = {
        id: "https:example.com/item/1",
        title: "Item 1",
        link: "https:example.com/item/1",
      };
      kv.set(["feed", FEED_URL, ITEM_ID], itemData);

      const feedItem = await queryRepository.getByIdOrThrow(
        FEED_URL,
        ITEM_ID,
      );
      expect(feedItem).toEqual({
        ...itemData,
        markedAsRead: false,
      });
    });

    it("get read item", async () => {
      const queryRepository = new QueryRepository(kv);
      const FEED_URL = "https:example.com";
      const ITEM_ID = "https:example.com/item/1";
      const itemData = {
        id: "https:example.com/item/1",
        title: "Item 1",
        link: "https:example.com/item/1",
      };
      const UPDATED_AT = Date.now();
      kv.set(["feed", FEED_URL, ITEM_ID], itemData);
      kv.set(
        ["feed", "read", FEED_URL, ITEM_ID],
        UPDATED_AT,
      );

      const feedItem = await queryRepository.getByIdOrThrow(
        FEED_URL,
        ITEM_ID,
      );
      expect(feedItem).toEqual({
        ...itemData,
        markedAsRead: true,
        updatedAt: Intl.DateTimeFormat().format(new Date(UPDATED_AT)),
      });
    });

    it("throw", async () => {
      const queryRepository = new QueryRepository(kv);
      const FEED_URL = "https:example.com";
      const ITEM_ID = "https:example.com/item/1";

      try {
        await queryRepository.getByIdOrThrow(
          FEED_URL,
          ITEM_ID,
        );
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe(`Feed item with ID ${ITEM_ID} not found`);
        }
      }
    });
  });
});
