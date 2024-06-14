import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import TabInfoCol from "components/TabInfoCol";
import BlogPost from "components/BlogPost";
import SearchInput from "components/SearchInput";
import { useDisplayStore } from "stores/display.store";
import BlogDetail from "./BlogDetail";
import { posts } from "utils/staticDatas";
import { useSearchStore } from "stores/search.store";

export default function Blog() {
  const { setHeaderTab } = useDisplayStore();
  const { getSearch } = useSearchStore();
  const params = useParams();

  useEffect(() => {
    setHeaderTab("blog");
  }, []);

  const isBlogDetail = !!params.directoryId && !!params.id;

  const getBlogPosts = () => {
    const searchQuery = getSearch();
    const filteredPosts = [...posts]
      .sort((a, b) => (a.createdDate > b.createdDate ? -1 : 1))
      .filter((post) => {
        if (searchQuery === "") {
          return true;
        }
        const { title, subTitle, tags } = post;
        return (
          (title && title.includes(searchQuery)) ||
          (subTitle && subTitle.includes(searchQuery)) ||
          (tags && tags.includes(searchQuery))
        );
      });

    if (filteredPosts.length === 0) {
      return <h1>검색 결과가 없습니다 😯</h1>;
    }

    return filteredPosts.map((post) => (
      <BlogPost
        key={post.id}
        title={post.title}
        details={post.subTitle}
        img={post.img}
        createdDate={post.createdDate}
        categoryId={post.categoryId}
        blogId={post.id}
        postIdx={post.postIndex}
        tags={post.tags}
      />
    ));
  };

  return (
    <>
      {isBlogDetail ? (
        <BlogDetail />
      ) : (
        <>
          <TabInfoCol
            title={`Blog (${posts.length})`}
            info="학습한 내용과 지식들을 공유 및 정리합니다."
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
