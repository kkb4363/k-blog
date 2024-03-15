import styled, { keyframes } from "styled-components";

import { RouterProvider } from "react-router-dom";
import { router } from "../router";

const fadeInAnimation = keyframes`
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`;

const StyledElement = styled.div`
  animation: ${fadeInAnimation} 1.5s ease-in;
`;

export default function Pc() {
  return (
    <StyledElement>
      <RouterProvider router={router} />
    </StyledElement>
  );
}
