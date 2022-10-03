import type {MdSrc} from "../components/Md/markdown";
import type {Lang} from "../utils/localization";

export type PageId = string;
export type RawHtml = string;

//todo: try to reduce this to minimum possible
export type PageData = {
  //from meta
  title: Record<Lang, string>;
  keywords?: Record<Lang, string[]>;
  img?: string;
  imgCaption?: Record<Lang, MdSrc>;
  info?: Record<Lang, MdSrc>;
  stub?: boolean;
  thanks?: Record<string, Record<Lang, string>>;
  headingRefs?: Record<string, Record<Lang, string>>;
  workflowName?: string;
  toolName?: string;
  tagName?: string;
  /** @deprecated convert this to a custom tag */
  thanksIndex?: boolean;
  /** @deprecated convert this to a table macro or custom tag */
  tagIndex?: {
    game: string;
    groupId?: boolean;
    parent?: boolean;
    noLink?: boolean;
  };
  noSearch?: boolean;
  noList?: boolean;
  Page404?: boolean;

  //calculated
  langs: Lang[];
  pageId: PageId;
  logicalPath: string[];
  logicalPathTail: string;
  localizedPaths: Record<Lang, string>;
  related?: string[] | PageData[]; //overrides IDs in page.yml
  //todo: do users of these need ALL subfields?
  parent?: PageData;
  children?: PageData[];

  //funcs
  tryLocalizedPath: (lang: Lang, headingId?: string) => string;
  tryLocalizedTitle: (lang: Lang) => string;
};

export type PageIndex = {
  pages: Record<PageId, PageData>;
  resolvePageGlobal: (fromPageId: PageId, idTail: string) => PageData;
};

export type RenderInput = {
  pageIndex: PageIndex;
  // Freeform structured data from the src/data directory
  data: any;
  localData?: any;
  baseUrl: string;
  page: PageData;
  lang: Lang;
  md: MdSrc;
};

export type RenderOutput = {
  htmlDoc: RawHtml;
  searchDoc: null | {
    lang: string;
    path: string;
    title: string;
    text: string;
    keywords: string;
  };
};