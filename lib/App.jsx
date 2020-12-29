import styles from "./styles.jsx";
import { run } from "uebersicht";
import config from '../config.json'

const containerStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "3px"
};

const desktopStyle = {
    maxWidth: config.windows_max_win,
    overflow: "hidden",
    cursor: "pointer"
};


const renderWindow = (app, focused, visible, index) => {
  let contentStyle = JSON.parse(JSON.stringify(desktopStyle));
  if (focused == 1) {
    contentStyle.color = styles.colors.fg;
    contentStyle.fontWeight = "bold";
  } else if (visible == 1) {
    // contentStyle.color = styles.colors.fg;
  } else {
    return (<div></div>);
  }
  return (
    <div style={contentStyle} onClick={() => {
      console.log('click from', app, index);
      run('/usr/local/bin/yabai -m window --focus '+index).then(() => run('$WMSCRIPTS/notify_bar.sh'));
    }}>
      {focused ? "[" : <span>&nbsp;</span> }
      {app}
      {focused ? "]" : <span>&nbsp;</span> }
    </div>
  );
};


const render = ({ output }) => {
  if (typeof output === "undefined") return null;

  const windows = [];

  let minimized = 0;
  output.forEach(function(window) {
    if (window.minimized == 1) {
      minimized++;
      return;
    }
    if (window.app == 'Hammerspoon' && window.title == '') {
      return;
    }
    windows.push(renderWindow(window.app, window.focused, window.visible, window.id));
  });

  if (minimized > 0) {
    windows.push(<div>+{minimized}</div>);
  }
  return (
    <div style={containerStyle}>
      {windows}
    </div>
  );
};

export default render;
