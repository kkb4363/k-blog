import styled, { keyframes } from "styled-components";
import { useEffect } from "react";

import Home from "../../components/Home";
import Blog from "../../components/Blog";
import { useDisplayStore } from "../../stores/display.store";
import Header from "../../components/Header";

const PcBox = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`;

const StyledElement = styled.div`
  animation: ${fadeInAnimation} 0.5s ease-in;
  width: 100%;
`;

const HeaderStyledElement = styled(StyledElement)`
  animation: ${fadeInAnimation} 0.2s ease-in;
`;
export default function Main() {
  const displayStore = useDisplayStore();
  const handleScroll = () => {
    if ((document?.getElementById("sc")?.scrollTop as number) > 200) {
      displayStore.setHeaderState(false);
    } else {
      displayStore.setHeaderState(true);
    }
  };
  useEffect(() => {
    document?.getElementById("sc")?.addEventListener("scroll", handleScroll);
    return () => {
      document
        ?.getElementById("sc")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PcBox id="sc">
      {displayStore.headerState && (
        <HeaderStyledElement>
          <Header />
        </HeaderStyledElement>
      )}
      {displayStore.selectedTab === "home" && (
        <StyledElement>
          <BodyContainer>
            <Home />
          </BodyContainer>
        </StyledElement>
      )}
      {displayStore.selectedTab === "blog" && (
        <StyledElement>
          <BodyContainer>
            <Blog />
          </BodyContainer>
        </StyledElement>
      )}
    </PcBox>
  );
}
