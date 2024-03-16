import ReactDOM from "react-dom/client";
import "./index.css";
import { isDesktop } from "react-device-detect";
import Pc from "./desktop/pages/Pc.tsx";
import Mobile from "./desktop/pages/Mobile.tsx";
import "react-responsive-modal/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <>{isDesktop ? <Pc /> : <Mobile />}</>
  <Pc />
);
