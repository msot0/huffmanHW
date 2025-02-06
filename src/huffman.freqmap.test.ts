import { huffmanCreateFrequencyMap } from "./huffman";

export const _testCorpus = "hello world";

export const _testFreqMap = {
  " ": 1,
  d: 1,
  e: 1,
  h: 1,
  l: 3,
  o: 2,
  r: 1,
  w: 1,
};

test("huffman frequency map", () => {
  const freqMap = huffmanCreateFrequencyMap(_testCorpus);
  expect(freqMap).toEqual(_testFreqMap);
});
