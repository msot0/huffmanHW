import {
  initBinaryHeap,
  binaryHeapPeek,
  binaryHeapSize,
  binaryHeapInsert,
} from "./huffman";
import { _hi } from "./huffman.heap.indexes.test";

test("max heap, insert, peek, size", () => {
  const heap = initBinaryHeap("max");
  // peek and size on an empty heap should work
  expect(binaryHeapPeek(heap)).toBeUndefined();
  expect(binaryHeapSize(heap)).toBe(0);
  // insert 1 into an empty heap, so top is 1 and size is 1
  binaryHeapInsert(heap, _hi(1));
  expect(binaryHeapPeek(heap)).toEqual(_hi(1));
  expect(binaryHeapSize(heap)).toBe(1);
  // insert 2, so top is 2 and size is 2
  binaryHeapInsert(heap, _hi(2));
  expect(binaryHeapPeek(heap)).toEqual(_hi(2));
  expect(binaryHeapSize(heap)).toBe(2);
  // insert 6, so top is 6 and size is 3
  binaryHeapInsert(heap, _hi(6));
  expect(binaryHeapPeek(heap)).toEqual(_hi(6));
  expect(binaryHeapSize(heap)).toBe(3);
  // insert 3, so top is still 6 and size is 4
  binaryHeapInsert(heap, _hi(3));
  expect(binaryHeapPeek(heap)).toEqual(_hi(6));
  expect(binaryHeapSize(heap)).toBe(4);
});
