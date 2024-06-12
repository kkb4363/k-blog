import BlogPost from "components/BlogPost";
import styled from "styled-components";
import { useDisplayStore } from "stores/display.store";
import { useNavigate, useParams } from "react-router-dom";

export default function Search() {
  const { getCategory, getHeaderTab, getTag } = useDisplayStore();
  const params = useParams();

  const getCategoryPosts = () => {
    return getCategory()
      .filter((c) => c.id === params.id)[0]
      ?.posts.map((post) => (
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
    return getTag()
      .filter((p) => p.id === params.id)[0]
      ?.posts.map((post) => (
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
`;
