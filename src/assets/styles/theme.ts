export const light = {
  bgColor: "rgb(255 255 255 / 1)",
  header: {
    activeBg: "#e0e7ff",
    hoverBg: "rgb(245 245 245/1)",
    hoverTxt: "rgb(199 210 254/1)",
    txt: "rgb(82 82 82/1)",
    logoTxt: "rgb(79 70 229 / 1)",
    borderBottom: "gray",
    moreBg: "rgb(229 229 229/1)",
    moreTxtUnder: "#4f46e5",
  },
  body: {
    mainTxt: "rgb(99 102 241/1)",
    subTxt: "#525252",
    subTxt2: "#a3a3a3",
  },
};

export const dark = {
  bgColor: "rgb(23 23 23/1)",
  header: {
    activeBg: "rgb(55 48 163 / 1)",
    hoverBg: "rgb(38 38 38/1)",
    hoverTxt: "rgb(79 70 229/1)",
    txt: "rgb(212 212 212/1)",
    logoTxt: "#fff",
    borderBottom: "#fff",
    moreBg: "rgb(38 38 38/1 )",
    moreTxtUnder: "#818cf8",
  },
  body: {
    mainTxt: "white",
    subTxt: "#D4D4D4",
    subTxt2: "#737373",
  },
};

const themes = {
  light: light,
  dark: dark,
};

export default themes;
