import { useEffect, useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import { categories, posts } from "utils/staticDatas";
import { useDisplayStore } from "stores/display.store";

export default function Home() {
  const [side, setSide] = useState(false);
  const { setTag, setCategory } = useDisplayStore();

  const handleSide = () => {
    if (side) {
      setSide(false);
    } else {
      setSide(true);
    }
  };

  useEffect(() => {
    const newTag = [];

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        const existingTag = newTag.find((p) => p.id === tag);
        if (!existingTag) {
          newTag.push({
            id: tag,
            title: tag,
            posts: [post],
          });
        } else {
          existingTag.posts.push(post);
        }
      });
    });

    setTag(newTag);
  }, []);

  useEffect(() => {
    const newcategory = [];

    categories.forEach((cate) => {
      let postIdx = 1;
      if (!newcategory.some((d) => d.id === cate.id)) {
        newcategory.push({
          id: cate.id,
          posts: [],
          title: cate.title,
          updatedDate: cate.updatedDate,
        });
        postIdx = 1;
      }
      posts.forEach((post) => {
        if (post.categoryId === cate.id) {
          const prevCategory = newcategory.find(
            (d) => d.id === post.categoryId
          );
          if (prevCategory) {
            prevCategory.posts.push({ ...post, postIndex: postIdx++ });
          }
        }
      });
    });

    setCategory(newcategory);
  }, []);

  return (
    <HomeContainer $side={side}>
      <Header handleSide={handleSide} />
      <Body>
        <Outlet />
      </Body>
      <Footer />
      <AnimatePresence>
        {side && <Sidebar handleSide={handleSide} />}
      </AnimatePresence>
    </HomeContainer>
  );
}

export const HomeContainer = styled.div<{ $side: boolean }>`
  width: 100vw;
  height: 100vh;
  padding: 0 22vw;
  background-color: ${(props) => props.theme.bgColor};
  overflow: ${({ $side }) => ($side ? "hidden" : "auto")};
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(64 64 64/1);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(212 212 212/ 1);
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  @media screen and (max-width: 1280px) {
    padding: 0 10vw;
  }
  @media screen and (max-width: 780px) {
    padding: 0;
  }
  @media screen and (max-width: 640px) {
    overflow-x: hidden;
  }
`;

export const Body = styled.div`
  width: 100%;
  flex-grow: 1;
`;
