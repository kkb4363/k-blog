import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { posts } from "utils/staticDatas";
import BlogPost from "components/BlogPost";
import BlogPostMain from "components/BlogPostMain";

export default function MainPage() {
  const navigate = useNavigate();

  // 최신글 정렬
  const newPosts = [...posts].sort((a, b) =>
    a.createdDate > b.createdDate ? -1 : 1
  );

  // 오래된글 정렬
  const oldPosts = [...posts].sort((a, b) =>
    a.createdDate > b.createdDate ? 1 : -1
  );

  return (
    <MainPageContainer>
      <BlogPostMain />

      <BlogPostBox>
        <span>블로그 포스트</span>
        <div onClick={() => navigate("/blog")}>
          <span>ALL POSTS</span>
        </div>
      </BlogPostBox>

      <BlogPostCol>
        <p>최신 포스트</p>
        {newPosts.slice(0, 3).map((post) => (
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
        ))}
      </BlogPostCol>

      <BlogPostCol>
        <p>오래된 포스트</p>
        {oldPosts.slice(0, 3).map((post) => (
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
        ))}
      </BlogPostCol>
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BlogPostBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span:first-child {
    font-size: 30px;
    font-weight: 600;
    color: ${(props) => props.theme.body.postTxt};
  }

  & > div {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.header.hoverBg};
    }

    & > span:last-child {
      font-size: 14px;
      color: ${(props) => props.theme.body.allPostsTxt};
    }
  }
`;

const BlogPostCol = styled.div`
  width: 100%;
  min-height: 600px;
  border-bottom: 1px solid ${(props) => props.theme.header.borderBottom};
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px 0;

  & > p {
    font-size: 20px;
    color: ${(props) => props.theme.body.postTxt};
  }
`;
