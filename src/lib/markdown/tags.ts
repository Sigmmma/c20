import {Schema} from "@markdoc/markdoc";
import {alertTypes} from "../components/Alert/Alert";
import {iconNames} from "../components/Icon/names";

// These are the custom markdoc "tags" we suppport, and the components they map to
export const tags: Record<string, Schema> = {
  thanksIndex: {
    render: "ThanksIndex",
    selfClosing: true,
  },
  alert: {
    render: "Alert",
    selfClosing: false,
    children: ['paragraph', 'tag', 'list'],
    attributes: {
      type: {
        type: String,
        default: "info",
        matches: [...alertTypes],
      },
      icon: {
        type: String,
        default: undefined,
        matches: [...iconNames],
      }
    }
  },
};

export default tags;
