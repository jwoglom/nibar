import { run } from 'uebersicht'

const activeIcon = '';
//const inactiveIcon = '􀙈';

const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  const status = output.status;
  const ssid = output.ssid;
  const wifiInt = output.wifi_interface;
  const activeInt = output.active_interface;

  let network = output.ssid;
  if (wifiInt && activeInt && wifiInt.trim() != activeInt.trim()) {
    network = "Wired";
  }

  let style = {};
  let innerStyle = {paddingRight: "15px"};
  if (status === "inactive") {
    style.color = "red";
    innerStyle = {};
    network = null;
  }

  return <div style={style} onClick={() => run('bash -c "$WMSCRIPTS/click_statusbar.sh wi-fi"')}>
    <span style={innerStyle}>{activeIcon}</span>
    {network}
  </div>;
};

export default render;
