function html(strings, ...keys) {
  let result = strings[0];
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (key instanceof Array) {
      //trim, padStart(totalLength, " ")
      result += key.join("\n");
    } else {
      result += key;
    }
    result += strings[i + 1];
  }
  return result.trim();
}

const wrapper = (body, styles) => html`
  <html>
    <head>
      ${styles.map(href => html`
        <link rel="stylesheet" href=${href}/>
      `)}
    </head>
    <body>
      ${body}
    </body>
  </html>
`;

console.log(wrapper("hello, world", ["/a.css", "/b.css"]));
