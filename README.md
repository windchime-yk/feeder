# RSS Feed Library for Deno

A comprehensive RSS feed parsing, management, and storage library built with
Domain-Driven Design principles and Deno KV persistence.

## Project Structure

```
src/
├── domain/                 # Domain layer - core business logic
│   ├── entities/          # Business entities (Feed, FeedItem)
│   ├── value-objects/     # Immutable value objects (FeedId, FeedUrl, etc.)
│   └── interfaces/        # Domain contracts and abstractions
├── application/           # Application layer - use cases and services
│   └── services/         # Application services coordinating domain logic
└── infrastructure/       # Infrastructure layer - external concerns
    ├── repositories/     # Data persistence implementations
    └── parsers/         # RSS parsing and HTTP client implementations

tests/
├── unit/                 # Unit tests for domain and application logic
├── integration/          # Integration tests for storage and external services
└── fixtures/            # Test data and sample RSS feeds
```

## Development

### Prerequisites

- Deno 1.40+ installed

### Available Tasks

- `deno task test` - Run all tests
- `deno task test:watch` - Run tests in watch mode
- `deno task test:coverage` - Run tests with coverage
- `deno task coverage` - Generate HTML coverage report
- `deno task fmt` - Format code
- `deno task lint` - Lint code
- `deno task check` - Type check all TypeScript files

## Architecture

This library follows Domain-Driven Design (DDD) principles with a layered
architecture:

- **Domain Layer**: Contains the core business logic, entities, and value
  objects
- **Application Layer**: Orchestrates domain logic and coordinates with
  infrastructure
- **Infrastructure Layer**: Handles external concerns like data persistence and
  RSS parsing

The design ensures clean separation of concerns and makes the codebase
maintainable and testable.
