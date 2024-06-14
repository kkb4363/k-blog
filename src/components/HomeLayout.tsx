import { AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  const [side, setSide] = useState(false);

  const handleSide = () => {
    if (side) {
      setSide(false);
    } else {
      setSide(true);
    }
  };

  return (
    <HomeContainer $side={side}>
      <Header handleSide={handleSide} />
      <Body>{children}</Body>
      <Footer />
      <AnimatePresence>
        {side && <Sidebar handleSide={handleSide} />}
      </AnimatePresence>
    </HomeContainer>
  );
}

const HomeContainer = styled.div<{ $side: boolean }>`
  width: 100vw;
  height: 100vh;
  padding: 0 22vw;
  background-color: ${(props) => props.theme.bgColor};
  overflow: ${({ $side }) => ($side ? "hidden" : "auto")};
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(64 64 64/1);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(212 212 212/ 1);
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  @media screen and (max-width: 1280px) {
    padding: 0 10vw;
  }
  @media screen and (max-width: 780px) {
    padding: 0;
  }
  @media screen and (max-width: 640px) {
    overflow-x: hidden;
  }
`;

export const Body = styled.div`
  width: 100%;
  flex-grow: 1;
`;
