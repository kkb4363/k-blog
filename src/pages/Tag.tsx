import React, { useEffect } from "react";
import { useDisplayStore } from "stores/display.store";
import styled from "styled-components";

export default function Tag() {
  const { setHeaderTab } = useDisplayStore();

  useEffect(() => {
    setHeaderTab("tags");
  }, []);

  return (
    <TagContainer>
      <TagRow>
        <TagTxt>
          <span>Tags</span>
        </TagTxt>
        <TagBox>
          <Tagg $count={"7"}>
            <span>JavaScript</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>Javdsgsdpt</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>Jasdgript</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>Javat</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>Jav</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>JavaScrfasfasfasfsafsaipt</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>JavaScript</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>JavaScript</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>JavaScript</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>JavaScript</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>JavaScript</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>JavaScript</span>
          </Tagg>
          <Tagg $count={"7"}>
            <span>JavaScript</span>
          </Tagg>
        </TagBox>
      </TagRow>
    </TagContainer>
  );
}

const commonPaddingSize = "25px";

const TagContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 340px;
  display: flex;
  justify-content: center;
`;

const TagRow = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 780px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const TagTxt = styled.div`
  width: 20%;

  & > span {
    color: ${(props) => props.theme.body.postTxt};
    font-size: 64px;
    font-weight: 600;
    padding-right: ${commonPaddingSize};
    border-right: 2px solid ${(props) => props.theme.body.postTxt};
    width: 100%;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: 780px) {
      border: none;
    }
  }
`;

const TagBox = styled.div`
  width: 60%;
  padding: ${commonPaddingSize};
  box-sizing: border-box;
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
`;

const Tagg = styled.div<{ $count: string }>`
  display: flex;
  gap: 10px;
  align-items: center;

  &::after {
    content: "(${(props) => props.$count})";
    color: ${(props) => props.theme.default};
    cursor: pointer;
  }

  & > span {
    cursor: pointer;
  }

  & > span:first-child {
    color: ${(props) => props.theme.body.tag};
    &:hover {
      color: ${(props) => props.theme.body.tagHover};
    }
  }
`;
