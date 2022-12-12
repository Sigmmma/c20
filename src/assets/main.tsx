import * as preact from "preact";
import { IconName } from "../lib/components/Icon/names";
import Locale from "../lib/components/Locale/Locale";
import ThemeSelector from "../lib/components/PageWrapper/ThemeSelector";
import Search from "../lib/components/Search/Search";
import UnitConverter from "../lib/components/UnitConverter/UnitConverter";

//todo
//const is404Page = !!document.head.querySelector('[itemprop = Is404]');
//is404Page ? window.location.pathname.split("/").reverse().join(" ") : ''
// if (is404Page) {
//   document.querySelector('[id=missing-page]').innerText = "(" + window.location.pathname + ")";
// }

const lang = document.querySelector("html")?.lang ?? "en";

document.querySelectorAll("#unit-converter-mountpoint").forEach(mountpoint => {
  preact.render(
    <Locale.Provider value={lang}>
      <UnitConverter/>
    </Locale.Provider>,
    mountpoint
  );
});

const searchMount = document.getElementById("c20-search-mountpoint");
preact.render(
  <Locale.Provider value={lang}>
    <Search/>
  </Locale.Provider>,
  searchMount!
);

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
  {name: "holiday", syntax: "/assets/night-owl.css", icon: "gift"},
];
const themeMount = document.getElementById("theme-mountpoint");
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
preact.render(
  <Locale.Provider value={lang}>
    <ThemeSelector
      themes={themes}
      initialValue={savedTheme}
      onSelect={handleThemeSelected}
    />
  </Locale.Provider>,
  themeMount!
);
handleThemeSelected(savedTheme);

document.getElementById("toggle-menu")!.addEventListener("click", () => {
  document.querySelector(".nav-tree")!.classList.toggle("open");
});