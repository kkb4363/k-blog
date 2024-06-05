import styled, { ThemeContext } from "styled-components";
import LogoIcon from "&/imgs/logo.png";
import dark from "&/imgs/dark.svg";
import light from "&/imgs/light.svg";

import { useContext } from "react";
import { useDisplayStore } from "stores/display.store";
import { headerTabs } from "utils/staticDatas";
import { HeaderTabs } from "stores/display";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 22vw;
  background-color: ${(props) => props.theme.bgColor};
`;

export default function Home() {
  const theme = useContext(ThemeContext);
  const { getHeaderTab, setHeaderTab } = useDisplayStore();

  return (
    <HomeContainer>
      <Header>
        <HeaderLogo onClick={() => setHeaderTab("home")}>
          <img src={LogoIcon} alt="98_gb blog logo" />
          <span>98_gb Blog</span>
        </HeaderLogo>
        <HeaderTabRow>
          {headerTabs.map((tab) => {
            const isActive = tab.id === getHeaderTab();
            return (
              <HeaderTab
                $active={isActive}
                key={tab.id}
                onClick={() => setHeaderTab(tab.id as HeaderTabs)}
              >
                {tab.name}
              </HeaderTab>
            );
          })}

          <img
            src={theme.currentTheme === "light" ? dark : light}
            alt="theme mode change"
            onClick={theme.setCurrentTheme}
          />
        </HeaderTabRow>
      </Header>
    </HomeContainer>
  );
}

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.header.txt};
  border-bottom: 2px solid ${(props) => props.theme.header.borderBottom};
  background-color: inherit;
`;

const HeaderLogo = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  & > img {
    width: 38px;
    height: 38px;
  }

  & > span {
    color: ${(props) => props.theme.header.logoTxt};
    font-size: 28px;
    font-weight: 600;
  }
`;

const HeaderTabRow = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & > img {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`;

const HeaderTab = styled.div<{ $active: boolean }>`
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  transition: transform 0.1s;
  background-color: ${(props) => props.$active && props.theme.header.activeBg};
  border-radius: 5px;

  &:hover {
    font-weight: 600;
    transform: scale(1.15);
    background-color: ${(props) =>
      !props.$active && props.theme.header.hoverBg};
  }
`;
