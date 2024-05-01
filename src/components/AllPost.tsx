import styled from "styled-components";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import moreIcon from "../assets/more.svg";
import deleteIcon from "../assets/delete.png";
import { Post, useDisplayStore } from "../stores/display.store";
import { useEffect, useRef, useState } from "react";

const BlogGrid = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  place-items: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const PostBox = styled.div`
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
  position: relative;
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

  & > span:nth-child(2) {
    color: rgb(117, 119, 122);
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
  & > pre {
    font-size: 16px;
    line-height: 1.4;
  }
`;

const DeleteModal = styled.div`
  position: absolute;
  width: 150px;
  height: 50px;
  background-color: white;
  border-radius: 15px;
  right: 0;
  top: 30px;
  box-shadow: 1px 1px 10px black, -1px -1px 10px black;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #d8d8d8;
  }

  & > div {
    & > img {
      width: 16px;
      height: 16px;
    }

    display: flex;
    justify-content: space-around;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #000000;
  }
`;

export default function AllPost() {
  const displayStore = useDisplayStore();
  const currentCategory = displayStore.getPostCategory();
  const [open, setOpen] = useState({
    delete: 0,
  });

  const filterPostLists = () => {
    const allPosts = displayStore.getPostList();

    if (currentCategory === "all") {
      return allPosts.reduce(
        (acc: any, post: { child: any }) => [...acc, ...post.child],
        []
      );
    } else {
      const categoryPosts = allPosts.find(
        (post: { name: any }) => post.name === currentCategory
      );
      return categoryPosts ? categoryPosts.child : [];
    }
  };

  const handleDeleteOpen = (id: number) => {
    if (!!open.delete) {
      setOpen((o) => ({ ...o, delete: 0 }));
    } else {
      setOpen((o) => ({ ...o, delete: id }));
    }
  };

  const handleDelete = (id: number) => {
    displayStore.deletePostList(id);
    setOpen((o) => ({ ...o, delete: 0 }));
  };

  return (
    <>
      <BlogGrid>
        {filterPostLists()?.map((item: Post) => {
          const time = dayjs.duration(dayjs().diff(item.date));
          const hour = parseInt(time.format("m"));
          return (
            <PostBox key={item.id} id={item.id}>
              <PostText>
                <PostTitleRow>
                  <PostTitle>
                    <span>{item.name}</span>
                    <span>{hour}분전</span>
                  </PostTitle>
                  <img
                    src={moreIcon}
                    onClick={() => handleDeleteOpen(item.id)}
                  />
                  {!!open.delete && open.delete === item.id && (
                    <DeleteModal onClick={() => handleDelete(item.id)}>
                      <div>
                        <img src={deleteIcon} />
                        삭제 하기
                      </div>
                    </DeleteModal>
                  )}
                </PostTitleRow>
                <PostTitle2>
                  <h2>{item.title}</h2>
                </PostTitle2>
                <PostBody>
                  <pre>{item.detail}</pre>
                </PostBody>
              </PostText>
            </PostBox>
          );
        })}
      </BlogGrid>
    </>
  );
}
