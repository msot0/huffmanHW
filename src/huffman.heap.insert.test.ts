import {
  binaryHeapInsert,
  checkHeapInvariant,
  initBinaryHeap,
  initBinaryHeapItem,
} from "./huffman";

test("heap insert (jenny 8675309)", () => {
  const heap = initBinaryHeap("max");
  expect(checkHeapInvariant(heap)).toBe(true);
  binaryHeapInsert(heap, initBinaryHeapItem(8, "eight"));
  expect(checkHeapInvariant(heap)).toBe(true);
  binaryHeapInsert(heap, initBinaryHeapItem(6, "six"));
  expect(checkHeapInvariant(heap)).toBe(true);
  binaryHeapInsert(heap, initBinaryHeapItem(7, "seven"));
  expect(checkHeapInvariant(heap)).toBe(true);
  binaryHeapInsert(heap, initBinaryHeapItem(5, "five"));
  expect(checkHeapInvariant(heap)).toBe(true);
  binaryHeapInsert(heap, initBinaryHeapItem(3, "three"));
  expect(checkHeapInvariant(heap)).toBe(true);
  binaryHeapInsert(heap, initBinaryHeapItem(0, "oh"));
  expect(checkHeapInvariant(heap)).toBe(true);
  binaryHeapInsert(heap, initBinaryHeapItem(9, "niy-ee-ine"));
  expect(checkHeapInvariant(heap)).toBe(true);
});

test("heap insert (rando sequence)", () => {
  const heap = initBinaryHeap("max");
  const rando = [14, 7, 18, 5, 11, 16, 3, 19, 9, 15];
  for (const v of rando) {
    binaryHeapInsert(heap, initBinaryHeapItem(v, `${v}`));
    expect(checkHeapInvariant(heap)).toBe(true);
  }
  expect(heap.items.map((itm) => itm.priority)).toEqual([
    19, 18, 16, 11, 15, 14, 3, 5, 9, 7,
  ]);
});
