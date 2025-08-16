import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import type { Query, QueryHandler } from "../../../src/cqrs/interfaces/Query.ts";

describe("CQRS Query interfaces", () => {
  describe("Query interface", () => {
    it("should have queryType property", () => {
      const mockQuery: Query<string> = {
        queryType: "TestQuery",
      };

      assertEquals(mockQuery.queryType, "TestQuery");
    });
  });

  describe("QueryHandler interface", () => {
    it("should handle queries and return results", async () => {
      const mockHandler: QueryHandler<Query<string>, string> = {
        async handle(query: Query<string>): Promise<string> {
          assertEquals(query.queryType, "TestQuery");
          return "test result";
        },
      };

      const testQuery: Query<string> = {
        queryType: "TestQuery",
      };

      const result = await mockHandler.handle(testQuery);
      assertEquals(result, "test result");
    });
  });
});