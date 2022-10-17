import fs from "fs";
import path from "path";
import { findPaths } from "../lib/utils/files";
import yaml from "js-yaml";
import { PageFrontMatter } from "../lib/content";
import * as R from "ramda";

const keyOrder = [
  "title",
  "stub",
  "noSearch",
  "about",
  "img",
  "caption",
  "info",
  "headingRefs",
  "keywords",
  "related",
  "thanks",
];
const ymlOutOpts = {
  noRefs: true,
  quotingType: '"',
  sortKeys: (a, b) => {
    return keyOrder.indexOf(a) - keyOrder.indexOf(b);
  },
  skipInvalid: true,
};

export function upgrade(md: string, ymlSrc: string): string {
  const yml = yaml.load(ymlSrc);
  const front: PageFrontMatter = {};
  Object.entries(yml).forEach(([key, value]: [string, any]) => {
    const copy = () => front[key] = value;
    const nope = () => {};
    const action = {
      title: () => front.title = value.en,
      Page404: nope,
      noList: nope,
      tagIndex: nope,
      keywords: () => front.keywords = value.en,
      stub: copy,
      noSearch: copy,
      img: copy,
      imgCaption: () => front.caption = value.en,
      tagName: () => front.about = `tag:${value}`,
      toolName: () => front.about = `tool:${value}`,
      workflowName: () => front.about = `resource:${value}`,
      related: () => front.related = (typeof value === "string" ? [value] : value),
      info: () => front.info = value.en,
      thanks: () => {
        front.thanks = Object.fromEntries(Object.entries(value).map(([r, t]: [string, any]) => [r, t.en]));
      },
    }[key];
    if (action) {
      action();
    } else {
      console.warn(`Unhandled key: ${key} value: ${value}`);
    }
  });
  md = md
    .replaceAll(/\]\[([^\]]*)\]/g, "](~$1)") //smart links
    .replaceAll(/```.alert\n(.+)\n```/g, "{% alert %}\n$1\n{% /alert %}") //todo: multiline alerts
    .replaceAll(/```.alert\s?(\w+)?\n(.+)\n```/g, "{% alert type=\"$1\" %}\n$2\n{% /alert %}")
    .replaceAll(/!\[.figure (.+)\]\((.+\.\w+)\)/g, "{% figure src=\"$2\" %}\n$1\n{% /figure %}")
    .replaceAll(/<kbd>([^<]+)<\/kbd>/g, "{% key \"$1\" /%}")
    ;
  //fix external ref links
  [...md.matchAll(/\[([a-zA-Z0-9_-]+)\]: (.+)/g)].map(m => m[1]).forEach(mdLink => {
    md = md.replaceAll(`(~${mdLink})`, `[${mdLink}]`);
    md = md.replaceAll(new RegExp(`\\[(${mdLink})\\]\\(~\\)`, "ig"), `[$1][]`);
  });

  return `---\n${yaml.dump(front, ymlOutOpts)}---\n${md}`;
}

async function migrate(args: string[]) {
  const pageYamls = args.length > 2 ?
    args.slice(2) :
    await findPaths("./src/content/**/page.yml");
  await Promise.all(pageYamls.map(async (pageYamlPath) => {
    const dirname = path.dirname(path.relative("./src/content", pageYamlPath));
    const pageId = `/${dirname == "." ? "" : dirname}`;
    const readmeFilePath = path.join("./src/content", pageId, "readme.md");
    const newReadmeFilePath = path.join("./src/content", pageId, "new.md");

    console.log(`Migrating ${pageId}`);
    const pageYaml = fs.promises.readFile(pageYamlPath, "utf-8");
    const md = fs.promises.readFile(readmeFilePath, "utf-8");
    const newMd = upgrade(await md, await pageYaml);
    // await fs.promises.writeFile(newReadmeFilePath, newMd, "utf8");
    console.log(newMd);
  }));
}

if (process.env.C20_MIGRATE) {
  migrate(process.argv);
}