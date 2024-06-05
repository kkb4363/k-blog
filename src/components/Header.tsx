import styled, { ThemeContext, css } from "styled-components";
import { useContext, useState } from "react";
import { useDisplayStore } from "stores/display.store";
import LogoIcon from "&/imgs/logo.png";
import dark from "&/imgs/dark.svg";
import light from "&/imgs/light.svg";
import more from "&/imgs/more.svg";
import moreDark from "&/imgs/more_dark.svg";
import exitLight from "&/imgs/exit_light.svg";
import exitDark from "&/imgs/exit_dark.svg";

import { headerTabs } from "utils/staticDatas";
import { HeaderTabs } from "stores/display";
import { AnimatePresence, motion } from "framer-motion";

const moreVariants = {
  entry: () => ({
    x: 500,
  }),
  center: {
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: () => ({
    x: 500,
    transition: {
      duration: 0.2,
    },
  }),
};

export default function Header() {
  const theme = useContext(ThemeContext);
  const { getHeaderTab, setHeaderTab } = useDisplayStore();
  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <>
      <HeaderContainer>
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

          <img
            src={theme.currentTheme === "light" ? moreDark : more}
            alt="more"
            onClick={() => setMoreOpen(true)}
          />
        </HeaderTabRow>

        <AnimatePresence>
          {moreOpen && (
            <More
              variants={moreVariants}
              initial="entry"
              animate="center"
              exit="exit"
            >
              <MoreExit>
                <img
                  src={theme.currentTheme === "light" ? exitDark : exitLight}
                  alt="more exit"
                  onClick={() => setMoreOpen(false)}
                />
              </MoreExit>
              <MoreTabCol>
                {headerTabs.map((tab) => {
                  const isActive = tab.id === getHeaderTab();
                  return (
                    <MoreTab
                      $active={isActive}
                      key={tab.id}
                      onClick={() => setHeaderTab(tab.id as HeaderTabs)}
                    >
                      <span>{tab.name}</span>
                    </MoreTab>
                  );
                })}
              </MoreTabCol>
            </More>
          )}
        </AnimatePresence>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.header.txt};
  border-bottom: 2px solid ${(props) => props.theme.header.borderBottom};
  background-color: inherit;
  position: relative;
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
    @media screen and (max-width: 800px) {
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

  & > div:nth-child(4),
  & > div:nth-child(6) {
    @media screen and (max-width: 1540px) {
      display: none;
    }
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

const More = styled(motion.div)`
  @media screen and (min-width: 640px) {
    display: none;
  }

  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.header.moreBg};

  position: absolute;
  top: 0;
  opacity: 0.8;
  padding: 40px 8px 0 50px;
`;

const MoreExit = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: flex-end;

  & > img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const MoreTabCol = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const MoreTab = styled.div<{ $active: boolean }>`
  & > span {
    font-size: 22px;
    font-weight: 600;
    cursor: pointer;

    ${(props) => props.$active && moreTabActive}
  }
`;

const moreTabActive = css`
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-color: ${(props) => props.theme.header.moreTxtUnder};
`;
