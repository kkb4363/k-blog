import ReactDOM from "react-dom/client";
import "./index.css";
import "../src/assets/styles/font.css";
import Pc from "./desktop/pages/Pc.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <>{isDesktop ? <Pc /> : <Mobile />}</>
  <Pc />
);
