import fs from "fs";
import path from "path";
import {
  huffmanCreateCodeMap,
  huffmanCreateFrequencyMap,
  huffmanCreateTree,
  huffmanEncode,
} from "./huffman";

test("huffman encoding, big corpus", () => {
  const beowulfSizeBytes = 300506;
  const beowulfSizeBits = beowulfSizeBytes * 8;
  const corpus = fs.readFileSync(
    path.resolve(__dirname, "../assets/beowulf.txt"),
    "utf8"
  );
  // the frequencyMap, tree, and codeMap are expected to work for this test. If
  // they don't, focus on diagnosing those using the appropriate tests first.
  const frequencyMap = huffmanCreateFrequencyMap(corpus);
  const tree = huffmanCreateTree(frequencyMap);
  const codeMap = huffmanCreateCodeMap(tree);
  const encoded = huffmanEncode(corpus, codeMap); // this is a string of 0s and 1s
  const encodingRatio = encoded.length / beowulfSizeBits;
  // the exact encoding ratio depends on decisions made in the implementation,
  // but it should be about 0.57
  expect(encodingRatio).toBeLessThan(0.6);
  expect(encodingRatio).toBeGreaterThan(0.55);
});
