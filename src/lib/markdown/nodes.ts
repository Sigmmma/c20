import {type NodeType, type Schema, Tag} from "@markdoc/markdoc";
import { linkables } from "../utils/external-urls";
import {addBreaks, slugify} from "../utils/strings";
import {type RenderContext} from "../components/Ctx/Ctx";
import renderPlaintext from "../components/Md/plaintext";
import {Lang} from "../utils/localization";

const wbr = new Tag("wbr");

const nodes: Partial<Record<NodeType, Schema>> = {
  text: {
    attributes: {
      content: {
        type: String
      },
    },
    transform(node, config) {
      const {content} = node.transformAttributes(config);
      return addBreaks(content, wbr);
    }
  },
  image: {
    attributes: {
      src: {
        type: String
      },
      alt: {
        type: String
      },
      title: {
        type: String
      },
    },
    transform(node, config) {
      const {title, ...restAttrs} = node.transformAttributes(config);
      const children = title ? [new Tag("p", {}, [title])] : undefined;
      return new Tag("Figure", {...restAttrs, inline: true}, children);
    }
  },
  link: {
    attributes: {
      href: {
        type: String
      },
      title: {
        type: String
      }
    },
    transform(node, config) {
      const ctx = (config as any).ctx as RenderContext;
      const lang = (config as any).lang as Lang;
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);
      let href = attributes.href;
      let title = attributes.title;
      if (href == "") href = "~";
      try {
        if (href?.startsWith("~")) {
          let [idTail, headingId] = href.slice(1).split("#");
          if (idTail == "") idTail = slugify(children.map(c => renderPlaintext(ctx, lang, c) ?? "").join(""), true);
          if (headingId == "") headingId = undefined;
          const {title: foundTitle, url} = ctx.resolvePage(idTail, headingId);
          href = url;
          title = foundTitle;
        } else if (linkables[href]) {
          href = linkables[href];
        }
        return new Tag("a", {...attributes, title, href}, children);
      } catch (err) {
        console.error(node.location);
        throw err;
      }
    }
  },
  fence: {
    attributes: {
      content: {
        type: String
      },
      language: {
        type: String
      }
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config);
      return new Tag(
        "CodeBlock",
        {language: attributes.language, code: attributes.content}
      );
    }
  },
  heading: {
    children: ["inline"],
    attributes: {
      id: {type: String},
      level: {type: Number, required: true, default: 1}
    },
    transform(node, config) {
      const ctx = (config as any).ctx as RenderContext;
      const lang = (config as any).lang as Lang;
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);

      const plaintext = children.map(c => renderPlaintext(ctx, lang, c) ?? "").join("");
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