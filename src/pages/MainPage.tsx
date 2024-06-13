import styled from "styled-components";
import HomeBodyMain from "components/HomeBodyMain";
import { useNavigate } from "react-router-dom";
import { posts } from "utils/staticDatas";
import BlogPost from "components/BlogPost";

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
      <HomeBodyMain />
      <BlogPostBox>
        <span>블로그 포스트</span>
        <div onClick={() => navigate("/blog")}>
          <span>ALL POSTS</span>
        </div>
      </BlogPostBox>
      <BlogBox>
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
      </BlogBox>
      <BlogBox>
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
      </BlogBox>
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

const BlogBox = styled.div`
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

const BlogItem = styled.div`
  width: 100%;
  min-height: 160px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: inherit;
  &:hover {
    background-color: ${(props) => props.theme.body.bgHover};
  }
`;

const BlogImg = styled.div`
  width: 32%;
  height: 100%;

  & > img {
    width: 100%;
    height: 140px;
    object-fit: contain;
  }
`;

const BlogTxtCol = styled.div`
  width: 68%;
  height: 100%;
  padding: 10px 0;
  display: flex;
  gap: 10px;
  flex-direction: column;

  & > p {
    color: ${(props) => props.theme.body.postTxt};
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.body.titleHover};
    }
  }
`;

const TagRow = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Tag = styled.span`
  color: ${(props) => props.theme.body.tag};
  &:hover {
    color: ${(props) => props.theme.body.tagHover};
  }
  cursor: pointer;
`;

const BlogDetail = styled.div`
  width: 100%;
  height: 55px;
  color: ${(props) => props.theme.body.postTxt};
`;

const BlogDate = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 5px;

  & > span {
    font-size: 14px;
    color: ${(props) => props.theme.body.subTxt};
  }
`;
