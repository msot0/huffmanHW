import { huffmanCreateFrequencyMap, huffmanCreateTree } from "./huffman";
import { _testCorpus } from "./huffman.freqmap.test";

test("huffman tree", () => {
  // there are multiple possible encoding trees because the symbols with the
  // same frequency have been put into the priority queue in any order. So it
  // would not be right to check for a specific shape.
  //
  // So, this test really just checks that the root has the correct frequency.
  const frequencyMap = huffmanCreateFrequencyMap(_testCorpus);
  const tree = huffmanCreateTree(frequencyMap);
  expect(tree).not.toBeNull();
  // the root of the tree should have a frequency equal to the sum of the frequencies
  // of all the nodes in the tree. for the 'hello world' corpus this is 11.
  const totalFrequency = Object.values(frequencyMap).reduce(
    (sum, frequency) => sum + frequency,
    0
  );
  expect(tree.frequency).toBe(totalFrequency);
});
