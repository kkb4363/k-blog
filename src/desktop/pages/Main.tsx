import styled, { keyframes } from "styled-components";
import { useDisplayStore } from "../../stores/display.store";
import { useEffect } from "react";
import Home from "../../components/Home";
import Blog from "../../components/Blog";
import Header from "../../components/Header";

import twiterIcon from "../../assets/twitter.svg";
import instagramIcon from "../../assets/instagram.svg";

const PcBox = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 120px);
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

const Footer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const BottomBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  width: 50%;
  padding: 20px 0 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    width: 20%;
    font-weight: 500;
  }
`;

const SocialRow = styled.div`
  display: flex;
  width: 8%;
  justify-content: space-around;

  & > a {
    & > img {
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
  }
`;

const Copy = styled.div`
  width: 50%;

  padding: 10px 0;
  & > p {
    font-size: 14px;
  }
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
    <>
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
      <Footer>
        <BottomBox>
          <Bottom>
            <span>kkb4363@naver.com</span>
            <SocialRow>
              <a href="https://www.instagram.com/gibeom__0/" target="_blank">
                <img src={instagramIcon} />
              </a>
              <a href="https://twitter.com/gimgibe55865136" target="_blank">
                <img src={twiterIcon} />
              </a>
            </SocialRow>
          </Bottom>
        </BottomBox>
        <Copy>
          <p>© 2024 by Developer kkb. Powered and secured by Wix</p>
        </Copy>
      </Footer>
    </>
  );
}
