import { run } from 'uebersicht'

const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  return (
    <div style={{cursor: "pointer"}} onClick={() => run('bash -c "$WMSCRIPTS/notify_bar.sh status"')}>
      {output.date}
      &nbsp;
      {output.time}
    </div>
  );
};

export default render;
