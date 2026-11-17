import { merge } from "./merge";

const collection_1 = [0, 3, 8, 15];
const collection_2 = [1, 3, 9];
const collection_3 = [20, 7, 2, 0];

const merged = merge(collection_1, collection_2, collection_3);

console.log(`collection_1 (min to max): [${collection_1.join(", ")}]`);
console.log(`collection_2 (min to max): [${collection_2.join(", ")}]`);
console.log(`collection_3 (max to min): [${collection_3.join(", ")}]`);
console.log(`merged (ascending):        [${merged.join(", ")}]`);
