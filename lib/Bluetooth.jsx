import { run } from 'uebersicht'

const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  let opacity = output.on == "1" ? 1 : 0.25;

  let paired = output.paired;
  let count = 0;
  if (paired && paired.length > 0) {
    count = paired.length;
  }


  return <div style={{cursor: "pointer"}} onClick={() => run('bash -c "$WMSCRIPTS/click_statusbar.sh bluetooth"')}>
      <img src="./nibar/lib/static/bluetooth.svg" width="14" style={{marginTop: "2px", opacity: opacity}} />
      {count > 0 && <span>
        <span style={{
            position: "absolute",
            bottom: "0px",
            marginLeft: "-2px",
            fontSize: "10px",
            background: "rgba(255,255,255,0.5)",
            lineHeight: "10px",
            color: "black",
            borderRadius: "5px",
            padding: "0 2px"
        }}>{count}</span>
      </span>}
  </div>;
};

export default render;
