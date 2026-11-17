import { describe, expect, it } from "vitest";
import { merge } from "../src/merge";

describe("merge", () => {
  it("merges two ascending collections and one descending collection", () => {
    expect(merge([0, 3, 8, 15], [1, 3, 9], [20, 7, 2, 0])).toEqual([
      0, 0, 1, 2, 3, 3, 7, 8, 9, 15, 20,
    ]);
  });

  it("returns an empty array when every collection is empty", () => {
    expect(merge([], [], [])).toEqual([]);
  });

  it("works when only one collection has items", () => {
    expect(merge([1, 2, 3], [], [])).toEqual([1, 2, 3]);
    expect(merge([], [4, 5, 6], [])).toEqual([4, 5, 6]);
    expect(merge([], [], [9, 8, 7])).toEqual([7, 8, 9]);
  });

  it("works when the collections have different lengths", () => {
    expect(merge([5], [1, 2, 3, 4, 6, 7], [10, 0])).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 10,
    ]);
  });

  it("keeps duplicate values", () => {
    expect(merge([2, 2, 2], [2, 2], [2, 2, 2])).toEqual([2, 2, 2, 2, 2, 2, 2, 2]);
  });

  it("handles zeros and negative numbers", () => {
    expect(merge([-5, 0, 4], [-2, 0], [3, 0, -9])).toEqual([
      -9, -5, -2, 0, 0, 0, 3, 4,
    ]);
  });

  it("works when the collections do not overlap", () => {
    expect(merge([1, 2, 3], [10, 11, 12], [6, 5, 4])).toEqual([
      1, 2, 3, 4, 5, 6, 10, 11, 12,
    ]);
  });

  it("does not change the input collections", () => {
    const collection_1 = [1, 4];
    const collection_2 = [2, 5];
    const collection_3 = [6, 3];

    merge(collection_1, collection_2, collection_3);

    expect(collection_1).toEqual([1, 4]);
    expect(collection_2).toEqual([2, 5]);
    expect(collection_3).toEqual([6, 3]);
  });

  it("returns a sorted result with the same items for many generated inputs", () => {
    const random = createRandom(2026);

    for (let round = 0; round < 200; round++) {
      const collection_1 = ascending(random, Math.floor(random() * 30));
      const collection_2 = ascending(random, Math.floor(random() * 30));
      const collection_3 = reversed(ascending(random, Math.floor(random() * 30)));

      const result = merge(collection_1, collection_2, collection_3);

      expect(result.length).toBe(
        collection_1.length + collection_2.length + collection_3.length,
      );
      expect(isAscending(result)).toBe(true);
      expect(countValues(result)).toEqual(
        countValues([...collection_1, ...collection_2, ...collection_3]),
      );
    }
  });
});

// The helpers below build and check test data without using any sort function.

// Small seeded generator, so the generated inputs are the same on every run.
function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

// Builds an ascending array by starting at 0 and adding a step of 0 to 4 each time.
function ascending(random: () => number, length: number): number[] {
  const values: number[] = [];
  let current = 0;
  for (let index = 0; index < length; index++) {
    current += Math.floor(random() * 5);
    values.push(current);
  }
  return values;
}

function reversed(values: number[]): number[] {
  const result: number[] = [];
  for (let index = values.length - 1; index >= 0; index--) {
    result.push(values[index]);
  }
  return result;
}

function isAscending(values: number[]): boolean {
  for (let index = 1; index < values.length; index++) {
    if (values[index - 1] > values[index]) return false;
  }
  return true;
}

function countValues(values: number[]): Map<number, number> {
  const counts = new Map<number, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}
