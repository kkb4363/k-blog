import { useParams } from "react-router-dom";
import styled from "styled-components";

import BlogPost from "components/BlogPost";
import { useDisplayStore } from "stores/display.store";
import { useSearchStore } from "stores/search.store";
import { useEffect, useState } from "react";
import { axiosInstance } from "utils/axios";

export default function Search() {
  const { getHeaderTab } = useDisplayStore();
  const { getSearch } = useSearchStore();
  const params = useParams();
  const [blogs, setBlogs] = useState<any[]>([]);

  const getPosts = async (url) => {
    try {
      const res = await axiosInstance.get(url);
      setBlogs(res.data);
    } catch (err) {
      console.error("포스트 조회 에러:", err);
    }
  };

  useEffect(() => {
    const url =
      getHeaderTab() === "category"
        ? `/api/posts/${params.id}`
        : `/api/tag/${params.id}`;
    getPosts(url);
  }, [getHeaderTab(), params.id]);

  const renderPosts = () => {
    const searchQuery = getSearch();
    const filteredPosts = blogs.filter((post) => {
      if (searchQuery === "") {
        return true;
      }
      const { title, text } = post;
      return (
        (title && title.includes(searchQuery)) ||
        (text && text.includes(searchQuery))
      );
    });

    if (filteredPosts.length === 0 && !!searchQuery) {
      return <h1>검색 결과가 없습니다 😯</h1>;
    }

    return filteredPosts.map((post) => (
      <BlogPost
        key={post._id}
        title={post.title}
        details={post.text}
        img={post.imgSrc}
        createdDate={post.createdDate}
        blogId={post._id}
        categoryId={post.categoryId}
        tags={post.tags}
      />
    ));
  };

  return <SearchContainer>{renderPosts()}</SearchContainer>;
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-top: 1px solid ${(props) => props.theme.category.borderTop};
  border-bottom: 2px solid ${(props) => props.theme.category.borderTop};
  padding: 50px 0;
  width: 100%;

  & > h1 {
    min-height: 300px;
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.blog.inputTxt};
  }
`;
