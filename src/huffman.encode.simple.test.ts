import {
  huffmanCreateCodeMap,
  huffmanCreateFrequencyMap,
  huffmanCreateTree,
  huffmanEncode,
} from "./huffman";
import { _testCorpus } from "./huffman.freqmap.test";

test("huffman encoding map", () => {
  const corpus = _testCorpus;
  const frequencyMap = huffmanCreateFrequencyMap(corpus);
  const tree = huffmanCreateTree(frequencyMap);
  const codeMap = huffmanCreateCodeMap(tree);
  for (const char of "helo wrd") {
    expect(codeMap[char]).not.toBeNull();
    expect(codeMap[char].length).toBeGreaterThan(1);
    expect(codeMap[char].length).toBeLessThan(5);
  }
});

test("huffman encoding, simple corpus", () => {
  const corpus = _testCorpus;
  const frequencyMap = huffmanCreateFrequencyMap(corpus);
  const tree = huffmanCreateTree(frequencyMap);
  const codeMap = huffmanCreateCodeMap(tree);
  // we have limited things to say in this "hello world" alphabet...
  const plain = "we hold";
  const expected =
    codeMap["w"] +
    codeMap["e"] +
    codeMap[" "] +
    codeMap["h"] +
    codeMap["o"] +
    codeMap["l"] +
    codeMap["d"];
  const encoded = huffmanEncode(plain, codeMap);
  expect(encoded).toBe(expected);
});
