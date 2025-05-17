import path from "path";
import fs from "fs";
import {BuildOpts} from "../build";
import {PageId, ParsedPage} from "./content/pages";

export function buildRedirects(parsedPages: Record<PageId, ParsedPage>): Record<PageId, PageId> {
  const result = {};
  Object.entries(parsedPages).forEach(([pageId, parsedPage]) => {
    parsedPage.front.redirects?.forEach(redirect => {
      if (parsedPages[redirect]) {
        throw new Error(`Page '${pageId}' has a redirect from '${redirect}', but that page exists`);
      }
      if (result[redirect]) {
        throw new Error(`Both '${pageId}' and '${result[redirect]}' redirect from '${redirect}'`);
      }
      result[redirect] = pageId;
    });
  });
  return result;
}

/*
 * Read:
 * - https://docs.aws.amazon.com/AmazonS3/latest/userguide/how-to-page-redirect.html
 * - https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-website.html
 * 
 * The documentation doesn't mention it but AWS seems to match the least specific
 * rule first? E.g. `web/main` will get matched before `web/main/abc`.
 * So lets say you want to redirect `web/main` -> `web/old` and `web/main/abc` -> `web/new/dfe`.
 * You will need to setup the rules `web/main` -> `web/old` and `web/old/abc` -> `web/new/dfe`.
 */
export async function buildAndWriteRedirects(parsedPages: Record<PageId, ParsedPage>, buildOpts: BuildOpts) {
  const hostName = new URL(buildOpts.baseUrl).host;
  const redirects = buildRedirects(parsedPages);
  const bucketWebsiteConfig = {
    ErrorDocument: {
      Key: "utility/404/index.html",
    },
    IndexDocument: {
        Suffix: "index.html",
    },
    RoutingRules: Object.entries(redirects).map(([fromPageId, toPageId]) => ({
      Condition: {
        KeyPrefixEquals: fromPageId.substring(1)
      },
      Redirect: {
        HostName: hostName,
        ReplaceKeyPrefixWith: toPageId.substring(1),
      }
    }))
  }
  const json = JSON.stringify(bucketWebsiteConfig);
  const outputPath = path.join(buildOpts.outputDir, "bucket-website.json");
  await fs.promises.mkdir(buildOpts.outputDir, {recursive: true});
  await fs.promises.writeFile(outputPath, json, "utf8");
}