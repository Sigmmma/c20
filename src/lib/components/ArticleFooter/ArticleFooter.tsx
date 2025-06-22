import {LICENSE_URL, REPO_URL} from "../../utils/external-urls";
import {useLocalize} from "../Locale/Locale";

const localizations = {
  goTop: {
    en: "Go to top",
  },
  license: {
    en: (link) => <span>This text is available under the {link} license</span>,
  },
};

export default function ArticleFooter() {
  const {localize} = useLocalize(localizations);
  return (
    <footer className="article-footer">
      <p>
        <small>
          {localize("license")(<a href={LICENSE_URL}>CC BY-SA 3.0</a>)}
          {" • "}
          <a href={REPO_URL}>c20 on GitHub</a>
          {" • "}
          <a href="#">{localize("goTop")}</a>
        </small>
      </p>
    </footer>
  );
}