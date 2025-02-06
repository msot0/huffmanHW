import cloneDeep from "lodash.clonedeep";
import { BinaryHeap, isHigherPriority, heapDown } from "./huffman";
import { _hi } from "./huffman.heap.indexes.test";

const minBroken: BinaryHeap<string> = {
  //          0       1       2       3
  items: [_hi(8), _hi(5), _hi(3), _hi(1)],
  semantics: "min",
};

test("min heap, heapDown", () => {
  const heap = cloneDeep(minBroken);
  expect(isHigherPriority(heap, 0, 1)).toBe(false);
  heapDown(heap, 0);
  expect(isHigherPriority(heap, 0, 1)).toBe(true); // should be fixed.
});
