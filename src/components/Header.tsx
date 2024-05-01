import styled from "styled-components";
import { useDisplayStore } from "../stores/display.store";

import logoIcon from "../assets/logo.png";

const HeaderContainer = styled.div`
  width: 100%;
  min-width: 1200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Col = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  padding: 0 100px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;
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
    cursor: pointer;
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
export default function Header() {
  const displayStore = useDisplayStore();
  const handleSelectedTab = (tab: string) => {
    return displayStore.selectedTab === tab ? "rgb(195, 255, 91)" : "#ffffff";
  };

  const goBlogPage = () => {
    displayStore.setSelectedTab("blog");
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: 1000000,
      behavior: "smooth",
    });
  };

  return (
    <HeaderContainer>
      <Col>
        <Row>
          <Left>
            <Logo>
              <img src={logoIcon} onClick={scrollToBottom} />
            </Logo>
            <Text1>
              <p>K-Blog</p>
              <p>Hope Happiness</p>
            </Text1>
          </Left>
          <Right>
            <span
              style={{
                color: handleSelectedTab("home"),
              }}
              onClick={() => displayStore.setSelectedTab("home")}
            >
              Home
            </span>
            <span
              style={{
                color: handleSelectedTab("blog"),
              }}
              onClick={goBlogPage}
            >
              Blog
            </span>
            <span>Login</span>
          </Right>
        </Row>
      </Col>
    </HeaderContainer>
  );
}
