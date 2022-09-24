import Alert from "../Alert/Alert";
import {useLocalize} from "../Ctx/Ctx";
import Icon from "../Icon/Icon";
const {REPO_URL} = require("../bits");

const localizations = {
  stubNotice: {
    en: (
      <p>
        <Icon name="help-circle"/> This page is incomplete! You can contribute information using
        <a href={REPO_URL}>GitHub issues or pull requests</a>.
      </p>
    )
  }
};

export default function Stub() {
  const localize = useLocalize(localizations);
  return (
    <Alert>
      {localize("stubNotice")}
    </Alert>
  );
};