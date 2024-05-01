import { createBrowserRouter, useLocation, useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { createRef } from "react";
import Main from "./pages/Main";

import bgvideo from "../assets/bgvideo.mp4";
import styled from "styled-components";

const routes = [
  {
    path: "/",
    name: "home",
    nodeRef: createRef(),
    element: <Main />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Transition />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function Transition() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef }: any = routes.find(
    (route) => route.path === location.pathname
  );
  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames={"page"}
        unmountOnExit
      >
        {() => (
          <div ref={nodeRef} className="page" id="k-blog">
            {currentOutlet}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}

const VideoBg = styled.video`
  /* 
  &::content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } */
`;
