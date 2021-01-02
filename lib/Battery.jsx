import styles from "./styles.jsx";
import { run } from 'uebersicht'

const render = ({ output }) => {
  let charging = output.charging;
  let percentage = output.percentage;
  let remaining = output.remaining;
  return (
    <div style={{cursor: "pointer"}} onClick={() => run('bash -c "$WMSCRIPTS/click_statusbar.sh battery"')}>
      <div
        style={
          percentage < 20 && charging == false
            ? { color: styles.colors.red }
            : null
        }
      >
        <span>{charging ? "⚡" : null} {percentage}% {remaining && remaining.length > 0 ? "("+remaining+")" : null}</span>
      </div>
    </div>
  );
};

export default render;
