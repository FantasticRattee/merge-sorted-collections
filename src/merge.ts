/**
 * Merges three sorted integer collections into one ascending array.
 * It does not use any sort function.
 *
 * - collection_1 and collection_2 are sorted from min to max (ascending).
 * - collection_3 is sorted from max to min (descending).
 *
 * How it works:
 * Every collection is already sorted, so its smallest unread value is at one end.
 * The function keeps one pointer for each collection.
 * In each step, it compares the three values at the pointers.
 * It adds the smallest value to the result and moves that pointer.
 * collection_3 is descending, so the function reads it from the last index.
 *
 * Time:  O(n), where n is the total number of items. Each item is read once.
 * Space: O(n) for the result array. The inputs are not changed.
 */
export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[],
): number[] {
  const result: number[] = [];

  let i = 0; // next unread index in collection_1
  let j = 0; // next unread index in collection_2
  let k = collection_3.length - 1; // next unread index in collection_3 (from the end)

  while (i < collection_1.length || j < collection_2.length || k >= 0) {
    // A finished collection offers Infinity, so it can never be the smallest.
    const value_1 = i < collection_1.length ? collection_1[i] : Infinity;
    const value_2 = j < collection_2.length ? collection_2[j] : Infinity;
    const value_3 = k >= 0 ? collection_3[k] : Infinity;

    if (value_1 <= value_2 && value_1 <= value_3) {
      result.push(value_1);
      i++;
    } else if (value_2 <= value_3) {
      result.push(value_2);
      j++;
    } else {
      result.push(value_3);
      k--;
    }
  }

  return result;
}
