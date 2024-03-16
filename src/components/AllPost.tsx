import styled from "styled-components";
import tmp from "../assets/tmp1.png";
import moreIcon from "../assets/more.svg";

const BlogGrid = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
  place-items: center;
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* grid-template-columns: repeat(auto-fill, 300px);
grid-auto-rows: 20px;
grid-row-gap: 10px;
  grid-column-gap: 16px; */
`;

const PostBox = styled.div`
  /* grid-row-end: span 10; */
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
  & > span {
    font-size: 16px;
    line-height: 1.4;
  }
`;

export default function AllPost() {
  return (
    <BlogGrid>
      <PostBox>
        <PostImg src={tmp} />
        <PostText>
          <PostTitleRow>
            <PostTitle>
              <span>Admin</span>
              <span>Mar 22, 2023 . 1 min</span>
            </PostTitle>
            <img src={moreIcon} />
          </PostTitleRow>
          <PostTitle2>
            <h2>5 Superfood you shouldn' skip</h2>
          </PostTitle2>
          <PostBody>
            <span>
              Create a blog post subtitle that summarizes your post in a
              fewhort, punchy sentences and entices your audience to
              continuereading....
            </span>
          </PostBody>
        </PostText>
      </PostBox>
      <PostBox>
        <PostImg src={tmp} />
        <PostText>
          <PostTitleRow>
            <PostTitle>
              <span>Admin</span>
              <span>Mar 22, 2023 . 1 min</span>
            </PostTitle>
            <img src={moreIcon} />
          </PostTitleRow>
          <PostTitle2>
            <h2>5 Superfood you shouldn' skip</h2>
          </PostTitle2>
          <PostBody>
            <span>
              Create a blog post subtitle that summarizes your post in a
              fewhort, punchy sentences and entices your audience to
              continuereading....
            </span>
          </PostBody>
        </PostText>
      </PostBox>
      <PostBox>
        <PostImg src={tmp} />
        <PostText>
          <PostTitleRow>
            <PostTitle>
              <span>Admin</span>
              <span>Mar 22, 2023 . 1 min</span>
            </PostTitle>
            <img src={moreIcon} />
          </PostTitleRow>
          <PostTitle2>
            <h2>5 Superfood you shouldn' skip</h2>
          </PostTitle2>
          <PostBody>
            <span>
              Create a blog post subtitle that summarizes your post in a
              fewhort, punchy sentences and entices your audience to
              continuereading....
            </span>
          </PostBody>
        </PostText>
      </PostBox>
    </BlogGrid>
  );
}
