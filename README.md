# Homework Name

**NOTE:** for general advice on how to get, edit, and submit homework, check out
the [GENERAL.MD](GENERAL.MD) file. That will be the case for all homeworks.

## 📣 Important! There is extra credit afoot!

This assignment is intentionally very hard, and if you solve everything, you
will get a lot of extra credit. There are 15 tests total, but you only need to
pass 8 of them to get 100%.

Each test ends up being worth 12.5%. So passing all 15 will give you 188%.

## Overview

Huffman coding is a lossless strategy for encoding and decoding information such
that the encoded form is generally much smaller than the unencoded form. This
has been covered on my slides and in the videos. If you want more, the Wikipedia
page is pretty good. It includes pseudocode and one-liners that you can use
directly in this homework. (e.g. what are the parent/child indexes of a given
node?)

## Binary Heap, Priority Queue, and Huffman

In order to encode and decode text with Huffman codes, we'll need to use an
abstract data type called a Priority Queue. This is like a normal queue, except
all items have a priority, and they always appear in priority order so the
highest priority item is the first one.

The priority queue ADT is often implemented with a Binary Heap data structure.

For this homework, you'll start by building the binary heap's operations. If you
build those correctly, the priority queue (made from `initPriorityQueue`) will
Just Work™.

Last, the Huffman algorithm itself has several pieces to it.

In all cases, refer to the individual unit tests for what you're working on to
see what exactly is involved.

## Building a Huffman codec tree and code map

Huffman coding works by first reading a corpus of information. This corpus
should have all the symbols in the alphabet that you want to write messages in.
From doing this, we'll create a frequency map, something that says "letter _a_
appeared 283 times, letter _b_ appeared 43 times..." and so on.

Next, using the frequency map as input, we create a codec tree. To make the
tree, we create nodes for each symbol using their frequencies as a priority, and
add those nodes to a priority queue that treats smaller frequencies as higher
priority. We pop two nodes from the queue, combine them into an internal node
whose priority is the sum of the two nodes we built it from. That node's left
and right children are the two nodes we just popped. Then add that combined node
into the priority queue. Continue this until there is only one item left in the
queue. That is the root of your codec tree.

The path from the root down to each leaf is the bit string that encodes each
symbol. For example, if the path from the root to the letter 'G' is left, left,
right, left, then the encoded string might be "0010", using "0" for left turns,
and "1" for right turns.

So we can traverse the codec tree to visit every leaf node, and record the path
from root to leaf for each symbol that appears on the leaf layer. This lets us
build a code map.

The code map is used to encode plaintext input, and the tree is used to decode
encoded input.

## Encoding and Decoding

Once we have a code map and codec tree, we can encode messages to bit strings,
and decode them back to the original plain text input.

Check out the `huffman.roundtrip.test.ts` file. It uses Beowulf as the input
text, because why not? This shows the complete process of creating all the
requisite objects: a frequency map, a codec tree, and the code map; it then uses
these to encode and decode several messages.

## Specific homework advice

In `huffman.ts`, start at the top and work your way down, looking for `//
IMPLEMENT`. This means you'll implement the binary heap-related pieces first. In
most cases I have provided some pseudo-code to guide you. If you find that
distracting, feel free to delete it and do your own thing.

Many of the functions are short: one or a few lines. Some of them (like the
`heapUp` and `heapDown` functions are a little longer, like 20 or 25 lines).

To get another batch of points, you need to make suites pass. Refer to each test
file (which constitutes a test suite) and see what it is actually doing. For
example, in the `heap.up` test file you will see this at the top:

```
import { heapUp, isHigherPriority } from "./huffman";
```

This tells you that the only of your functions that this test file will use are
`heapUp` and `isHigherPriority` - so if you're trying to pass that suite, you'll
only need to focus on those two functions.

Read the code that is already written for you. If you're still feeling shaky
with syntax, looking at working code can perhaps inspire you?
