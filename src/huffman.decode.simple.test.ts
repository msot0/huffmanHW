import fs from "fs";
import path from "path";
import { huffmanDecode, HuffmanNode } from "./huffman";

const _leewordPlaintext = "leeword";
const _leewordEncoded = "1001101111010011101111";

test("huffman decoding, simple corpus", () => {
  const treeString = fs.readFileSync(
    path.resolve(__dirname, "../assets/leewordTree.json"),
    "utf8"
  );
  const treeJson = JSON.parse(treeString) as HuffmanNode;
  const decoded = huffmanDecode(_leewordEncoded, treeJson);
  expect(decoded).toBe(_leewordPlaintext);
});
