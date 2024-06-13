import BlogPost from "components/BlogPost";
import styled from "styled-components";
import { useDisplayStore } from "stores/display.store";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchStore } from "stores/search.store";
import { useEffect } from "react";

export default function Search() {
  const { getCategory, getHeaderTab, getTag } = useDisplayStore();
  const { getSearch } = useSearchStore();
  const params = useParams();

  const getCategoryPosts = () => {
    const category = getCategory().filter((c) => c.id === params.id)[0];

    if (!category) {
      return null;
    }

    const searchQuery = getSearch();
    const filteredPosts = category.posts.filter((post) => {
      if (searchQuery === "") {
        return true;
      }
      const { title, subTitle } = post;
      return (
        (title && title.includes(searchQuery)) ||
        (subTitle && subTitle.includes(searchQuery))
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
        blogId={post.id}
        categoryId={post.categoryId}
        postIdx={post.postIndex}
        tags={post.tags}
      />
    ));
  };

  const getTagPosts = () => {
    const tag = getTag().filter((p) => p.id === params.id)[0];

    if (!tag) {
      return null;
    }

    const searchQuery = getSearch();
    const filteredPosts = tag.posts.filter((post) => {
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
        blogId={post.id}
        categoryId={post.categoryId}
        postIdx={post.postIndex}
        tags={post.tags}
      />
    ));
  };

  return (
    <SearchContainer>
      {getHeaderTab() === "category" ? getCategoryPosts() : getTagPosts()}
    </SearchContainer>
  );
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
