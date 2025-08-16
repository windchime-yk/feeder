import type { Command, CommandHandler } from "../interfaces/command.ts";

/**
 * Command bus interface for routing commands to their handlers
 */
export interface CommandBus {
  /**
   * Register a command handler for a specific command type
   */
  register<TCommand extends Command>(
    commandType: string,
    handler: CommandHandler<TCommand>
  ): void;

  /**
   * Execute a command by routing it to the appropriate handler
   */
  execute<TCommand extends Command>(command: TCommand): Promise<void>;
}