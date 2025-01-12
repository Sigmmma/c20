import * as preact from "preact";
import { IconName } from "../lib/components/Icon/names";
import Locale from "../lib/components/Locale/Locale";
import UnitConverter from "../lib/components/UnitConverter/UnitConverter";
import DataTableFilter from "../lib/components/DataTable/DataTableFilter";
import MiniSearch from "minisearch";
import PageWrapper from "../lib/components/PageWrapper/PageWrapper";

//todo
//const is404Page = !!document.head.querySelector('[itemprop = Is404]');
//is404Page ? window.location.pathname.split("/").reverse().join(" ") : ''
// if (is404Page) {
//   document.querySelector('[id=missing-page]').innerText = "(" + window.location.pathname + ")";
// }

const lang = document.querySelector("html")?.lang ?? "en";

document.querySelectorAll(".table-filter-mountpoint").forEach((mountpoint: HTMLElement) => {
  const tableId = mountpoint.dataset.tableid;
  preact.render(
    <DataTableFilter tableId={tableId}/>,
    mountpoint
  );
});

document.querySelectorAll("#unit-converter-mountpoint").forEach(mountpoint => {
  preact.render(
    <Locale.Provider value={lang}>
      <UnitConverter/>
    </Locale.Provider>,
    mountpoint
  );
});

let currentHeadingId: string | undefined = undefined;
const intersectionObserver = new IntersectionObserver(entries => {
  const scrolledToHeadingId = entries
    .filter(it => it.isIntersecting)
    .map(it => it.target.id)
    .find(it => it != "");
  if (scrolledToHeadingId && scrolledToHeadingId != currentHeadingId) {
    document.querySelector(`.toc a[href$=${currentHeadingId}]`)?.classList.remove("highlight");
    document.querySelector(`.toc a[href$=${scrolledToHeadingId}]`)?.classList.add("highlight");
    currentHeadingId = scrolledToHeadingId;
  }
}, {
  rootMargin: "-10% 0px -80% 0px",
  threshold: 0,
});
document.querySelectorAll(".article-main h1, .article-main h2, .table-wrapper > table.struct > tbody > tr.field-type-Block > td.field-name > span").forEach(heading => {
  intersectionObserver.observe(heading);
});

//flash heading matching URL hash
function hashFlash() {
  const hash = document.location.hash;
  if (hash) {
    const heading = document.getElementById(decodeURI(hash.substring(1)));
    const query = new URLSearchParams(document.location.search);
    if (heading) {
      heading.classList.add("destination");
      if (query.get("note")) {
        heading.dataset.note = query.get("note")!;
      }
      if (!query.get("note")) {
        setTimeout(() => {
          heading.classList.remove("destination");
        }, 1500);
      }
    }
  }
}
window.addEventListener("hashchange", hashFlash, false);
hashFlash();

//theme stuff
const themes: {name: string, syntax: string, icon: IconName}[] = [
  {name: "dark", syntax: "/assets/night-owl.css", icon: "moon"},
  {name: "light", syntax: "/assets/github.css", icon: "sun"},
  // {name: "holiday", syntax: "/assets/night-owl.css", icon: "gift"},
];
const savedTheme = window.localStorage.getItem("theme") ?? "dark";
function handleThemeSelected(theme: string) {
  let themeConfig = themes.find(t => t.name == theme);
  if (!themeConfig) {
    theme = "dark";
    themeConfig = themes.find(t => t.name == theme);
  }
  document.documentElement.dataset.theme = theme;
  const syntaxCssLink = document.getElementById("syntax") as HTMLLinkElement;
  syntaxCssLink.href = themeConfig!.syntax;
  window.localStorage.setItem("theme", theme);
}
handleThemeSelected(savedTheme);

const miniSearchConfig = {
  idField: "path",
  fields: ["title", "text"],
  storeFields: ["title"],
  searchOptions: {
    //customize tokenizer to allow underscores in token
    tokenize: (str: string) => str.split(/[\s\-\."'!?,;:\[\]\(\)\|\\><]+/),
    boost: {title: 2, keywords: 3},
    fuzzy: 0.2,
  }
};

const searchIndexPromise = fetch(`/assets/search-index_${lang}.json`)
  .then(res => res.text())
  .then(indexJson => MiniSearch.loadJSON(indexJson, miniSearchConfig));
const pageTreePromise = fetch(`/assets/page-tree_${lang}.json`)
  .then(res => res.json());

Promise.all([searchIndexPromise, pageTreePromise]).then(([searchIndex, pageTree]) => {
  const mountpoint = document.getElementById("wrapper-mountpoint")!;
  const wrapperChild = document.getElementById("wrapper-child")!;
  wrapperChild.remove(); //prevent being modified by preact render
  const {navHeadings, pageId} = JSON.parse(mountpoint.dataset.bootstrap!);
  preact.render(
    <Locale.Provider value={lang}>
      <PageWrapper
        pageId={pageId}
        navHeadings={navHeadings}
        pageTree={pageTree}
        searchIndex={searchIndex}
        themes={themes}
        initialTheme={savedTheme}
        onThemeSelected={handleThemeSelected}
      >
        <div id="wrapper-child-holder" ref={el => {
          el?.appendChild?.(wrapperChild)
        }}/>
      </PageWrapper>
    </Locale.Provider>,
    mountpoint
  );
});
