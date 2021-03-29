<img alt="" align="right" width="200" src="src/assets/librarian.png">

# The Reclaimers Library

![](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidlNBbmZ4ODFvZytxTit3VHRZcmxkQzNOV3lvejVWcEd3VVVKdEFvUWZXL3cyNlpqbHplaU5OL0lVUkJkdDR5L1o4N28yMStKUE43c1Q4bkgwTjEya3d3PSIsIml2UGFyYW1ldGVyU3BlYyI6IllacFUvMWJnZlVsdnhUcjYiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

This repo contains the source content and build scripts for the Reclaimers Library (https://c20.reclaimers.net). It aims to document the immense tribal knowledge of the Halo 1 modding community and covers game engine details, the Halo Editing Kit, community tools, and guides for map-making.

## Contributing
This library is being built as a curated resource of high quality documentation assembled from a variety of sources:

* Direct submissions and tips from community members
* Q&A with the community's experts
* New research and reverse engineering
* Incorporation of previously documented information
* Mining of forums and Discord help channels

Because we want to ensure information is accurate, c20 is maintained by a small team of editors and cannot be directly modified by users. However, you have a few options to share information:

* Submit info as a GitHub issue
* Create a pull requests if you're more technically inclined
* Directly message con#4702 on Discord

Don't worry if writing isn't your strong suit. We'll ensure your tips are properly incorporated into the Wiki and you're credited for them. Our focus will be on Halo 1 modding, so content for later games (e.g. H2V and H3) is welcomed but will not be prioritized.

Editors or those issuing pull requests can refer to [EDITORS.md](EDITORS.md) for writing style and other rules.

## Development
[Gulp](https://gulpjs.com/) is used as the main task runner for the build. It is triggered by the command `npm run build`, defined in `package.json`. Within the `gulpfile.js` there are several tasks defined to process stylesheets, build markdown pages, create diagrams, and copy other assets.

The goal is to produce static assets that are easily distributed. The server must be configured to serve `index.html` for directory GETs (any server should be able to do this).

The main task is `contentPages`, which calls out to `src/content.js` where the heavy lifting happens. This code crawls `src/content/` for `readme.md` files, which contain YAML front matter with metadata followed by markdown. This information is assembled into a master "meta index" of all pages before rendering is done in a second pass. This allows each page to potentially include tables or indexes of other pages' metadata.

### Technical goals
An explicit choice was made to avoid typical managed or self-hosted Wiki platforms for this library and opt for building a [static site](https://en.wikipedia.org/wiki/Static_web_page) generator. This makes it easy to host and distribute, and easier to automatically generate content based on Halo's tag definitions and other data structures. The main tenets are:

* No API or dynamic content: the site should be easy to host and test locally with any HTTP server capable of serving files, and is easily cached on a CDN. No compute needed means low hosting costs. Even the search index is client-side.
* Distributable: another benefit of the static website is that it can be packaged in a distributable offline format. This not not yet implemented, but planned when content is more complete.
* Low maintenance surface area: Development time should be spent on content, not maintaining the build process. We limit our dependencies, and avoid too many bells and whistles.
* Semantic HTML: Page structures are document-like and use the right elements for the job to maintain accessibility.
* Mobile-friendly: Pages should be responsive and readable on mobile.
* The website should make minimum use of client side JavaScript unless there are interactive features desired.

### Technology choices
* [Minisearch](https://lucaong.github.io/minisearch/) for site search, since we can pre-compute a lightweight JSON search index at build time and serve it to clients to do search completely in-browser. This will work in offline distributions of the site.
* A build of [Preact](https://preactjs.com/) combined with [htm](https://github.com/developit/htm) is used on the client-side for the few JS-driven UI components we have, like search. This is a lightweight alternative to _React_.
* We use [Sass](https://sass-lang.com/) as a CSS preprocessor for its productivity features. Variables should be used to ensure consistency and make changes easier. Nest selectors according to the specificity of what's being styled.
* HTML rendering is done with `html` tagged template literals from [common-tags](https://github.com/zspecza/common-tags). It doesn't produce the prettiest HTML, but is simple to write and manipulate as a string.
* [Marked.js](https://github.com/markedjs/marked) for Markdown rendering. This library is extremely customizable; we customize header rendering to support anchor links and have a plaintext renderer to support search and opengraph previews.

### Building and testing
In order to see content as it will appear online, you can run c20 in development mode. As a pre-requisite, this project requires [installing Node.js](https://nodejs.org/en/). Run the following shell commands to build and locally serve the website:

```sh
# install dependencies
npm ci

# build content into `./dist`
npm run dev
```

You should be able to visit http://localhost:8080/ in a browser and see the built website. The website will be automatically rebuilt if you make changes to source content. Refresh your browser to see changes.

If a different port is desired, set the environment variable `C20_PORT`:

```sh
C20_PORT=9001 npm run dev
```

### Releasing
The website is currently hosted as a static site in [AWS S3](https://aws.amazon.com/s3/), fronted by a [CloudFront](https://aws.amazon.com/cloudfront/) CDN distribution, managed in [reclaimers-aws](https://github.com/Sigmmma/reclaimers-aws). To deploy a new version, simple make changes to the `master` branch and a build/deploy will be triggered automatically with CodeBuild.

As a backup, users with bucket permission can simply sync the `dist` directory to S3:

```sh
aws s3 sync --delete ./dist s3://reclaimers-wiki-files/
```

Because of cache TTLs, content may not appear updated immediately. An invalidation can be run in CloudFront to force updates, but it will not affect clients unless they clear their browser cache. Live content can be seen by directly viewing the [S3 hosting origin][s3-origin].

## License
C20's codebase is licensed under version 3.0 of the GNU General Public License. A copy of its text can be found in COPYING.

The content of its pages, including articles, guides, images, tag descriptions, and other rendered metadata are available under the under the [CC BY-SA 3.0 license][cc-license].

[s3-origin]: http://reclaimers-c20.s3-website-us-east-1.amazonaws.com/
[cc-license]: https://creativecommons.org/licenses/by-sa/3.0/
