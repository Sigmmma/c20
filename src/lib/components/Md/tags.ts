import {type Schema} from "@markdoc/markdoc";
import {alertTypes} from "../Alert/Alert";
import {iconNames} from "../Icon/names";
import {onlyTypes} from "../RelatedHsc/RelatedHsc";

// These are the custom markdoc "tags" we suppport, and the components they map to
const tags: Record<string, Schema> = {
  color: {
    render: "Color",
    selfClosing: true,
    attributes: {
      primary: {
        type: String,
        required: true,
        render: "hex",
      }
    }
  },
  childList: {
    render: "ChildList",
    selfClosing: true,
  },
  unitConverter: {
    render: "UnitConverterMountpoint",
    selfClosing: true,
  },
  comment: {
    render: "Hidden",
    attributes: {
      primary: {
        type: String,
        required: false,
      }
    }
  },
  figure: {
    render: "Figure",
    selfClosing: false,
    children: ["paragraph", "tag", "list", "text"],
    attributes: {
      src: {
        type: String,
        required: true,
      },
      inline: {
        type: Boolean,
      },
      alt: {
        type: String,
      }
    }
  },
  key: {
    render: "Key",
    selfClosing: true,
    attributes: {
      primary: {
        type: String,
        required: true,
        render: "input",
      }
    }
  },
  thanksIndex: {
    render: "ThanksIndex",
    selfClosing: true,
  },
  tagStruct: {
    render: "TagStruct",
    selfClosing: true,
    attributes: {
      primary: {
        type: String,
        required: true,
        render: "tag",
      }
    }
  },
  structTable: {
    render: "StructTable",
    selfClosing: true,
    attributes: {
      entryModule: {
        type: String,
        required: true,
      },
      entryType: {
        type: String,
        required: true,
      },
      noEmbed: {
        type: Array,
      },
      showOffsets: {
        type: Boolean,
      },
      noRootExtend: {
        type: Boolean,
      },
      skipPadding: {
        type: Boolean,
      },
      simpleTypes: {
        type: Boolean,
      },
      id: {
        type: String,
      },
    }
  },
  relatedHsc: {
    render: "RelatedHsc",
    selfClosing: true,
    attributes: {
      game: {
        type: String,
      },
      id: {
        type: String,
      },
      tagFilter: {
        type: String,
      },
      only: {
        type: String,
        matches: [...onlyTypes],
      },
      noClear: {
        type: Boolean,
      }
    },
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
      rowFilterKey: {
        type: String,
      },
      rowFilterExpr: {
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
    children: ["paragraph", "tag", "list", "text"],
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
