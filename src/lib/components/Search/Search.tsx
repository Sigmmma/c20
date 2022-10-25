import {useEffect, useRef, useState} from "preact/hooks";
import MiniSearch from "minisearch";
import {useLocalize} from "../Locale/Locale";

const localizations = {
  searchPlaceholder: {
    en: "Search all of c20... [/]",
    es: "Buscar todo en c20... [/]"
  },
  searchResults: {
    en: "Search results",
    es: "Resultados de la búsqueda"
  },
  close: {
    en: "Close",
    es: "Cerrar"
  },
  searchNoResults: {
    en: "No results found for",
    es: "No se encontraron resultados para",
  },
  limitToChildPaths: {
    en: "Child pages only",
    es: "Solo páginas secundarias"
  },
};

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

type State = {
  searchIndex?: MiniSearch;
  filterChildPaths: boolean;
  firstSearchDone: boolean;
  query: string;
  searchResults: any[];
  selectedResultIndex: number;
};

export type SearchProps = {
  initialQuery?: string;
};

export default function Search(props: SearchProps) {
  const {localize, lang} = useLocalize(localizations);
  //save a reference to the DOM element which gets rendered, so we can focus it later
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<State>({
    searchIndex: undefined,
    filterChildPaths: false,
    firstSearchDone: false,
    query: props.initialQuery ?? "",
    searchResults: [],
    selectedResultIndex: 0
  });

  const updateState = (newState: Partial<State>) => {
    setState({...state, ...newState});
  };

  useEffect(() => {
    fetch(`/assets/search-index_${lang}.json`)
      .then(res => res.text())
      .then(indexJson => {
        updateState({searchIndex: MiniSearch.loadJSON(indexJson, miniSearchConfig)});
        console.log("Search index loaded!");
      });
    }, []);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      //check for global keydown of "/" to move focus to the search input
      if (e.key == "/" && inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
        //prevents event from being passed to next handlers to avoid "s" being put in now-focused input
        e.preventDefault();
      }
    });

    //closes search before navigating away so it's not still open when going back
    window.addEventListener("beforeunload", (e) => {
      updateState({
        query: "",
        searchResults: [],
        selectedResultIndex: 0
      });
      if (inputRef.current) {
        inputRef.current.blur();
      }
    });
  }, [inputRef.current]);

  const handleKeyDown = (e) => {
    if (e.key == "Escape") {
      updateState({
        query: "",
        searchResults: [],
        selectedResultIndex: 0
      });
      if (inputRef.current) {
        inputRef.current.blur();
      }
    } else if (e.key == "ArrowDown") {
      updateState({selectedResultIndex: Math.min(
        state.selectedResultIndex + 1,
        state.searchResults.length - 1
      )});
      e.preventDefault(); //prevent moving the cursor right in the input
    } else if (e.key == "ArrowUp") {
      updateState({selectedResultIndex: Math.max(
        state.selectedResultIndex - 1,
        0
      )});
      e.preventDefault(); //prevent moving the cursor left in the input
    } else if (e.key == "Enter") {
      if (state.searchResults.length != 0) {
        window.location = state.searchResults[state.selectedResultIndex].id;
      }
    }
  };

  const handleChange = (query: string, filterChildPaths: boolean) => {
    if (state.searchIndex) {
      let searchResults = state.searchIndex.search(query);

      //if no results, try suggested search instead
      if (searchResults.length == 0) {
        const suggestions = state.searchIndex.autoSuggest(query);
        if (suggestions.length > 0) {
          const suggestedTerms = suggestions[0].suggestion.split(" ");
          searchResults = state.searchIndex.search(suggestedTerms[suggestedTerms.length - 1]);
        }
      }

      if (filterChildPaths) {
        searchResults = state.searchResults.filter(result =>
          result.id.startsWith(window.location.pathname)
        );
      }

      //sort by if the query is a substring of the page title
      searchResults.sort((a, b) => {
        const normalize = (s) => s.toLowerCase().replace(/\W/g, "");
        const queryNormalized = normalize(query);
        const aIncludes = normalize(a.title).includes(queryNormalized);
        const bIncludes = normalize(b.title).includes(queryNormalized);
        if (aIncludes && !bIncludes) return -1;
        if (bIncludes && !aIncludes) return 1;
        return 0;
      });

      updateState({
        query,
        searchResults,
        filterChildPaths,
        selectedResultIndex: 0,
		    firstSearchDone: true,
      });
    }
  };

  //if (!state.firstSearchDone && is404Page) {
  //  handleChange(state.query, state.filterChildPaths);
  //}

  const clearInput = () => handleChange("", state.filterChildPaths);
  const handleInput = (e) => handleChange(e.target.value, state.filterChildPaths);
  const handleFilter = () => handleChange(state.query, !state.filterChildPaths);
  const isNonEmptyQuery = state.query && state.query != "";

  return <>
    <input
      ref={inputRef}
      className={`search-input ${isNonEmptyQuery ? "nonempty" : ""}`}
      type="text"
      placeholder={localize("searchPlaceholder")}
      disabled={!state.searchIndex}
      value={state.query}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
    {isNonEmptyQuery &&
      <nav className="search-results">
        <div className="results-header">
          <h2>{localize("searchResults")}</h2>
          <button className="clear-button" onClick={clearInput}>{localize("close")} <span className="desktop-only">[Esc]</span></button>
        </div>
        <div className="results-toggle-child-pages">
          <input type="checkbox" id="filter-results" onClick={handleFilter} checked={state.filterChildPaths}/>
          <label htmlFor="filter-results">{localize("limitToChildPaths")}</label>
        </div>
        {state.searchResults.length > 0 ? (
          <ul className="link-list">
            {state.searchResults.map((result, i) => {
              //render each search result, ensuring that the user's selected one gets highlighted by CSS:
              const isSelected = i == state.selectedResultIndex;
              const pathPrefix = result.id.slice(1).split("/").slice(0, -1).join("/");
              return (
                <li className={isSelected ? "selected" : ""}>
                  <a href={result.id}>
                    {result.title}
                    {pathPrefix != "" && <span className="path-prefix"> ({pathPrefix})</span>}
                    {isSelected && <kbd className="desktop-only">⬍ Enter</kbd>}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="null-result">{localize("searchNoResults")} <strong>{state.query}</strong></p>
        )}
      </nav>
    }
  </>;
};