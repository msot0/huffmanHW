import cloneDeep from "lodash.clonedeep";
import {
  initBinaryHeap,
  binaryHeapExtract,
  checkHeapInvariant,
  binaryHeapSize,
} from "./huffman";
import { _potato, _hi } from "./huffman.heap.indexes.test";

test("heap extract (empty)", () => {
  // extracting from an empty heap should return undefined and the heap should
  // not be modified in any way.
  const heap = initBinaryHeap("max");
  expect(binaryHeapExtract(heap)).toBeUndefined();
  expect(checkHeapInvariant(heap)).toBe(true);
  expect(binaryHeapSize(heap)).toBe(0);
});

test("heap extract (potato)", () => {
  const heap = cloneDeep(_potato);
  expect(checkHeapInvariant(heap)).toBe(true);
  expect(heap.items.map((itm) => itm.priority)).toEqual([10, 4, 9, 3, 2]);
  const extracted = binaryHeapExtract(heap);
  expect(extracted).toEqual(_hi(10));
  expect(heap.items.map((itm) => itm.priority)).toEqual([9, 4, 2, 3]);
  expect(checkHeapInvariant(heap)).toBe(true);
  // now extract the rest of the items, checking the size decreases by one each
  // time, and that the invariant checks out.
  const initialSize = heap.items.length;
  for (let i = 0; i < initialSize; i++) {
    binaryHeapExtract(heap);
    expect(binaryHeapSize(heap)).toBe(initialSize - i - 1);
    expect(checkHeapInvariant(heap)).toBe(true);
  }
});
