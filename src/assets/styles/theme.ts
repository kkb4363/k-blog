export const light = {
  bgColor: "rgb(255 255 255 / 1)",
  default: "#171717",
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
    postTxt: "#171717",
    allPostsTxt: "#6366f1",
    tag: "#818cf8",
    tagHover: "rgb(67 56 202/1)",
    titleHover: "rgb(99 102 241/1)",
    bgHover: "rgb(229 229 229/1)",
    infoTxt: "#737373",
  },
  category: {
    border: "#e5e5e5",
    borderShadow:
      "0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)",
    borderTop: "rgb(229 229 229/1)",
  },
};

export const dark = {
  bgColor: "rgb(23 23 23/1)",
  default: "#f5f5f5",
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
    postTxt: "#f5f5f5",
    allPostsTxt: "#818cf8",
    tag: "#818cf8",
    tagHover: "rgb(165 180 252/1)",
    titleHover: "rgb(99 102 241/1)",
    bgHover: "rgb(38 38 38/1)",
    infoTxt: "#a3a3a3",
  },
  category: {
    border: "rgb(82 82 82/1)",
    borderShadow: "",
    borderTop: "rgb(64 64 64/1)",
  },
};

const themes = {
  light: light,
  dark: dark,
};

export default themes;