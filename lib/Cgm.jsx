import { run } from 'uebersicht'

const render = ({output}) => {
  if (!output) {
    return (<div>error</div>);
  }
  return (<div style={{cursor: "pointer"}} onClick={() => run('bash -c "$WMSCRIPTS/update_cgm.sh && $WMSCRIPTS/notify_bar.sh"')}>
      <span dangerouslySetInnerHTML={{ __html: output.sgv}}></span>
      <span dangerouslySetInnerHTML={{ __html: output.delta}} style={{position: 'relative', top: '-1px', zoom: 1.15}}></span>
    </div>)
};

export default render;