import DateTime from "./lib/DateTime.jsx";
import Battery from "./lib/Battery.jsx";
import Cpu from "./lib/Cpu.jsx";
import Wifi from "./lib/Wifi.jsx";
import Vpn from "./lib/Vpn.jsx";
import Bluetooth from "./lib/Bluetooth.jsx";
import Audio from "./lib/Audio.jsx";
import Cgm from "./lib/Cgm.jsx";
import Dnd from "./lib/Dnd.jsx";
import Error from "./lib/Error.jsx";
import parse from "./lib/parse.jsx";
import styles from "./lib/styles.jsx";

const style = {
  display: "grid",
  padding: "0 12px",
  gridAutoFlow: "column",
  gridGap: "20px",
  position: "fixed",
  overflow: "hidden",
  right: "0px",
  bottom: "0px",
  color: styles.colors.dim,
  fontFamily: styles.fontFamily,
  fontSize: styles.fontSize,
  lineHeight: styles.lineHeight,
  fontWeight: styles.fontWeight,
  whiteSpace: "nowrap"
};

export const refreshFrequency = 15 * 1000;

export const command = "./nibar/scripts/status.sh";

let outerDiv = null;
let lastRender = null;

export const render = ({ output }) => {
  const data = parse(output, "status");
  if (typeof data === "undefined") {
    if (lastRender != null) {
      return lastRender;
    }
    return (
      <div style={style}>
        <Error msg="Error: unknown script output" side="right" />
      </div>
    );
  }
  let newRender = (
    <div style={style}>
      {/*<Cpu output={data.cpu} />*/}
      <Cgm output={data.cgm} />
      <Audio output={data.audio} />
      <Bluetooth output={data.bluetooth} />
      <Vpn output={data.vpn} />
      <Wifi output={data.wifi} />
      <Battery output={data.battery} />
      <DateTime output={data.datetime} />
      <Dnd output={data.dnd} />
    </div>
  );

  lastRender = newRender;
  return newRender;
};

export default null;
