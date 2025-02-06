import {
  BinaryHeap,
  BinaryHeapItem,
  heapIdxChildren,
  heapIdxParent,
  isHigherPriority,
} from "./huffman";

import cloneDeep from "lodash.clonedeep";

/**
 * convenience function to create a BinaryHeapItem from a number
 */
export const _hi = (v: number): BinaryHeapItem<string> => ({
  priority: v,
  payload: `${v}`,
});

/**
 * Jenny is a max heap based on that song, 8675309. It has a broken invariant:
 * the 9 at the end has higher priority than its parent.
 */
export const _maxJenny: BinaryHeap<string> = {
  items: [_hi(8), _hi(7), _hi(6), _hi(5), _hi(3), _hi(0), _hi(9)],
  semantics: "max",
};

/**
 * Min heap version of _maxJenny, and this one obeys the invariant.
 */
export const _minJenny: BinaryHeap<string> = {
  items: [_hi(0), _hi(5), _hi(3), _hi(8), _hi(6), _hi(7), _hi(9)],
  semantics: "min",
};

/**
 * Potato is a valid max heap. with five items. Named potato because why not.
 */
export const _potato: BinaryHeap<string> = {
  items: [_hi(10), _hi(4), _hi(9), _hi(3), _hi(2)],
  semantics: "max",
};

test("heap parent index", () => {
  // parent of root is undefined, so not testing it.
  expect(heapIdxParent(1)).toBe(0);
  expect(heapIdxParent(2)).toBe(0);
  expect(heapIdxParent(3)).toBe(1);
  expect(heapIdxParent(4)).toBe(1);
  expect(heapIdxParent(5)).toBe(2);
  expect(heapIdxParent(6)).toBe(2);
  expect(heapIdxParent(7)).toBe(3);
  expect(heapIdxParent(8)).toBe(3);
  expect(heapIdxParent(9)).toBe(4);
  expect(heapIdxParent(10)).toBe(4);
  expect(heapIdxParent(11)).toBe(5);
  expect(heapIdxParent(12)).toBe(5);
  // some larger values for grins
  expect(heapIdxParent(100)).toBe(49);
  expect(heapIdxParent(251)).toBe(125);
});

test("heap children indices", () => {
  expect(heapIdxChildren(1)).toEqual({ left: 3, right: 4 });
  expect(heapIdxChildren(5)).toEqual({ left: 11, right: 12 });
  expect(heapIdxChildren(6)).toEqual({ left: 13, right: 14 });
});

test("max heap priority check", () => {
  const heap = cloneDeep(_maxJenny);
  // the numbers given here are indices, not the values to compare.
  expect(isHigherPriority(heap, 0, 1)).toBe(true);
  expect(isHigherPriority(heap, 6, 6)).toBe(false);
  expect(isHigherPriority(heap, 1, 0)).toBe(false);
});

test("min heap priority check", () => {
  const heap = cloneDeep(_minJenny);
  expect(isHigherPriority(heap, 0, 1)).toBe(true);
  expect(isHigherPriority(heap, 6, 6)).toBe(false);
  expect(isHigherPriority(heap, 1, 0)).toBe(false);
});
