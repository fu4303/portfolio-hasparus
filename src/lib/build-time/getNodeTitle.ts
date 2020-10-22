import * as path from "path";

import { File, Mdx } from "../../../__generated__/global";
import { findTopLevelHeading } from "./markdown-utils";

interface Node {
  absolutePath?: File["absolutePath"];
  frontmatter?: Mdx["frontmatter"];
  fileAbsolutePath?: Mdx["fileAbsolutePath"];
}

/**
 * 1. Use `frontmatter.title` if it's not empty
 * 2. Use top level heading
 * 3. Use file name from `fileAbsolutePath`
 * 4. Use file name from `absolutePath`
 */
export function getNodeTitle(node: Node, content: string) {
  if (
    typeof node.frontmatter === "object" &&
    node.frontmatter &&
    node.frontmatter.title
  ) {
    return node.frontmatter.title;
  }
  return (
    findTopLevelHeading(content) ||
    (typeof node.fileAbsolutePath === "string"
      ? path.basename(
          node.fileAbsolutePath,
          path.extname(node.fileAbsolutePath)
        )
      : "") ||
    (typeof node.absolutePath === "string"
      ? path.basename(node.absolutePath, path.extname(node.absolutePath))
      : "")
  );
}