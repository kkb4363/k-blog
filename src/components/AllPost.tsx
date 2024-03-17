import styled from "styled-components";
import tmp from "../assets/tmp1.png";
import moreIcon from "../assets/more.svg";
import { Post, useDisplayStore } from "../stores/display.store";
import { useEffect, useState } from "react";

const BlogGrid = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
  place-items: center;
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* grid-template-columns: repeat(auto-fill, 300px);
grid-auto-rows: 20px;
grid-row-gap: 10px;
  grid-column-gap: 16px; */
`;

const PostBox = styled.div`
  /* grid-row-end: span 10; */
  width: 454px;
  height: 604px;
  border: 2px solid #000000;
`;

const PostImg = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

const PostText = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  box-sizing: border-box;
  padding: 0 30px 30px 30px;
`;

const PostTitleRow = styled.div`
  margin-top: -50px;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;

  & > img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const PostTitle = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  & > span {
    font-size: 12px;
    line-height: 1.2;
    font-weight: 500;
  }
`;

const PostTitle2 = styled.div`
  width: 100%;
  max-height: 60px;
  & > h2 {
    width: 100%;
    height: 100%;
    font-size: 25px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const PostBody = styled.div`
  width: 90%;
  height: 50px;
  & > span {
    font-size: 16px;
    line-height: 1.4;
  }
`;

export default function AllPost() {
  const displayStore = useDisplayStore();
  const currentCategory = displayStore.getPostCategory();

  const getPostList = () => {
    if (currentCategory === "all") {
      return displayStore.getPostList();
    } else {
      return displayStore
        .getPostList()
        .filter((item: Post) => item.category === currentCategory);
    }
  };

  console.log(getPostList());

  return (
    <BlogGrid>
      {getPostList()?.map((item: Post) => (
        <PostBox key={item.date}>
          <PostText>
            <PostTitleRow>
              <PostTitle>
                <span>{item.name}</span>
                <span>{item.date} min</span>
              </PostTitle>
              <img src={moreIcon} />
            </PostTitleRow>
            <PostTitle2>
              <h2>{item.title}</h2>
            </PostTitle2>
            <PostBody>
              <span>{item.detail}</span>
            </PostBody>
          </PostText>
        </PostBox>
      ))}
    </BlogGrid>
  );
}
