const hljs = require("highlight.js/lib/core");
const plaintextLang = require("highlight.js/lib/languages/plaintext");
const shellLang = require("highlight.js/lib/languages/shell");
const xmlLang = require("highlight.js/lib/languages/xml");
const cSharpLang = require("highlight.js/lib/languages/csharp");
const cppLang = require("highlight.js/lib/languages/cpp");
const pyLang = require("highlight.js/lib/languages/python");
const jsLang = require("highlight.js/lib/languages/javascript");
const dosLang = require("highlight.js/lib/languages/dos");
const {consoleLang, hscLang} = require("./hsc");
const vrmlLang = require("./vrml");

//these language names should have no punctuation or dashes or it breaks markdown highlighting
hljs.registerLanguage("vrml", vrmlLang);
hljs.registerLanguage("hsc", hscLang);
hljs.registerLanguage("console", consoleLang);
hljs.registerLanguage("consoleh1a", consoleLang);
hljs.registerLanguage("consoleh2a", consoleLang);
hljs.registerLanguage("consoleh3", consoleLang);
hljs.registerLanguage("inittxt", consoleLang);

hljs.registerLanguage("plaintext", plaintextLang);
hljs.registerLanguage("c#", cSharpLang);
hljs.registerLanguage("sh", shellLang);
hljs.registerLanguage("xml", xmlLang);
hljs.registerLanguage("js", jsLang);
hljs.registerLanguage("cpp", cppLang);
hljs.registerLanguage("python", pyLang);
hljs.registerLanguage("dos", dosLang);

export default function highlight(code: string, language?: string) {
  if (!language || language == "" || language == "undefined") {
    language = "plaintext";
  } else if (!hljs.getLanguage(language)) {
    console.warn(`The codeblock language '${language}' is not supported (see highlight.ts). Falling back to plaintext`);
    language = "plaintext";
  }
  return hljs.highlight(language, code).value;
};

export function getSupportedLanguages(): string[] {
  return hljs.listLanguages;
};