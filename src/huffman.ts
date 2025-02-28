// huffman.ts

// ---------------------------------------------------------    [ Types ]

/**
 * A binary heap holds items with heap values. Heaps can be either min or max
 * heaps. Min heaps have the smallest value at the root (first position), while
 * max heaps have the largest value at the root.
 */
export type BinaryHeap<T> = {
  // done for you
  semantics: "min" | "max";
  items: BinaryHeapItem<T>[];
};

/**
 * Binary heap items are the individual items in the heap. They have a priority
 * (which can be the same as other nodes) and a data payload, which can be of
 * any type.
 */
export type BinaryHeapItem<T> = {
  // done for you
  priority: number;
  payload: T;
};

/**
 * A priority queue is an abstract data type. Implementations can be backed by
 * many different data structures, such as a tree, an array, or (as is usual) a
 * binary heap.
 *
 * This is just an interface definition. The actual implementation is done
 * elsewhere.
 */
export interface PriorityQueue<T> {
  // done for you
  enqueue: (value: T, priority: number) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  size: () => number;
}

/**
 * Huffman nodes are the individual nodes in a Huffman tree. They have a
 * frequency, a character, and left and right children. If the character is
 * null, that indicates the node is an 'internal' node and is only used as a
 * branch point to go left or right, depending on the encoding string.
 */
