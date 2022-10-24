import {ComponentChildren} from "preact";
import {Lang} from "../../utils/localization";
import {useCtx, useLocalize} from "../Ctx/Ctx";

export type HtmlDocProps = {
  title?: string;
  noSearch?: boolean;
  baseUrl: string;
  ogDescription?: string;
  ogTags?: string[];
  ogOtherLangs?: Lang[];
  ogImg?: string;
  path: string;
  localizedPath: string;
  children?: ComponentChildren;
};

const localizations = {
  locale: {
    en: "en_US",
    es: "es_ES"
  },
  siteName: {
    en: "The Reclaimers Library",
    es: "La Biblioteca de Reclaimers"
  },
};

export default function HtmlDoc(props: HtmlDocProps) {
  const localize = useLocalize(localizations);
  const ctx = useCtx();
  const lang = ctx?.lang ?? "en";
  
  const ogImgAbsoluteUrl = props.ogImg ?
    `${props.baseUrl}${props.path}/${props.ogImg}` :
    `${props.baseUrl}/assets/librarian.png`;

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8"/>
        {/* {page.Page404 &&
          <meta itemProp="Is404" content='true'/>
        } */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        {props.noSearch ? (
          <meta name="robots" content="noindex"/>
        ) : (
          <meta name="robots" content="index, follow"/>
        )}
        {props.title &&
          <meta property="og:title" content={props.title}/>
        }
        <meta property="og:site_name" content={localize("siteName")}/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content={localize("locale")}/>
        {props.ogOtherLangs?.map(otherLang =>
          <meta key={otherLang} property="og:locale:alternate" content={localizations.locale[otherLang] ?? otherLang}/>
        )}
        {props.ogTags && props.ogTags.map(tag =>
          <meta property="og:article:tag" content={tag}/>
        )}
        <meta property="og:url" content={`${props.baseUrl}${props.localizedPath}`}/>
        {props.ogDescription &&
          <meta property="og:description" content={props.ogDescription}/>
        }
        <meta property="og:image" content={ogImgAbsoluteUrl}/>
        <title>{props.title ? `${props.title} - c20` : "c20"}</title>
        <base href={props.path.endsWith("/") ? props.path : `${props.path}/`}/>
        <link rel="preload" type="application/json" as="fetch" href={`/assets/search-index_${lang}.json`}/>
        <link rel="icon" type="image/png" href="/assets/librarian.png"/>
        <link rel="stylesheet" href="/assets/style.css"/>
        <link id="syntax" rel="stylesheet" href="/assets/night-owl.css"/>
        <script dangerouslySetInnerHTML={{
          __html: 'document.documentElement.dataset.theme = window.localStorage.getItem("theme") || "dark";'
        }}/>
      </head>
      <body>
        {props.children}
        <script src="/assets/main.js"></script>
      </body>
    </html>
  );
};
