import * as preact from "preact";
import Locale from "../lib/components/Locale/Locale";
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
    if (heading) {
      heading.classList.add("destination");
      setTimeout(() => {
        heading.classList.remove("destination");
      }, 1500);
    }
  }
}
window.addEventListener("hashchange", hashFlash, false);
hashFlash();

//theme stuff
function setSyntax() {
  const link = document.getElementById("syntax") as HTMLLinkElement;
  link.href = document.documentElement.dataset.theme == "dark" ?
    "/assets/night-owl.css" :
    "/assets/github.css";
}
document.documentElement.dataset.theme = window.localStorage.getItem("theme") || "dark";
document.getElementById("toggle-theme")!.addEventListener("click", () => {
  const data = document.documentElement.dataset;
  data.theme = data.theme == "dark" ? "light" : "dark";
  window.localStorage.setItem("theme", data.theme);
  setSyntax();
});
setSyntax();