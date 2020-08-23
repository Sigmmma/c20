//This is a modified version of the Clojure grammar, more suited to Haloscript's syntax.
//https://github.com/highlightjs/highlight.js/blob/master/src/languages/clojure.js
module.exports = function(consoleMode) {
  return function(hljs) {
    var SYMBOL_RE = '[a-zA-Z_][a-zA-Z_0-9]*';
    var globals = [
      "script",
      "if",
      "begin",
      "begin_random",
      "startup",
      "dormant",
      "continuous",
      "static",
      "sleep",
      "sleep_until",
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
          "cond",
          "cls",
          "print",
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
    var COMMENT = hljs.COMMENT(
      ';',
      '$',
      {
        relevance: 0
      }
    );
    var LITERAL = {
      className: 'literal',
      begin: /\b(true|false|easy|normal|hard|impossible)\b/
    };
    var LIST = consoleMode ? {
      begin: '(\\(|^)',
      end: '(\\)|$)'
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
    var DEFAULT_CONTAINS = [LIST, STRING, COMMENT, NUMBER, LITERAL, SYMBOL];

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

    LIST.contains = [hljs.COMMENT('comment', ''), GLOBAL, NAME, OPERATOR, BODY];
    BODY.contains = DEFAULT_CONTAINS;

    return {
      name: 'HaloScript',
      aliases: ['hsc'],
      illegal: /\S/,
      contains: [LIST, STRING, COMMENT, NUMBER, LITERAL]
    };
  };
};
