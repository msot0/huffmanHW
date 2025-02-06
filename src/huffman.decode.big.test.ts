import fs from "fs";
import path from "path";
import { huffmanDecode, HuffmanNode } from "./huffman";

test("huffman decoding, big corpus", () => {
  const plaintext = "This is a simple message to encode";
  const preEncodedText =
    "1110000111010110001100101110001100101000001110011100010100010110011000111110110100011111100111001000010101111110100110010011111110111000010010100111111";

  const treeString = fs.readFileSync(
    path.resolve(__dirname, "../assets/beowulfTree.json"),
    "utf8"
  );
  const beowulfTree = JSON.parse(treeString) as HuffmanNode;
  const decoded = huffmanDecode(preEncodedText, beowulfTree);
  expect(decoded).toBe(plaintext);
});
