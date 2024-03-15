import { isDesktop } from "react-device-detect";
import Pc from "./Pc";
import Mobile from "./Mobile";

export default function Home() {
  return <>{isDesktop ? <Pc /> : <Mobile />}</>;
}
