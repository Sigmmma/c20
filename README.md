<img alt="" align="right" width="200" src="src/assets/librarian.png">

# The Reclaimers Library

![](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidlNBbmZ4ODFvZytxTit3VHRZcmxkQzNOV3lvejVWcEd3VVVKdEFvUWZXL3cyNlpqbHplaU5OL0lVUkJkdDR5L1o4N28yMStKUE43c1Q4bkgwTjEya3d3PSIsIml2UGFyYW1ldGVyU3BlYyI6IllacFUvMWJnZlVsdnhUcjYiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

This repo contains the source content and build scripts for the Reclaimers Library (https://c20.reclaimers.net). It aims to document the immense tribal knowledge of the Halo modding community and covers game engine details, the Halo Editing Kit, community tools, and guides for map-making.

## Contributing
The library is not yet directly editable online, but there are still various paths to contribute:

1. Easiest: Submitting tips in **#wiki-dump** in [our Discord](https://discord.reclaimers.net) or as [GitHub issues](https://github.com/Sigmmma/c20/issues), for other editors to add.
2. Submitting small edits as pull requests via GitHub.
3. Forking the project, developing it locally with previews, and submitting larger content pull requests.

Content is written in a combination of Markdown and YAML files for structured data like tag layouts. For more information, see the [Contributing page](https://c20.reclaimers.net/contributing).

## Development
If you intend to make code changes to c20, or want to write larger content additions with previews, you can fork and clone the repo locally with [Git](https://git-scm.com/downloads). You'll need [Node.js 22+](https://nodejs.org/en/) installed to run the site locally. If you're unfamiliar with Git and command line usage, you probably want to stick to one of the other contributing paths.

Once those are installed, clone the project and run these shell commands to get the site running locally:

```sh
# install dependencies (run once)
npm ci

# start the development server
npm run dev
```

You can now visit http://localhost:8080/ in a browser and see the website. Edit content source files, then refresh your browser to see changes. You can run the server on a different port with `C20_PORT=9001 npm run dev`.

The development server renders pages on-demand, but you can also run `npm run static` to fully render all pages to HTML and serve them. A full static build takes longer and isn't recommended for quick content writing. You can use it as a final step to verify the build will work once changes are merged. Note: [FFmpeg](https://ffmpeg.org/) is an optional dependency used to generate video thumbnails during a full build. It needs to be available on your system `PATH`. Windows users can simply download `ffmpeg.exe` and place it in the project root. If you don't want to set up FFmpeg just run `C20_NO_THUMBNAILS=true npm run static` and thumbnails won't be used.

### Utility scripts
Under `src/utility_scripts` you'll find some helper scripts for managing wiki content. You can run a typescript-based script like `npx ts-node src/utility_scripts/hs_doc.ts` while some others will need python.

### Releasing
The website is currently hosted as a static site in [AWS S3](https://aws.amazon.com/s3/), fronted by a [CloudFront](https://aws.amazon.com/cloudfront/) CDN distribution, managed in [reclaimers-aws](https://github.com/Sigmmma/reclaimers-aws). To deploy a new version, simple make changes to the `master` branch and a build/deploy will be triggered automatically with CodeBuild.

As a backup, users with bucket permission can simply sync the `dist` directory to S3:

```sh
aws s3 sync --delete ./dist s3://reclaimers-wiki-files/
```

Because of cache TTLs, content may not appear updated immediately. An invalidation can be run in CloudFront to force updates but it will not affect clients unless they clear their browser cache. Live content can be seen by directly viewing the [S3 hosting origin][s3-origin].

## License
C20's codebase is licensed under version 3.0 of the GNU General Public License. A copy of its text can be found in COPYING.

The content of its pages, including articles, guides, images, tag descriptions, and other rendered metadata are available under the [CC BY-SA 3.0 license][cc-license].

[s3-origin]: http://reclaimers-c20.s3-website-us-east-1.amazonaws.com/
[cc-license]: https://creativecommons.org/licenses/by-sa/3.0/
