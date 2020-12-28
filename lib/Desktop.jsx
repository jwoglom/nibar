import styles from "./styles.jsx";
import { run } from 'uebersicht'


const containerStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "8px",
  cursor: "pointer",
};

const desktopStyle = {
  // width: '4ch',
  cursor: 'pointer',
};

const renderSpace = (index, label, focused, visible, windows) => {
  let contentStyle = JSON.parse(JSON.stringify(desktopStyle));

  let hasWindows = windows.length > 0;

  let name = "" + index + "";
  if (label !== undefined && label.length > 0) {
    name +=  " " + label;
  }

  if (focused == 1) {
    contentStyle.color = styles.colors.fg;
    contentStyle.fontWeight = "bold";
  } else if (visible == 1) {
    contentStyle.color = styles.colors.fg;
  }
  return (
    <div style={contentStyle} onClick={() => {
      run('/usr/local/bin/yabai -m space --focus '+index);
    }}>
      {focused ? "[" : <span>&nbsp;</span> }
      {name}
      {focused ? "]" : <span>&nbsp;</span> }
    </div>
  );
};

const render = ({ output }) => {
  if (typeof output === "undefined") return null;

  output = output.sort((a, b) => (""+a.index).localeCompare(""+b.index))
  output = output.filter(space => space.windows.length > 0 || space.visible);

  const spaces = [];

  output.forEach(function(space) {
    spaces.push(renderSpace(space.index, space.label, space.focused, space.visible, space.windows));
  });

  if (spaces.length > 0) {
    spaces.push(<div style={desktopStyle} onClick={() => {
      run('/usr/local/bin/yabai -m space --create');
    }}>
      &nbsp;+&nbsp;
    </div>);
  }

  return (
    <div style={containerStyle}>
      {spaces}
    </div>
  );
};

export default render;
