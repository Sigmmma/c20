import {Schema} from "@markdoc/markdoc";
import {alertTypes} from "../Alert/Alert";
import {iconNames} from "../Icon/names";

// These are the custom markdoc "tags" we suppport, and the components they map to
const tags: Record<string, Schema> = {
  thanksIndex: {
    render: "ThanksIndex",
    selfClosing: true,
  },
  dataTable: {
    render: "DataTable",
    selfClosing: true,
    attributes: {
      dataPath: {
        type: [String, Array],
        required: true,
      },
      id: {
        type: String,
      },
      rowSortKey: {
        type: String,
      },
      rowSortReverse: {
        type: Boolean,
      },
      rowTagFilter: {
        type: String,
      },
      linkCol: {
        type: [Boolean, Number],
      },
      noClear: {
        type: Boolean,
      },
      wrapPre: {
        type: Boolean,
      },
      linkSlugKey: {
        type: String,
      },
      columns: {
        type: Array,
        required: true,
      },
    }
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
