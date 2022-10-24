import {useCtx} from "../Ctx/Ctx";

export default function ThanksIndex() {
  const ctx = useCtx();
  return (
    <ul>
      {ctx?.allThanks?.map(name =>
        <li>{name}</li>
      )}
    </ul>
  );
}