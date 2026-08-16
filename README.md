# collection-utils

A small collection of generic TypeScript utilities for working with collections.

Built as an exercise to practice TypeScript generics, mapped types, conditional types, API design, and test-driven 
development.

## Features

- Generic, type-safe APIs
- Immutable operations
- `readonly` collection inputs
- Selector-based API design
- Fully tested

## Installation

Clone the repository and install the dependencies.

```bash
npm install
```

Run the test suite with:

```bash
npm test
```

## Example

```ts
import {
  countBy,
  groupBy,
  maxBy,
  pluck,
  uniqueBy,
} from "./utils";

const users = [
  { id: 1, name: "Alice", team: "Blue", salary: 100 },
  { id: 2, name: "Bob", team: "Red", salary: 250 },
  { id: 3, name: "Charlie", team: "Blue", salary: 150 },
];

const salaries = pluck(users, user => user.salary);
// [100, 250, 150]

const teams = groupBy(users, user => user.team);
// {
//   Blue: [...],
//   Red: [...]
// }

const counts = countBy(users, user => user.team);
// {
//   Blue: 2,
//   Red: 1
// }

const highestPaid = maxBy(users, user => user.salary);
// { id: 2, name: "Bob", team: "Red", salary: 250 }

const uniqueTeams = uniqueBy(users, user => user.team);
// [
//   { id: 1, ... },
//   { id: 2, ... }
// ]
```

## Available utilities

### Aggregation

- `countBy`
- `groupBy`
- `indexBy`
- `partition`

### Selection

- `findBy`
- `uniqueBy`
- `pluck`

### Ordering

- `sumBy`
- `maxBy`
- `sortBy`

### Collection

- `chunk`
- `zip`

## Goals

This project focuses on writing clear, type-safe utilities while exploring modern TypeScript features, including:

- Generics
- Utility types
- Mapped types
- Conditional types
- Tuples
- Generic type inference