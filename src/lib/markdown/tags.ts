import {Tag, type Schema} from "@markdoc/markdoc";
import {iconNames} from "../components/Icon/names";
import {onlyTypes} from "../components/RelatedHsc/RelatedHsc";
import {alertTypes} from "../components/Alert/Alert";

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
  tabs: {
    render: "Tabs",
    selfClosing: false,
    children: ["tag"],
    attributes: {
      id: {
        type: String,
        required: true,
      },
      selectedIndex: {
        type: Number,
        required: false,
      }
    },
    transform(node, config) {
      const {selectedIndex, id} = node.transformAttributes(config);
      const tabs = node.transformChildren(config)
        .filter(child => child && typeof(child) !== "string" && child.name === "Tab")
        .map((child: Tag) => ({
          label: child.attributes.label,
          body: child.children,
        }));
      const tabsProps = {
        selectedIndex,
        id,
        tabs,
      };
      return new Tag(this.render, tabsProps);
    },
  },
  tab: {
    render: "Tab",
    attributes: {
      label: {
        type: String,
        required: true,
      },
    },
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
  infoBox: {
    render: "InfoBox",
    attributes: {
      about: {
        type: String,
      },
      img: {
        type: String,
      },
      caption: {
        type: String,
      },
      info: {
        type: String,
      },
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
