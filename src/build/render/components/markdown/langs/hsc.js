//This is a modified version of the Clojure grammar, more suited to Haloscript's syntax.
//https://github.com/highlightjs/highlight.js/blob/master/src/languages/clojure.js
function build(consoleMode) {
  return function(hljs) {
    var SYMBOL_RE = '[a-zA-Z_][a-zA-Z_0-9]*';
    var globals = [
      "script",
      "if",
      "cond",
      "begin",
      "begin_random",
      "startup",
      "dormant",
      "continuous",
      "stub",
      "static",
      "sleep",
      "sleep_until",
      "thread_sleep",
      "global",
      "wake",
    ].join(" ");
    var keywords = {
      $pattern: SYMBOL_RE,
      built_in:
        // Clojure keywords
        globals + ' ' + [
          "set",
          "not",
          "and",
          "or",
          "max",
          "min",
          "cls",
          "print",
          "inspect",
          "list_get",
          "list_count",
          "help",
        ].join(" ")
    };

    var SIMPLE_NUMBER_RE = '[-+]?\\d+(\\.\\d+)?';

    var SYMBOL = {
      begin: SYMBOL_RE,
      relevance: 0
    };
    var NUMBER = {
      className: 'number',
      begin: SIMPLE_NUMBER_RE,
      relevance: 0
    };
    var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null});
    var BLOCKCOMMENT = hljs.COMMENT(
      ';\\*',
      '\\*;',
      {
        relevance: 1
      }
    );
    var COMMENT = hljs.COMMENT(
      ';',
      '$',
      {
        relevance: 0
      }
    );
    //hsc preprocessor extension
    var PREPROCESSOR = hljs.COMMENT(
      '#',
      '$',
      {
        className: 'meta'
      }
    );
    var LITERAL = {
      className: 'literal',
      begin: /\b(true|false|easy|normal|hard|impossible)\b/
    };
    var PLACEHOLDER = {
      className: 'comment placeholder',
      begin: "<[^\\s=]",
      end: "\\S>"
    };
    var PLACEHOLDER_OPTIONAL = {
      className: 'comment placeholder',
      begin: "\\[\\S",
      end: "\\S\\]"
    };
    var LIST = consoleMode ? {
      begin: '(?:\\(|^)',
      end: '(\\)|$|;)'
    } : {
      begin: '\\(',
      end: '\\)'
    };
    var BODY = {
      endsWithParent: true,
      relevance: 0
    };
    var NAME = {
      keywords: keywords,
      className: 'name',
      begin: SYMBOL_RE,
      starts: BODY,
    };
    var OPERATOR = {
      className: 'built_in',
      begin: '(=|!=|\\*|\\-|\\+|/|>|<|<=|>=)',
      end: '\\s',
      excludeEnd: true,
      starts: BODY,
    };
    var DEFAULT_CONTAINS = [BLOCKCOMMENT, COMMENT, PLACEHOLDER, PLACEHOLDER_OPTIONAL, LIST, STRING, NUMBER, LITERAL, SYMBOL];

    var GLOBAL = {
      beginKeywords: globals,
      lexemes: SYMBOL_RE,
      end: '(\\[|\\#|\\d|"|:|\\{|\\)|\\(|$)',
      contains: [
        {
          className: 'title',
          begin: SYMBOL_RE,
          relevance: 0,
          excludeEnd: true,
          // we can only have a single title
          endsParent: true
        },
      ].concat(DEFAULT_CONTAINS)
    };

    LIST.contains = [hljs.COMMENT('comment', ''), PLACEHOLDER, PLACEHOLDER_OPTIONAL, GLOBAL, NAME, OPERATOR, BODY];
    BODY.contains = DEFAULT_CONTAINS;

    const SCRIPTS = [LIST, PLACEHOLDER, PLACEHOLDER_OPTIONAL, STRING, BLOCKCOMMENT, COMMENT, NUMBER, LITERAL, PREPROCESSOR];
    var CONSOLE_LINE = {
      className: 'console-line',
      begin: "^",
      end: "$",
      contains: SCRIPTS
    };

    return {
      name: 'HaloScript',
      aliases: ['hsc'],
      illegal: /\S/,
      contains: consoleMode ? [CONSOLE_LINE] : SCRIPTS
    };
  };
};

module.exports =  {
  consoleLang: build(true),
  hscLang: build(false)
};
