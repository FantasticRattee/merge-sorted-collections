# Merge sorted collections

This TypeScript project merges three sorted integer collections into one ascending array. It does **not use any sort function**.

```ts
merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[]
```

| Input | Order |
| --- | --- |
| `collection_1` | sorted from min to max (ascending) |
| `collection_2` | sorted from min to max (ascending) |
| `collection_3` | sorted from max to min (descending) |

Example:

```ts
merge([0, 3, 8, 15], [1, 3, 9], [20, 7, 2, 0]);
// [0, 0, 1, 2, 3, 3, 7, 8, 9, 15, 20]
```

## How it works

Every collection is already sorted, so its smallest unread value is at one end:

- The function reads `collection_1` and `collection_2` from the first index.
- `collection_3` is descending, so the function reads it from the last index.

The function keeps one pointer for each collection. In each step, it compares the three values at the pointers. It adds the smallest value to the result and moves that pointer. It repeats this until every collection is finished.

- **Time:** O(n), where n is the total number of items. Each item is read once.
- **Space:** O(n) for the result array.
- No sort function is used, and the input arrays are not changed.

The code is in [`src/merge.ts`](src/merge.ts).

## Requirements

- Node.js 22.12 or newer (Node.js 24 also works)
- npm (installed with Node.js)

## Setup

```bash
git clone https://github.com/FantasticRattee/merge-sorted-collections.git
cd merge-sorted-collections
npm install
```

## Run the example

```bash
npm start
```

Expected output:

```
collection_1 (min to max): [0, 3, 8, 15]
collection_2 (min to max): [1, 3, 9]
collection_3 (max to min): [20, 7, 2, 0]
merged (ascending):        [0, 0, 1, 2, 3, 3, 7, 8, 9, 15, 20]
```

## Run the unit tests

```bash
npm test
```

The tests are in [`tests/merge.test.ts`](tests/merge.test.ts) and use [Vitest](https://vitest.dev/). They cover:

- the normal case (two ascending collections and one descending collection)
- empty collections, and cases where only one collection has items
- collections with different lengths
- duplicate values, zeros and negative numbers
- collections whose values do not overlap
- the input arrays staying unchanged
- 200 generated inputs, checking that the result is ascending and contains exactly the same items

Optional type check:

```bash
npm run typecheck
```

## Project structure

```
src/
  merge.ts        the merge function
  index.ts        small example that prints a merged result
tests/
  merge.test.ts   unit tests
```
