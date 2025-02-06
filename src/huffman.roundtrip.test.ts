import fs from "fs";
import path from "path";
import {
  huffmanCreateCodeMap,
  huffmanCreateFrequencyMap,
  huffmanCreateTree,
  huffmanDecode,
  huffmanEncode,
} from "./huffman";

test("huffman roundtrip", () => {
  // this test runs the complete process, so consider this the final boss.
  // it uses beowulf as the source corpus.
  const beowulf = fs.readFileSync(
    path.resolve(__dirname, "../assets/beowulf.txt"),
    "utf8"
  );
  const frequencyMap = huffmanCreateFrequencyMap(beowulf);
  const tree = huffmanCreateTree(frequencyMap);
  const codeMap = huffmanCreateCodeMap(tree);
  // now we can encode various strings with this coding scheme and check to
  // see if we can decode them back to their original form.
  const inputStrings = [
    "simple test",
    "this is a little more complex",
    "This is a test of the emergency Beowulf system!",
    "Hello, world!",
    "The quick brown fox jumps over the lazy dog.",
    "I'm going to encode this string using the Huffman coding scheme.",
    "This is a test of the emergency Beowulf system! Again",
    "Hello, world!",
  ];
  for (const input of inputStrings) {
    const encoded = huffmanEncode(input, codeMap);
    const decoded = huffmanDecode(encoded, tree);
    expect(decoded).toBe(input);
  }
});
