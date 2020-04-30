function setupSearch(indexJson) {
  var searchIndex = MiniSearch.loadJSON(indexJson, {
    idField: "path",
    fields: ["title", "text"],
    storeFields: ["title"],
    searchOptions: {
      boost: {title: 2},
      fuzzy: 0.2
    }
  });
  var result = searchIndex.search("collision");
  console.log(result);
}

fetch("/assets/search-index.json")
  .then(res => res.text())
  .then(setupSearch);
