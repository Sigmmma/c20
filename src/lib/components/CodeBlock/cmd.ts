
export default function(hljs) {
  return {
    contains: [
      hljs.COMMENT("REM ", "$"),
      hljs.COMMENT("Usage: ", "$"),
      hljs.COMMENT("#", "$"),
      {
        scope: "title.function.invoke",
        begin: "^\\S+",
        end: "(\\s|$)",
      },
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        scope: "literal",
        match: "(true|false)"
      },
      {
        scope: "keyword",
        match: "(>|\\|)"
      },
      {
        scope: "params",
        begin: "\\s(-|--|/)\\S+",
        end: "(\\s|$)",
      },
    ]
  };
}