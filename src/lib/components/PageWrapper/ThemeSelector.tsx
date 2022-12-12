import {useState} from "preact/hooks";
import Icon, {type IconName} from "../Icon/Icon";
import {useLocalize} from "../Locale/Locale";

const localizations = {
  toggleTheme: {
    en: "Toggle theme",
  },
};

export type ThemeSelectorProps = {
  themes: {name: string, icon: IconName}[];
  initialValue: string;
  onSelect: (string) => void;
};

export default function ThemeSelector(props: ThemeSelectorProps) {
  const {localize} = useLocalize(localizations);
  const [theme, setTheme] = useState<string>(props.initialValue);
  const currThemeIndex = props.themes.findIndex(t => t.name == theme);
  const nextThemeIndex = (currThemeIndex + 1) % props.themes.length;
  const nextThemeIcon = props.themes[nextThemeIndex].icon;

  const handleClick = () => {
    const currThemeIndex = props.themes.findIndex(t => t.name == theme);
    const nextThemeIndex = (currThemeIndex + 1) % props.themes.length;
    const nextThemeName = props.themes[nextThemeIndex].name;
    setTheme(nextThemeName)
    props.onSelect(nextThemeName);
  };

  return (
    <button className="nobg" id="toggle-theme" title={localize("toggleTheme")} onClick={handleClick}>
      <Icon name={nextThemeIcon}/>
    </button>
  );
};