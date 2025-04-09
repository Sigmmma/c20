import Alert from "../Alert/Alert";
import Heading from "../Heading/Heading";
import CodeBlock from "../CodeBlock/CodeBlock";
import DataTable from "../DataTable/DataTable";
import StructTable from "../StructTable/StructTable";
import Figure from "../Figure/Figure";
import Key from "../Key/Key";
import RelatedHsc from "../RelatedHsc/RelatedHsc";
import TagStruct from "../StructTable/TagStruct";
import {UnitConverterMountpoint} from "../UnitConverter/UnitConverter";
import Color from "../Color/Color";
import ChildList from "../ChildList/ChildList";
import Tabs from "../Tabs/Tabs";
import InfoBox from "../InfoBox/InfoBox";

// These are the components needed by tags for rendering
export const components = {
  Alert,
  Heading,
  CodeBlock,
  DataTable,
  StructTable,
  Figure,
  Key,
  RelatedHsc,
  TagStruct,
  UnitConverterMountpoint,
  Color,
  ChildList,
  Tabs,
  InfoBox,
  Hidden: () => null,
};

if (Object.values(components).find(it => it === undefined)) {
  throw new Error("Component imports are broken! There's an import order problem somewhere.");
}