import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import BlogPost from "components/BlogPost";
import BlogPostMain from "components/BlogPostMain";
import { useEffect, useState } from "react";
import { axiosInstance } from "utils/axios";

export default function MainPage() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/posts").then((res) => setBlogs(res.data));
  }, []);

  // 최신글 정렬
  const newPosts = [...blogs].sort((a, b) =>
    a.createdDate > b.createdDate ? -1 : 1
  );

  // 오래된글 정렬
  const oldPosts = [...blogs].sort((a, b) =>
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
        {newPosts.slice(0, 3).map((post, idx) => (
          <BlogPost
            key={idx}
            title={post.title}
            details={post.text}
            img={post.imgSrc}
            createdDate={post.createdDate}
            categoryId={post.categoryId}
            blogId={post.postId}
            tags={post.tags}
          />
        ))}
      </BlogPostCol>

      <BlogPostCol>
        <p>오래된 포스트</p>
        {oldPosts.slice(0, 3).map((post, idx) => (
          <BlogPost
            key={idx}
            title={post.title}
            details={post.text}
            img={post.imgSrc}
            createdDate={post.createdDate}
            categoryId={post.categoryId}
            blogId={post.postId}
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
