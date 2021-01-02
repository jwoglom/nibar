import styles from "./styles.jsx";
import { run } from "uebersicht";
import config from '../config.json'

const containerStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "3px",
  position: "relative"
};

const desktopStyle = {
    maxWidth: config.windows_max_win,
    overflow: "hidden",
    cursor: "pointer"
};

const displayOnlyFocused = true;
const renderWindow = (app, focused, visible, index, fullTitle, stackIndex, fullscreen) => {
  let contentStyle = JSON.parse(JSON.stringify(desktopStyle));
  let innerStyle = {};
  if (focused == 1) {
    contentStyle.color = styles.colors.fg;
    innerStyle.fontWeight = "bold";
  } else if (visible == 1) {
    // contentStyle.color = styles.colors.fg;
    if (displayOnlyFocused) {
      return (<div></div>)
    }
  } else {
    return (<div></div>);
  }
  return (
    <div style={contentStyle} onClick={() => {
      console.log('click from', app, index);
      run('/usr/local/bin/yabai -m window --focus '+index).then(() => run('$WMSCRIPTS/notify_bar.sh'));
    }}>
      {focused && !displayOnlyFocused ? "[" : <span>&nbsp;</span> }
      {fullscreen == 1 ? <img src="./nibar/lib/static/expand.svg" width="16" style={{position: "absolute", left: "-10px", paddingTop: "4px"}} /> : null}
      {stackIndex > 0 ? <span>&nbsp;&nbsp;&nbsp;
        <img src="./nibar/lib/static/layer-group.svg" width="12" style={{position: "absolute", paddingTop: "5px", left: "12px"}} />
        <span style={{
            position: "absolute",
            left: "24px",
            bottom: "0px",
            marginLeft: "-2px",
            fontSize: "10px",
            background: "rgba(255,255,255,0.5)",
            lineHeight: "10px",
            color: "black",
            borderRadius: "5px",
            padding: "0 2px"
        }}>{stackIndex}</span>
      </span> : null}
      <span style={innerStyle}>
        {app}
        {displayOnlyFocused && ": "}
      </span>
      {displayOnlyFocused && fullTitle}
      {focused && !displayOnlyFocused ? "]" : <span>&nbsp;</span> }
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
    windows.push(renderWindow(window.app, window.focused, window.visible, window.id, window.title, window['stack-index'], window['zoom-fullscreen']));
  });

  if (minimized > 0 && !displayOnlyFocused) {
    windows.push(<div>+{minimized}</div>);
  }
  return (
    <div style={containerStyle}>
      {windows}
    </div>
  );
};

export default render;
