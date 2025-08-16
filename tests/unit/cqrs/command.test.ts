import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import type { Command, CommandHandler } from "../../../core/cqrs/interfaces/Command.ts";

describe("CQRS Command interfaces", () => {
  describe("Command interface", () => {
    it("should have commandType property", () => {
      const mockCommand: Command = {
        commandType: "TestCommand",
      };

      assertEquals(mockCommand.commandType, "TestCommand");
    });
  });

  describe("CommandHandler interface", () => {
    it("should handle commands properly", async () => {
      const mockHandler: CommandHandler<Command> = {
        async handle(command: Command): Promise<void> {
          assertEquals(command.commandType, "TestCommand");
        },
      };

      const testCommand: Command = {
        commandType: "TestCommand",
      };

      await mockHandler.handle(testCommand);
    });
  });
});