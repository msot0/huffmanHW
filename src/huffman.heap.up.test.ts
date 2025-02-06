import cloneDeep from "lodash.clonedeep";
import { _maxJenny } from "./huffman.heap.indexes.test";
import { heapUp, isHigherPriority } from "./huffman";

test("max heap, heapUp", () => {
  const heap = cloneDeep(_maxJenny);
  // index 6 is value 9, index 2 is its parent, has value 7
  expect(isHigherPriority(heap, 6, 2)).toBe(true); // currently broken!
  heapUp(heap, 6);
  expect(isHigherPriority(heap, 6, 2)).toBe(false); // should be fixed.
});
