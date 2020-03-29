const {html} = require("common-tags");

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

module.exports = {
  wrapper
};
