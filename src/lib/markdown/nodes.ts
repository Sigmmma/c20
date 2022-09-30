import {type NodeType, type Schema, Tag} from "@markdoc/markdoc";
import {slugify} from "../utils/strings";
import renderPlaintext from "./plaintext";

const nodes: Partial<Record<NodeType, Schema>> = {
  heading: {
    children: ["inline"],
    attributes: {
      id: {type: String},
      level: {type: Number, required: true, default: 1}
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);

      const plaintext = children.map(c => renderPlaintext((config as any).ctx, c) ?? "").join("");
      const id = attributes.id ?? slugify(plaintext);

      return new Tag(
        "Heading",
        {...attributes, plaintext, id},
        children
      );
    }
  }
};

export default nodes;