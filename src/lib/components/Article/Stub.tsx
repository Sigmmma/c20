import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";
import {REPO_URL} from "../../utils/external-urls";
import {useLocalize} from "../Locale/Locale";

const localizations = {
  stubNotice: {
    en: (
      <p>
        <Icon name="alert-triangle"/> This page is incomplete! You can contribute information using <a href={REPO_URL}>GitHub issues or pull requests</a>.
      </p>
    )
  }
};

export default function Stub() {
  const {localize} = useLocalize(localizations);
  return (
    <Alert>
      {localize("stubNotice")}
    </Alert>
  );
};