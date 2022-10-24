import * as preact from "preact";
import UnitConverter from "../lib/components/UnitConverter/UnitConverter";

document.querySelectorAll("#unit-converter-mountpoint").forEach(mountpoint => {
  preact.render(<UnitConverter/>, mountpoint);
});