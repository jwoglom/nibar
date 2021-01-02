import styles from "./styles.jsx";
import { run } from 'uebersicht'

let shorten = (name) => {
    if (matches(name, ['built-in'])) {
        return name.split(' ')[0];
    } else {
        return name;
    }
}

let matches = (name, options) => {
    for (var i=0; i < options.length; i++) {
        if (name.toLowerCase().indexOf(options[i]) != -1) {
            return true;
        }
    }
    return false;
}

const render = ({ output }) => {
  let style = JSON.parse(JSON.stringify(styles));
  style.cursor = 'pointer';

  let inputDevice = output.input;
  let outputDevice = output.output;
  let muted = output.muted == "true";

  let speakerIcon = '🔊';
  let mutedIcon = '🔇';
  let headphoneIcon = '🎧';
  let micIcon = '🎙️';

  let outputIcon = speakerIcon;
  if (matches(outputDevice, ['airpods', 'mdr-', 'headphone'])) {
    outputIcon = headphoneIcon;
  }

  if (muted) {
    outputIcon = mutedIcon;
  }

  let inputIcon = micIcon;

  return (
    <div style={style} onClick={() => run('open -b com.apple.systempreferences /System/Library/PreferencePanes/Sound.prefPane')}>
      {shorten(outputDevice) == shorten(inputDevice) ? <span>
        <span>{outputIcon} {shorten(outputDevice)}</span>
      </span> : <span>
        <span>{outputIcon} {shorten(outputDevice)}&nbsp;</span>
        <span>{inputIcon} {shorten(inputDevice)}</span>
      </span>}
    </div>
  );
};

export default render;
