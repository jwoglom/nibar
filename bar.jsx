import styles from "./lib/styles.jsx";

const ontop = true;
const transparent = true;
const gradient = true;

const style = {
  background: transparent ? 
    gradient ? "linear-gradient(to bottom, rgba(28, 28, 28, 1), rgba(28, 28, 28, 0.5) 75%, rgba(28, 28, 28, 0.25))" : "rgba(28, 28, 28, 0.5)" : styles.colors.bg,
  cursor: "default",
  userSelect: "none",
  zIndex: "-1",
  width: "100%",
  height: "26px",
  position: "fixed",
  overflow: "hidden",
  bottom: ontop ? "none" : "0px",
  top: ontop ? "0px" : "none",
  right: "0px",
  left: "0px"
};

const css = `
body > div#uebersicht {
  position: fixed;
  ` + (ontop ? 'top' : 'bottom') + `: 0;
  left: 0;
  height: 24px;
  display: flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: stretch;
  align-items: flex-start;
}

body > div#uebersicht > #nibar-status-jsx,
body > div#uebersicht > #nibar-spaces-jsx,
body > div#uebersicht > #nibar-windows-jsx {
  flex: 0 1 auto;
  align-self: auto;
  position: unset;
}

body > div#uebersicht > #nibar-spaces-jsx {
  order: 1;
}

body > div#uebersicht > #nibar-windows-jsx {
  order: 2;
}

body > div#uebersicht > #nibar-status-jsx {
  order: 3;
}

body > div#uebersicht > #nibar-status-jsx > div,
body > div#uebersicht > #nibar-spaces-jsx > div,
body > div#uebersicht > #nibar-windows-jsx > div {
  position: unset !important;
}
`;

export const refreshFrequency = 1000 * 1000;

export const render = ({ output }) => {
  return <div style={style}>
    <style>
      {css}
    </style>
  </div>;
};

export default null;
