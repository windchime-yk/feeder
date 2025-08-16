/**
 * Base interface for all commands in CQRS pattern
 */
export interface Command {
  readonly commandType: string;
}

/**
 * Command handler interface for processing commands
 */
export interface CommandHandler<TCommand extends Command> {
  handle(command: TCommand): Promise<void>;
}
