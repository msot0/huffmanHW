// NOTE:
//
// Isn't it cool that the only thing we need to import is the initPriorityQueue?
// Since the priority queue interface is backed by an implementation that we
// don't actually need to know anything about, we can interact with the priority
// queue entirely in terms of the interface functions! 😎
import { initPriorityQueue } from "./huffman";

test("priority queue", () => {
  // This tests the priority queue interface, which is backed by a binary heap.
  // The heap should already be implemented fully before this can be expected to
  // work.

  // Use a priority queue to simulate a hospital emergency room. The priority is
  // the severity of the condition. Patients are processed in priority order.
  // Priority ranges from 10 (most urgent) to 1 (least urgent).
  const pq = initPriorityQueue<string>("max");
  expect(pq.size()).toBe(0);
  pq.enqueue("Broken arm", 5);
  expect(pq.size()).toBe(1);
  expect(pq.peek()).toBe("Broken arm");
  pq.enqueue("Paper cut", 1);
  expect(pq.size()).toBe(2);
  expect(pq.peek()).toBe("Broken arm");
  pq.enqueue("Migraine", 3);
  expect(pq.size()).toBe(3);
  expect(pq.peek()).toBe("Broken arm");
  pq.enqueue("Chest pains", 8);
  expect(pq.size()).toBe(4);
  expect(pq.peek()).toBe("Chest pains");
  // Process the patients in priority order.
  expect(pq.dequeue()).toBe("Chest pains");
  expect(pq.size()).toBe(3);
  expect(pq.peek()).toBe("Broken arm");
  expect(pq.dequeue()).toBe("Broken arm");
  expect(pq.size()).toBe(2);
  // somebody comes in an ambulance :(
  pq.enqueue("Heart attack", 10);
  expect(pq.size()).toBe(3);
  expect(pq.peek()).toBe("Heart attack");
  expect(pq.dequeue()).toBe("Heart attack");
  expect(pq.size()).toBe(2);
  expect(pq.dequeue()).toBe("Migraine");
  expect(pq.size()).toBe(1);
  expect(pq.dequeue()).toBe("Paper cut");
  // The queue is now empty, so peek and dequeue should return undefined.
  expect(pq.size()).toBe(0);
  expect(pq.peek()).toBeUndefined();
  expect(pq.dequeue()).toBeUndefined();
  // check that we can add/remove again and get back to empty OK.
  pq.enqueue("Nasty cut", 7);
  expect(pq.size()).toBe(1);
  expect(pq.peek()).toBe("Nasty cut");
  expect(pq.dequeue()).toBe("Nasty cut");
  expect(pq.size()).toBe(0);
  expect(pq.peek()).toBeUndefined();
  expect(pq.dequeue()).toBeUndefined();
});