export interface HuffmanNode {
  // done for you
  frequency: number;
  character: string;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

// ---------------------------------------------------------    [ Initialize ]

/**
 * Initializes a binary heap using the given semantics. The heap is empty
 * initially.
 */
export const initBinaryHeap = <T>(semantics: "min" | "max"): BinaryHeap<T> => {
  // done for you
  return {
    items: [],
    semantics,
  };
};

/**
 * Initialize a binary heap item with the given priority and payload.
 */
export const initBinaryHeapItem = <T>(
  priority: number,
  payload: T
): BinaryHeapItem<T> => {
  // done for you
  return {
    priority,
    payload,
  };
};

/**
 * Initialize a priority queue implementation backed by a binary heap. The
 * priority queue's operations are all defined inline, and simply defer to the
 * binary heap structure's operations.
 */
export const initPriorityQueue = <T>(
  semantics: "min" | "max"
): PriorityQueue<T> => {
  // done for you
  const heap = initBinaryHeap<T>(semantics);
  return {
    enqueue: (value: T, priority: number) =>
      binaryHeapInsert(heap, initBinaryHeapItem(priority, value)),
    dequeue: (): T | undefined => {
      const result = binaryHeapExtract(heap);
      return result?.payload ?? undefined;
    },
    peek: (): T | undefined => {
      const result = binaryHeapPeek(heap);
      return result?.payload ?? undefined;
    },
    size: (): number => binaryHeapSize(heap),
  };
};

// ---------------------------------------------------------    [ Helpers ]

/**
 * Checks the invariant of a binary heap. The invariant is that each parent
 * node has a higher priority than its children. The "isHigherPriority" function
 * is used to compare the priority of two nodes.
 */
export const checkHeapInvariant = <T>(heap: BinaryHeap<T>) => {
  // done for you
  for (let i = 0; i < heap.items.length; i++) {
    const parentIdx = heapIdxParent(i);
    if (parentIdx >= 0 && isHigherPriority(heap, i, parentIdx)) {
      return false;
    }
  }
  return true;
};

/**
 * Returns the parent index of the given child index using binary heap
 * semantics. This is undefined for the root node.
 */
export const heapIdxParent = (idx: number): number => {
  // IMPLEMENT
  // Pseudocode:
  // return the floor of (idx - 1) / 2
  return Math.floor((idx -1)/2);
};

/**
 * Returns an object with left and right child indices for the given parent
 * index using binary heap semantics.
 */
export const heapIdxChildren = (
  idx: number
): { left: number; right: number } => {
  // IMPLEMENT
  // HINT: the return value looks like this. Just replace the <...> with the
  // correct expression.
  //   return {
  //     left: <...>,
  //     right: <...>,
  //   };
  // pseudocode:
  // left index is (2* idx) + 1
  // right index is (2* idx) + 2
  // index 1
  // left = (2*1)+1=3
  // right = 4
  const left = 2 * idx + 1;
  const right = (2 * idx + 1) + 1;

  return { left, right };
};

/**
 * Returns true if the item at idxA has higher priority than the item at idxB
 * according to the binary heap semantics. Note that the given heap could be
 * configured to be a min heap or a max heap. If the priority is the same, then
 * this should return false (because duplicate priorities are allowed and one is
 * not considered higher than the other in any circumstance).
 */
export const isHigherPriority = <T>(
  heap: BinaryHeap<T>,
  idxA: number,
  idxB: number
): boolean => {
  // IMPLEMENT
  // pseudocode:
  // if heap.semantics is "min"
  //   return true if heap.items[idxA].priority is LESS THAN heap.items[idxB].priority
  // if heap.semantics is "max"
  //   return true if heap.items[idxA].priority is GREATER THAN heap.items[idxB].priority
  // otherwise return false
  const valA = heap.items[idxA].priority;
  const valB = heap.items[idxB].priority;
  if (heap.semantics === 'max') {
    // use larger of two
    return (valA > valB);
  } else {
  // use smaller of two
  return (valA < valB);
  }
};

/**
 * This function is used to fix the invariant of a binary heap, starting from
 * the given index and working its way up. It is recursive, and stops when the
 * priority of the child and its parent obey the invariant.
 *
 * This can be called 'bubble up', 'fix up', 'repair up', and so on.
 */
export const heapUp = <T>(heap: BinaryHeap<T>, childIdx: number): void => {
  // IMPLEMENT
  // pseudocode:
  // if childIdx is 0, return
  // otherwise:
  //   get the parent index of childIdx
  //   if the child has higher priority than the parent:
  //     swap the child and parent using a temp variable
  //     recursively call heapUp with the parent index
  if (childIdx === 0) {
    return;
  }
  const parentIdx = heapIdxParent(childIdx);
  if (isHigherPriority(heap, childIdx, parentIdx)) {
    const temp = heap.items[parentIdx];
    heap.items[parentIdx] = heap.items[childIdx];
    heap.items[childIdx]= temp;
    heapUp(heap, parentIdx);
  }
}; // in class code stop here, do extra credit w huffman shiz (go to yt vid & slides)!!!!!!!!!!!!!!!!!!!

/**
 * This fixes the invariant of the binary heap starting from the given parent
 * index and working its way down. This is also recursive, and stops when the
 * priority of the parent and its children obey the invariant.
 *
 * This can be called 'bubble down', 'fix down', 'repair down', and so on.
 */
export const heapDown = <T>(heap: BinaryHeap<T>, parentIdx: number): void => {
  // IMPLEMENT
  // pseudocode:
  // get the left and right child indices from the parent index.
  // determine if the left and right children exist (use heap.items.length)
  // determine if the left child has higher priority than the parent
  // determine if the right child has higher priority than the parent
  // if either the left or right child has a higher priority than the parent:
  //   swap the parent item the higher priority child. keep in mind that it is
  //   possible that only one child (left) exists. After swapping, recursively
  //   call heapDown with the child index that was swapped with the parent.

  const { left , right } = heapIdxChildren(parentIdx);
  let largest = parentIdx;

  if (left < heap.items.length && isHigherPriority(heap, left, largest)) {
    largest = left;
  }
  if (right < heap.items.length && isHigherPriority(heap, right, largest)) {
    largest = right;
  }
  if (largest !== parentIdx) {
    const temp = heap.items[parentIdx];
    heap.items[parentIdx] = heap.items[largest];
    heap.items[largest] = temp;
    heapDown(heap, largest);
  }
  

};

// ---------------------------------------------------------    [ Operations ]

/**
 * Returns the number of items in the heap. An empty heap has size 0.
 */
export const binaryHeapSize = <T>(heap: BinaryHeap<T>): number => {
  // IMPLEMENT
  // pseudocode:
  // return the length of the heap's items list
return heap.items.length;

};

/**
 * Inserts an item into the binary heap. By the end of this operation, the
 * invariant of the heap is maintained.
 */
export const binaryHeapInsert = <T>(
  heap: BinaryHeap<T>,
  item: BinaryHeapItem<T>
) => {
  // IMPLEMENT
  // pseudocode:
  // push the item into the heap's item list
  // call heapUp with the index of the newly inserted item
  heap.items.push(item);
  heapUp(heap, heap.items.length - 1);

};

/**
 * Removes and returns the item with the highest priority from the binary
 * heap. By the end of this operation, the invariant of the heap is
 * maintained.
 */
export const binaryHeapExtract = <T>(
  heap: BinaryHeap<T>
): BinaryHeapItem<T> => {
  // IMPLEMENT
  // pseudocode:
  // get a reference to the first item in the heap for later return.
  //
  // if the heap is empty, return undefined
  //
  // else, if the heap has only one item, pop and return that item
  //
  // else, pop the last item and assign it to the first item. then call heapDown
  // from the root index (zero) to repair the heap.
  //
  // return the item that was removed, which was referenced at the start.
  const item = heap.items[0];
  if (heap.items.length === 0) {
    return undefined;
  } else {
    if (heap.items.length === 1) {
      heap.items.pop();
    } else {
      heap.items[0] = heap.items.pop();
      heapDown(heap,0);
    } 
  } 
  return item; 
};

/**
 * Peek at the item with the highest priority in the heap. If the heap is empty
 * this should return undefined. Peeking does not remove the item from the heap.
 */
export const binaryHeapPeek = <T>(
  heap: BinaryHeap<T>
): BinaryHeapItem<T> | undefined => {
  // IMPLEMENT
  // pseudocode:
  // if the heap is empty, return undefined
  // else, return the first item in the heap without removing it
  if (heap.items.length === 0) {
    return undefined;
  } else {
    return heap.items[0];
  } 
};

/**
 * Creates a frequency map from a corpus of text. Iterate through each character
 * of the input corpus, and increment the count for that character. Characters
 * that do not appear in the corpus will not be present in the frequency map.
 *
 * For example, the tiny corpus "hello world" should produce the frequency map:
 *
 * {
 *   " ": 1, // note that the order of keys is not important
 *   d: 1,
 *   e: 1,
 *   h: 1,
 *   l: 3,
 *   o: 2,
 *   r: 1,
 *   w: 1,
 * }
 *
 * The corpus you'll likely get will be a lot longer, as it is meant to model
 * the frequency of characters in English text.
 */
export const huffmanCreateFrequencyMap = (
  corpus: string
): Record<string, number> => {
  const frequencyMap: Record<string, number> = {};
  for (const char of corpus){
    if (frequencyMap[char] !== undefined){
      frequencyMap[char]++;
    } else {
      frequencyMap[char] = 1;
    }
  }
  return frequencyMap;
};

/**
 * Creates a Huffman tree from a frequency map. A Huffman tree is a binary tree
 * built from HuffmanNode objects. The return value is the root of the tree.
 */
export const huffmanCreateTree = (
  frequencyMap: Record<string, number>
): HuffmanNode => {
  // IMPLEMENT
  //
  // Hint: you need to create priority queue with smaller numbers having higher
  // priority. It will contain HuffmanNode items. The syntax for doing this is:
  // const pq = initPriorityQueue<HuffmanNode>("min");
  const pq = initPriorityQueue<HuffmanNode>("min");
  // Then, iterate over all the character/frequency values in the frequencyMap.
  // Syntax looks like this:
  //
  // for (const [character, frequency] of Object.entries(frequencyMap)) { .. }
  for (const [character, frequency] of Object.entries(frequencyMap)) {
    const node: HuffmanNode = {
      frequency,
      character,
      left: null,
      right: null,
    };
    pq.enqueue(node, frequency);
  }
  // inside each iteration, create a new HuffmanNode object using the frequency
  // and character data, and with null left & right fields. Then enqueue that
  // node into the priority queue with the related frequency.
  //
  // Then: as long as there are 2 or more things in the priority queue: dequeue
  // once into a variable for 'left', then dequeue again into 'right'. Create a
  // new combined HuffmanNode: Its character should be null to indicate it is an
  // internal node. Its frequency is the sum of the left and right. Its left and
  // right values should be the left and right variables you just got from the
  // queue. Then enqueue that combined node back into the pq.
  while (pq.size() > 1) {
    const left = pq.dequeue();
    const right = pq.dequeue();
    const combinedNode: HuffmanNode = {
      frequency: (left.frequency + right.frequency),
      character: null,
      left,
      right,
    };
    pq.enqueue(combinedNode, combinedNode.frequency);
  }

  // Last thing to do is to peek at the only remaining item in the priority
  // queue and return it.
  return pq.peek();
  
};

/**
 * Creates a Huffman code map from a Huffman tree. The code map records the
 * mapping from input characters to encoded strings. For example, if "a" is
 * encoded by "01" and "b" is encoded by "101", then the code map returned
 * should include:
 *
 * {
 *   a: "01",
 *   b: "101",
 *   // and other mappings as well
 * }
 */
export const huffmanCreateCodeMap = (
  root: HuffmanNode
): Record<string, string> => {
  if (root === null) {
    return {};
  } else {
    const codeMap: Record<string, string> = {};
    const traverse = (node: HuffmanNode, code: string) => {
      if (node.character !== null) {
        codeMap[node.character] = code;
      } else {
        if(node.left !== null) {
          traverse(node.left, code + "0");
        } 
        if(node.right !== null) {
          traverse(node.right, code + '1');
        }
      } 
    };
    traverse(root, "");
    return codeMap;
  }
};

/**
 * Encodes a string using a Huffman code map and returns it. For this we need a
 * plaintext string, like "hello", and it uses a code map to create an encoded
 * string for every character.
 */
export const huffmanEncode = (
  plaintext: string,
  codeMap: Record<string, string>
): string => {
  // IMPLEMENT
  let encodedString = "";
  for (const char of plaintext) {
    encodedString += codeMap[char];
  }
  return encodedString;
};

/**
 * Decodes an encoded string using a Huffman tree and returns it. For this we
 * need an encoded string, like "01001101", and it uses the given Huffman tree
 * to decode the string into a plaintext string.
 */
export const huffmanDecode = (encoded: string, root: HuffmanNode): string => {
  let decodedString = "";
  let currentNode = root;
  for (const bit of encoded) {
    if(bit === "0") {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
    if (currentNode.character !== null) {
      decodedString += currentNode.character;
      currentNode = root;
    }
  }
  return decodedString;
};
