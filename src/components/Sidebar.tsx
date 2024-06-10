import { motion } from "framer-motion";
import { useContext } from "react";
import { HeaderTabs } from "stores/display";
import { useDisplayStore } from "stores/display.store";
import styled, { ThemeContext, css } from "styled-components";
import { headerTabs } from "utils/staticDatas";
import exitLight from "&/imgs/exit_light.svg";
import exitDark from "&/imgs/exit_dark.svg";

interface Props {
  handleSide: () => void;
}

export default function Sidebar({ handleSide }: Props) {
  const theme = useContext(ThemeContext);

  const { getHeaderTab, setHeaderTab } = useDisplayStore();

  return (
    <SideBarContainer
      variants={sideAnimation}
      initial="entry"
      animate="center"
      exit="exit"
    >
      <SideBarExitBtn>
        <img
          src={theme.currentTheme === "light" ? exitDark : exitLight}
          alt="more exit"
          onClick={handleSide}
        />
      </SideBarExitBtn>
      <SideBarTabsCol>
        {headerTabs.map((tab) => {
          const isActive = tab.id === getHeaderTab();
          return (
            <SideBarTab
              $active={isActive}
              key={tab.id}
              onClick={() => setHeaderTab(tab.id as HeaderTabs)}
            >
              <span>{tab.name}</span>
            </SideBarTab>
          );
        })}
      </SideBarTabsCol>
    </SideBarContainer>
  );
}

const sideAnimation = {
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

const SideBarContainer = styled(motion.div)`
  @media screen and (min-width: 640px) {
    display: none;
  }

  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.header.moreBg};

  position: absolute;
  inset: 0;
  opacity: 0.8;
  padding: 40px 8px 0 50px;
`;

const SideBarExitBtn = styled.div`
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

const SideBarTabsCol = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const SideBarTab = styled.div<{ $active: boolean }>`
  & > span {
    line-height: 1.6;
    font-size: 22px;
    font-weight: 600;
    cursor: pointer;
    color: ${(props) => props.theme.header.txt};
    ${(props) => props.$active && sideBarTabActiveStyle};
  }
`;

const sideBarTabActiveStyle = css`
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-color: ${(props) => props.theme.header.moreTxtUnder};
`;
