import styles from "./lib/styles.jsx";

const style = {
  background: styles.colors.bg,
  cursor: "default",
  userSelect: "none",
  zIndex: "-1",
  width: "100%",
  height: "26px",
  position: "fixed",
  overflow: "hidden",
  bottom: "0px",
  right: "0px",
  left: "0px"
};

const css = `
body > div#uebersicht {
  position: fixed;
  bottom: 0;
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
