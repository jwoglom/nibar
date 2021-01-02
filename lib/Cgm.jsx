import { run } from 'uebersicht'

const render = ({output}) => {
  if (!output) {
    return (<div>error</div>);
  }
  return (<div style={{cursor: "pointer"}} onClick={() => run('bash -c "$WMSCRIPTS/update_cgm.sh && $WMSCRIPTS/notify_bar.sh status"')}>
      <span style={{position: 'relative', top: '1.5px', zoom: 1.15}} dangerouslySetInnerHTML={{ __html: output.sgv}}></span>
      <span style={{position: 'relative', top: '0', zoom: 1.15}} dangerouslySetInnerHTML={{ __html: output.delta}}></span>
    </div>)
};

export default render;