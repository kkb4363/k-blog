import styled from "styled-components";
import { useDisplayStore } from "../stores/display.store";
import AllPost from "./AllPost";
import { StyledElement } from "../desktop/pages/Main";

import circleIcon from "../assets/circle.svg";
import checkIcon from "../assets/check.svg";
import searchIcon from "../assets/search.svg";
import { useEffect, useState } from "react";

const Body = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  position: relative;
  align-self: flex-start;

  & > p {
    font-size: 70px;
    font-weight: 900;
    line-height: 1.1;
  }
  margin-bottom: 4vh;
`;

const Line2 = styled.img`
  position: absolute;
  width: 65%;
  right: 0px;
  top: -20px;
  z-index: -1;
  transform: rotate(15deg);
`;

const SubTitle = styled.div`
  width: 100%;

  & > p {
    font-size: 20px;
    line-height: 1.3;
  }

  & > div {
    border-bottom: 2px solid #000000;
    display: flex;
    justify-content: flex-end;
  }
`;

const CheckBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: #000000;

  & > img {
    width: 50px;
    height: 50px;
  }
`;

const CategoryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  box-sizing: border-box;
  padding: 0 30px;
`;

const Categories = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: rgb(75, 107, 19);
    }
  }
`;

const SearchAndLoginBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.div`
  width: 55%;
  height: 40px;
  border-bottom: 1px solid #000000;
  display: flex;
  align-items: center;

  & > img {
    width: 20px;
    height: 20px;
  }

  & > input {
    border-width: 0;
    width: calc(100% - 20px);
    &:focus {
      outline: none;
    }
  }
`;

const LoginBox = styled.div`
  cursor: pointer;
  width: 35%;
  height: 40px;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  box-sizing: border-box;

  & > span {
    font-size: 14px;
  }
`;

export default function Blog() {
  const displayStore = useDisplayStore();
  const handleCurrentCategory = (category: string) => {
    return displayStore.currentPostCategory === category ? "rgb(75, 107, 19)" : "#000000";
  };

  return (
    <Body>
      <Title>
        <Line2 src={circleIcon} />
        <p>Keep a log</p>
        <p>of something</p>
      </Title>
      <SubTitle>
        <p>Man who has had a dream for a long time</p>
        <p>will finally get looked like the dream</p>
        <div>
          <CheckBox>
            <img src={checkIcon} />
          </CheckBox>
        </div>
      </SubTitle>
      <CategoryRow>
        <Categories>
          <span
            style={{ color: handleCurrentCategory("all") }}
            onClick={() => displayStore.setPostCategory("all")}
          >
            All Posts
          </span>
          <span
            style={{ color: handleCurrentCategory("featured") }}
            onClick={() => displayStore.setPostCategory("featured")}
          >
            Featured
          </span>
          <span
            style={{ color: handleCurrentCategory("fitness") }}
            onClick={() => displayStore.setPostCategory("fitness")}
          >
            Fitness
          </span>
          <span
            style={{ color: handleCurrentCategory("diet") }}
            onClick={() => displayStore.setPostCategory("diet")}
          >
            Diet
          </span>
          <span
            style={{ color: handleCurrentCategory("invest") }}
            onClick={() => displayStore.setPostCategory("invest")}
          >
            Invest
          </span>
        </Categories>

        <SearchAndLoginBox>
          <SearchInput>
            <img src={searchIcon} />
            <input placeholder="Search" />
          </SearchInput>
          <LoginBox>
            <span>Write a blog</span>
          </LoginBox>
        </SearchAndLoginBox>
      </CategoryRow>

      {displayStore.currentPostCategory === "all" && (
        <StyledElement>
          <AllPost />
        </StyledElement>
      )}

      {displayStore.currentPostCategory === "featured" && (
        <StyledElement>
          <AllPost />
        </StyledElement>
      )}
      {displayStore.currentPostCategory === "fitness" && (
        <StyledElement>
          <AllPost />
        </StyledElement>
      )}
      {displayStore.currentPostCategory === "diet" && (
        <StyledElement>
          <AllPost />
        </StyledElement>
      )}
      {displayStore.currentPostCategory === "invest" && (
        <StyledElement>
          <AllPost />
        </StyledElement>
      )}
    </Body>
  );
}
