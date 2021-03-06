import Desktop from "./lib/Desktop.jsx";
import Error from "./lib/Error.jsx";
import parse from "./lib/parse.jsx";
import styles from "./lib/styles.jsx";

const style = {
  padding: "0 8px",
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "20px",
  position: "fixed",
  overflow: "hidden",
  left: "0px",
  bottom: "0px",
  fontFamily: styles.fontFamily,
  lineHeight: styles.lineHeight,
  fontSize: styles.fontSize,
  color: styles.colors.dim,
  fontWeight: styles.fontWeight,
  whiteSpace: "nowrap"
};

export const refreshFrequency = false;
export const command = "./nibar/scripts/spaces.sh";

let prevValue = null;

export const render = ({ output }, ...args) => {
  const data = parse(output, "spaces");
  if (typeof data === "undefined" && prevValue != null) {
    return prevValue;
  }

  if (typeof data === "array" && data.length == 0) {
    return (<div></div>);
  }
  if (typeof data === "undefined") {
    return (
      <div style={style}>
        <Error msg="Error: unknown script output" side="left" />
      </div>
    );
  }
  if (typeof data.error !== "undefined") {
    return (
      <div style={style}>
        <Error msg={`Error: ${data.error}`} side="left" />
      </div>
    );
  }
  const displayId = Number(window.location.pathname.replace(/\//g, ''));
  console.log("displayId "+displayId+" "+window.location);
  const display = data.displays.find(d => d.id === displayId);
  let newValue = prevValue;
  if (display != null) {
    newValue = (
      <div style={style}>
        <Desktop output={data.spaces.filter(s => s.display === display.index)} />
      </div>
    );
    prevValue = newValue;
  }
  return newValue;
};

export default null;
