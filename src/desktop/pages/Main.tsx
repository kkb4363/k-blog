import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import logoIcon from "../../assets/logo.png";
import Home from "../../components/Home";
import Blog from "../../components/Blog";
import { useDisplayStore } from "../../stores/display.store";

const PcBox = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 12%;
  padding: 50px 50px 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -30px;
`;

const Col = styled.div`
  width: calc(100% - 100px);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;
  background-color: #000000;
`;

const Left = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

const Right = styled(Left)`
  & > span {
    cursor: pointer;
    color: #ffffff;
    &:hover {
      color: rgb(195, 255, 91);
    }
  }
  padding-right: 20px;
  gap: 20px;
  justify-content: flex-end;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
  & > img {
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
`;

const Text1 = styled.div`
  padding-left: 10px;
  color: #ffffff;
  font-size: 20px;
  line-height: 1.2;

  & > p:first-child {
    font-weight: 600;
  }
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
  animation: ${fadeInAnimation} 0.2s ease-in;
  width: 100%;
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
        <Header>
          <Col>
            <Row>
              <Left>
                <Logo>
                  <img src={logoIcon} />
                </Logo>
                <Text1>
                  <p>K-Blog</p>
                  <p>Hope Happiness</p>
                </Text1>
              </Left>
              <Right>
                <span onClick={() => displayStore.setSelectedTab("home")}>
                  Home
                </span>
                <span onClick={() => displayStore.setSelectedTab("blog")}>
                  Blog
                </span>
                <span>Login</span>
              </Right>
            </Row>
          </Col>
        </Header>
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
