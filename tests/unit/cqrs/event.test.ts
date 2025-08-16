import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import type { DomainEvent, EventHandler } from "../../../core/cqrs/interfaces/event.ts";

describe("CQRS Event interfaces", () => {
  describe("DomainEvent interface", () => {
    it("should have required event properties", () => {
      const mockEvent: DomainEvent = {
        aggregateId: "test-id",
        eventType: "TestEvent",
        eventData: { test: "data" },
        timestamp: new Date(),
        version: 1,
      };

      assertEquals(mockEvent.aggregateId, "test-id");
      assertEquals(mockEvent.eventType, "TestEvent");
      assertEquals(mockEvent.version, 1);
      assertEquals(mockEvent.eventData.test, "data");
    });
  });

  describe("EventHandler interface", () => {
    it("should handle domain events properly", async () => {
      const mockHandler: EventHandler<DomainEvent> = {
        async handle(event: DomainEvent): Promise<void> {
          assertEquals(event.eventType, "TestEvent");
        },
      };

      const testEvent: DomainEvent = {
        aggregateId: "test-id",
        eventType: "TestEvent",
        eventData: { test: "data" },
        timestamp: new Date(),
        version: 1,
      };

      await mockHandler.handle(testEvent);
    });
  });
});