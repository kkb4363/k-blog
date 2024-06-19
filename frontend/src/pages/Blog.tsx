import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import TabInfoCol from "components/TabInfoCol";
import BlogPost from "components/BlogPost";
import SearchInput from "components/SearchInput";
import { useDisplayStore } from "stores/display.store";
import BlogDetail from "./BlogDetail";
import { useSearchStore } from "stores/search.store";
import { axiosInstance } from "utils/axios";

export default function Blog() {
  const { setHeaderTab } = useDisplayStore();
  const { getSearch } = useSearchStore();
  const [blogs, setBlogs] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getBlogPosts = () => {
    const searchQuery = getSearch();
    const filteredPosts = [...blogs]
      .sort((a, b) => (a.createdDate > b.createdDate ? -1 : 1))
      .filter((post) => {
        if (searchQuery === "") {
          return true;
        }
        const { title, text, tags } = post;
        return (
          (title && title.includes(searchQuery)) ||
          (text && text.includes(searchQuery)) ||
          (tags && tags.includes(searchQuery))
        );
      });

    if (filteredPosts.length === 0) {
      return <h1>검색 결과가 없습니다 😯</h1>;
    }

    return filteredPosts.map((blog, idx) => (
      <BlogPost
        key={idx}
        title={blog.title}
        details={blog.text}
        tags={blog.tags}
        img={blog.imgSrc}
        categoryId={blog.categoryId}
        createdDate={blog.createdDate}
        blogId={blog.postId}
      />
    ));
  };

  useEffect(() => {
    setHeaderTab("blog");
  }, []);

  useEffect(() => {
    axiosInstance.get("/api/posts").then((res) => setBlogs(res.data));
  }, []);

  return (
    <>
      {!!params.id ? (
        <BlogDetail />
      ) : (
        <>
          <TabInfoCol
            title={`Blog (${blogs.length})`}
            info="학습한 내용과 지식들을 공유 및 정리합니다."
            btnCallback={() => navigate("/write")}
            btnTxt="포스트 작성"
          />

          <SearchInput placeHolder="블로그 내용 및 제목 검색하기" />
          <BlogPostsCol>{getBlogPosts()}</BlogPostsCol>
        </>
      )}
    </>
  );
}

const BlogPostsCol = styled.div`
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
