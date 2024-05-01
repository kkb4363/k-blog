// import { useEffect } from "react";

// interface Props {
//   ref: React.MutableRefObject<HTMLElement>;
//   onOutsideClick: () => void;
// }
// const useOverlay = ({ ref, onOutsideClick }: Props) => {
//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       ref.current &&
//       !ref.current.contains((event as MouseEvent).target as Node)
//     ) {
//       onOutsideClick();
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [ref, onOutsideClick]);
// };

// export default useOverlay;
