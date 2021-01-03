import { run } from 'uebersicht'

const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  let style = {opacity: 0.25};

  let type = "tunnelblick";

  if (output.tunnelblick.length > 0) {
    style.opacity = 1;
    style.fontWeight = "bold";
  }

  if (output.pulsesecure.length > 0) {
    type = "pulsesecure";
    style.cursor = "pointer";
    if (output.pulsesecure == "Connected") {
      style.opacity = 1;
      style.fontWeight = "bold";
    }
  }
  return <div style={style} onClick={() => type == "pulsesecure" && run('bash -c "$WMSCRIPTS/vpn_pulsesecure_open.sh"')}>
      VPN
  </div>;
};

export default render;
