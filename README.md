<img alt="" align="right" width="200" src="src/assets/librarian.png">

# The Reclaimers Library

![](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidlNBbmZ4ODFvZytxTit3VHRZcmxkQzNOV3lvejVWcEd3VVVKdEFvUWZXL3cyNlpqbHplaU5OL0lVUkJkdDR5L1o4N28yMStKUE43c1Q4bkgwTjEya3d3PSIsIml2UGFyYW1ldGVyU3BlYyI6IllacFUvMWJnZlVsdnhUcjYiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

This repo contains the source content and build scripts for the Reclaimers Library (https://c20.reclaimers.net). It aims to document the immense tribal knowledge of the Halo modding community and covers game engine details, the Halo Editing Kit, community tools, and guides for map-making.

## Contributing
The library is not directly editable by its readers. This allows the editing team to verify information before it's added. However, we want and need the community's help filling in gaps. If you want to submit information or join the editing team, see the [Contributing page](https://c20.reclaimers.net/contributing).

## Development
The codebase is essentially a [static site](https://en.wikipedia.org/wiki/Static_web_page) generator. We use [Gulp](https://gulpjs.com/) as the build task runner, with various tasks to process stylesheets, render pages, bundle JS ([esbuild](https://esbuild.github.io/)), and copy assets. All static results go into a `dist` folder that is ready to serve.

Content is written in a combination of [Markdoc-flavoured markdown](markdoc.dev) and YAML files, which are rendered to HTML using [Preact](https://preactjs.com/) in TypeScript/TSX. Pages are also rendered in plaintext form and bundled into a client-side search index using [Minisearch](https://lucaong.github.io/minisearch/). We use [Sass](https://sass-lang.com/) as a CSS preprocessor.

### Building and testing
In order to see content as it will appear online, you can run c20 in development mode. As a pre-requisite, this project requires installing at least [Node.js v14+](https://nodejs.org/en/) and [Git LFS](https://git-lfs.github.com/).

If you have installed Git LFS _after_ checking out the project already, you'll need to run `git lfs install` and `git lfs pull` to download the objects. If you forget to do this the build will fail because `ffmpeg` will be unable to read video files as videos ("Invalid data found when processing input").

Once those are installed, clone the project and run the following shell commands to build and locally serve the website:

```sh
# install dependencies
npm ci

# run the development server which renders pages on-demand
npm run dev
# If a different port is desired:
C20_PORT=9001 npm run dev
```

You should be able to visit http://localhost:8080/ in a browser and see the website. Refresh your browser to see changes you've made to content source files.

You can also run `npm run static` to fully render all pages to HTML and serve them, but this takes longer and isn't recommended for quick content writing. You can use it as a final step to verify the build will work once changes are merged. Note: [FFmpeg](https://ffmpeg.org/) is an optional dependency used to generate video thumbnails during a full build. It needs to be available on your system `PATH`. Windows users can simply download `ffmpeg.exe` and place it in the project root. If you don't want to set up FFmpeg you instead run `C20_NO_THUMBNAILS=true npm run static` and it won't be used.

### Releasing
The website is currently hosted as a static site in [AWS S3](https://aws.amazon.com/s3/), fronted by a [CloudFront](https://aws.amazon.com/cloudfront/) CDN distribution, managed in [reclaimers-aws](https://github.com/Sigmmma/reclaimers-aws). To deploy a new version, simple make changes to the `master` branch and a build/deploy will be triggered automatically with CodeBuild.

As a backup, users with bucket permission can simply sync the `dist` directory to S3:

```sh
aws s3 sync --delete ./dist s3://reclaimers-wiki-files/
```

Because of cache TTLs, content may not appear updated immediately. An invalidation can be run in CloudFront to force updates, but it will not affect clients unless they clear their browser cache. Live content can be seen by directly viewing the [S3 hosting origin][s3-origin].

### Technical goals
An explicit choice was made to avoid typical managed or self-hosted Wiki platforms for this library and opt for building a . This makes it easy to host and distribute, and easier to automatically generate content based on Halo's tag definitions and other data structures. The main tenets are:

* Only produce static assets that are easily distributed and served by any web server or CDN.
* No API or dynamic content: the site should be easy to host and test locally with any HTTP server capable of serving files, and is easily cached on a CDN. No compute needed means low hosting costs. Even the search index is client-side.
* Distributable: another benefit of the static website is that it can be packaged in a distributable offline format. This not not yet implemented, but planned when content is more complete.
* Respect the time of the editors. Wiki features should empower them to write faster and easier. Nobody will write if it's a chore.
* Semantic HTML: Page structures are document-like and use the right elements for the job to maintain accessibility.
* Mobile-friendly: Pages should be responsive and readable on mobile.
* The website should make minimum use of client side JavaScript unless there are interactive features needed.

## License
C20's codebase is licensed under version 3.0 of the GNU General Public License. A copy of its text can be found in COPYING.

The content of its pages, including articles, guides, images, tag descriptions, and other rendered metadata are available under the under the [CC BY-SA 3.0 license][cc-license].

[s3-origin]: http://reclaimers-c20.s3-website-us-east-1.amazonaws.com/
[cc-license]: https://creativecommons.org/licenses/by-sa/3.0/
