# SaaS Dashboard Architecture

## Overview

This project follows a modular, feature-driven architecture with clear separation of concerns, following DRY principles and best practices for maintainability and scalability.

## Directory Structure

```
src/
├── components/           # Shared UI components
│   ├── shared/          # Reusable shared components
│   ├── ui/              # Base UI components (shadcn/ui)
│   └── sidebar/         # Layout components
├── data/                # Data layer
│   ├── shared/          # Shared data types, constants, utilities
│   ├── dashboard/       # Dashboard-specific data
│   ├── notifications/   # Notification data
│   └── contacts/        # Contact data
├── hooks/               # Custom React hooks
├── lib/                 # Library and utilities (utils.ts)
├── modules/             # Feature modules
│   ├── dashboard/       # Dashboard feature
│   ├── notifications/   # Notifications feature
│   └── contacts/        # Contacts feature
├── providers/           # React context providers
├── stores/              # Zustand stores
├── types/               # Global TypeScript types
└── utils/               # Utility functions
```

## Architecture Principles

### 1. DRY (Don't Repeat Yourself)

- Shared utilities in `/utils` and `/data/shared`
- Reusable components in `/components/shared`
- Common types in `/data/shared/types`
- Base store pattern for consistent state management

### 2. Modular Design

- Each feature is self-contained in its own module
- Clear separation between data, components, and logic
- Feature modules export everything through index files

### 3. Separation of Concerns

- **Data Layer**: Pure data and types in `/data`
- **State Management**: Zustand stores in `/stores`
- **UI Components**: React components in `/components` and `/modules/*/components`
- **Business Logic**: Custom hooks in `/hooks` and `/modules/*/hooks`
- **Utilities**: Helper functions in `/utils`

## Module Structure

Each feature module follows this structure:

```
modules/[feature]/
├── components/          # Feature-specific components
├── hooks/              # Feature-specific hooks
├── types/              # Feature-specific types
├── services/           # API services (future)
├── utils/              # Feature-specific utilities
└── index.ts           # Module exports
```

## Data Layer

### Shared Data (`/data/shared/`)

- **types.ts**: Common interfaces and types
- **constants.ts**: Shared constants and enums
- **utils.ts**: Data manipulation utilities

### Feature Data (`/data/[feature]/`)

- Feature-specific data structures
- Sample data for development
- Data transformation functions

## State Management

### Base Store Pattern

All stores extend a base store that provides:

- Loading states
- Error handling
- Pagination
- Sorting and filtering
- Common CRUD operations

### Store Structure

```typescript
interface FeatureStore extends BaseStoreState {
  // Feature-specific state
  data: FeatureData[];
  selectedItem: string | null;

  // Feature-specific actions
  addItem: (item: Omit<FeatureData, "id">) => void;
  updateItem: (id: string, updates: Partial<FeatureData>) => void;
  deleteItem: (id: string) => void;

  // Computed selectors
  filteredData: FeatureData[];
  stats: FeatureStats;
}
```

## Component Architecture

### Shared Components (`/components/shared/`)

- **LoadingSpinner**: Reusable loading indicator
- **ErrorBoundary**: Error handling wrapper
- **EmptyState**: Empty state display

### Feature Components (`/modules/[feature]/components/`)

- Feature-specific UI components
- Business logic components
- Data display components

## Utility Functions

### Formatting (`/utils/format.ts`)

- Currency, number, percentage formatting
- Date and time formatting
- File size formatting
- Phone number formatting

### Validation (`/utils/validation.ts`)

- Email, phone, URL validation
- Password strength validation
- Credit card validation
- Form validation helpers

### Array Operations (`/utils/array.ts`)

- Chunking, unique operations
- Grouping and sorting
- Finding and filtering
- Statistical operations

### Date Operations (`/utils/date.ts`)

- Date arithmetic
- Date comparisons
- Date range operations
- Time formatting

## Naming Conventions

### Files

- **Components**: PascalCase (e.g., `MetricCard.tsx`)
- **Utilities**: camelCase (e.g., `formatCurrency.ts`)
- **Types**: camelCase (e.g., `dashboardTypes.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `CHART_COLORS`)

### Variables and Functions

- **Variables**: camelCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### Components

- **Component names**: PascalCase
- **Props interfaces**: `ComponentNameProps`
- **Event handlers**: `handleEventName`

## Best Practices

### 1. Component Design

- Single responsibility principle
- Props interface definition
- Proper TypeScript typing
- Accessibility considerations

### 2. State Management

- Use Zustand for global state
- Local state for component-specific data
- Computed selectors for derived data
- Optimistic updates where appropriate

### 3. Data Flow

- Unidirectional data flow
- Props down, events up
- Store actions for complex operations
- Custom hooks for business logic

### 4. Performance

- Memoization for expensive calculations
- Lazy loading for large datasets
- Virtual scrolling for long lists
- Image optimization

### 5. Error Handling

- Error boundaries for component errors
- Store-level error states
- User-friendly error messages
- Logging for debugging

## Future Enhancements

### 1. API Integration

- Service layer in each module
- API client with interceptors
- Request/response transformation
- Error handling and retries

### 2. Testing

- Unit tests for utilities
- Component tests with React Testing Library
- Integration tests for modules
- E2E tests for critical flows

### 3. Performance

- Code splitting by route
- Lazy loading of modules
- Bundle analysis and optimization
- Caching strategies

### 4. Accessibility

- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## Getting Started

1. **Adding a new feature module**:

   ```bash
   mkdir -p src/modules/[feature]/{components,hooks,types,services,utils}
   touch src/modules/[feature]/index.ts
   ```

2. **Creating a new store**:

   ```typescript
   import { createBaseStore } from "@/stores/base-store";

   export const useFeatureStore = createBaseStore<FeatureStore>({
     // Initial state and actions
   });
   ```

3. **Adding shared utilities**:
   ```typescript
   // Add to appropriate file in /utils/
   export const newUtility = () => {
     // Implementation
   };
   ```

This architecture provides a solid foundation for building scalable, maintainable React applications while following industry best practices and DRY principles.
