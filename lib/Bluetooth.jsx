import { run } from 'uebersicht'

const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  let opacity = output.on ? 1 : 0.5;
  return <div onClick={() => run('bash -c "$WMSCRIPTS/click_statusbar.sh bluetooth"')}>
      <img src="./nibar/lib/static/bluetooth.svg" width="14" style={{marginTop: "2px", opacity: opacity}} />
  </div>;
};

export default render;
