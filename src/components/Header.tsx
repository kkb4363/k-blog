import styled, { ThemeContext } from "styled-components";
import { useContext } from "react";
import { useDisplayStore } from "stores/display.store";
import LogoIcon from "&/imgs/logo.png";
import dark from "&/imgs/dark.svg";
import light from "&/imgs/light.svg";
import more from "&/imgs/more.svg";
import moreDark from "&/imgs/more_dark.svg";

import { headerTabs } from "utils/staticDatas";
import { HeaderTabs } from "stores/display";
import { useNavigate } from "react-router-dom";

interface Props {
  handleSide: () => void;
}

export default function Header({ handleSide }: Props) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const { getHeaderTab, setHeaderTab } = useDisplayStore();

  const goMainPage = () => {
    setHeaderTab("home");
    navigate("/");
  };

  const handlePage = (tab: HeaderTabs) => {
    setHeaderTab(tab);
    navigate(tab);
  };

  return (
    <HeaderContainer>
      <HeaderLogo onClick={goMainPage}>
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
              onClick={() => handlePage(tab.id as HeaderTabs)}
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

        <img
          src={theme.currentTheme === "light" ? moreDark : more}
          alt="more"
          onClick={handleSide}
        />
      </HeaderTabRow>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  min-height: 50px;
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

  @media screen and (max-width: 780px) {
    padding-left: 10px;
  }

  & > span {
    @media screen and (max-width: 780px) {
      display: none;
    }
    color: ${(props) => props.theme.header.logoTxt};
    font-size: 28px;
    font-weight: 600;
  }
`;

const HeaderTabRow = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  & > img {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }

  & > img:last-child {
    display: none;
  }

  @media screen and (max-width: 640px) {
    & > div {
      display: none;
    }

    & > img:last-child {
      display: inline-block;
    }

    justify-content: flex-end;
    gap: 10px;
  }

  /* & > div:nth-child(4),
  & > div:nth-child(6) {
    @media screen and (max-width: 1540px) {
      display: none;
    }
  } */
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
