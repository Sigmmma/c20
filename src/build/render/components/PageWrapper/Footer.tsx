const {REPO_URL, localizer} = require("../bits");
import {useLocalize} from "../Ctx/Ctx";

const LICENSE_URL = "https://creativecommons.org/licenses/by-sa/3.0/";

const localizations = {
  goTop: {
    en: "Go to top",
    es: "Ir arriba"
  },
  license: {
    en: (link) => <span>This text is available under the {link} license</span>,
    es: (link) => <span>Este texto está disponible bajo la licencia CC {link}</span>,
  }
};

export default function Footer() {
  const localize = useLocalize(localizations);
  return (
    <footer className="content-footer">
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
};
