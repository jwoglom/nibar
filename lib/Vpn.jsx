import { run } from 'uebersicht'

const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  let style = {opacity: 0.25};
  if (output.tunnelblick.length > 0) {
    style.opacity = 1;
    style.fontWeight = "bold";
  }
  return <div style={style}>
      VPN
  </div>;
};

export default render;
