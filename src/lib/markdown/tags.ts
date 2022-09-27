import {Schema} from "@markdoc/markdoc";

// These are the custom markdoc "tags" we suppport, and the components they map to
export const tags: Record<string, Schema> = {
  alert: {
    render: "Alert",
    selfClosing: true,
  },
};

export default tags;
