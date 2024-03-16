import styled from "styled-components";

import circleIcon from "../assets/circle.svg";
import checkIcon from "../assets/check.svg";
import searchIcon from "../assets/search.svg";
import tmp from "../assets/tmp1.png";
import moreIcon from "../assets/more.svg";

const Body = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
  overflow: auto;
  padding-bottom: 20px;

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Title = styled.div`
  position: relative;
  align-self: flex-start;

  & > p {
    font-size: 70px;
    font-weight: 900;
    line-height: 1.1;
  }
  margin-bottom: 4vh;
`;

const Line2 = styled.img`
  position: absolute;
  width: 65%;
  right: 0px;
  top: -20px;
  z-index: -1;
  transform: rotate(15deg);
`;

const SubTitle = styled.div`
  width: 100%;

  & > p {
    font-size: 20px;
    line-height: 1.3;
  }

  & > div {
    border-bottom: 2px solid #000000;
    display: flex;
    justify-content: flex-end;
  }
`;

const CheckBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: #000000;

  & > img {
    width: 50px;
    height: 50px;
  }
`;

const FilterRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  box-sizing: border-box;
  padding: 0 30px;
`;

const FilterList = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: rgb(75, 107, 19);
    }
  }
`;

const SearchAndLoginBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.div`
  width: 55%;
  height: 40px;
  border-bottom: 1px solid #000000;
  display: flex;
  align-items: center;

  & > img {
    width: 20px;
    height: 20px;
  }

  & > input {
    border-width: 0;
    width: calc(100% - 20px);
    &:focus {
      outline: none;
    }
  }
`;

const LoginBox = styled.div`
  cursor: pointer;
  width: 35%;
  height: 40px;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  box-sizing: border-box;

  & > span {
    font-size: 14px;
  }
`;

const BlogGrid = styled.div`
  width: 100%;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
  place-items: center;

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

export default function Blog() {
  return (
    <Body>
      <Title>
        <Line2 src={circleIcon} />
        <p>Keep a log</p>
        <p>of something</p>
      </Title>
      <SubTitle>
        <p>Man who has had a dream for a long time</p>
        <p>will finally get looked like the dream</p>
        <div>
          <CheckBox>
            <img src={checkIcon} />
          </CheckBox>
        </div>
      </SubTitle>
      <FilterRow>
        <FilterList>
          <span>All Posts</span>
          <span>Featured</span>
          <span>Fitness</span>
          <span>Diet</span>
          <span>Invest</span>
        </FilterList>

        <SearchAndLoginBox>
          <SearchInput>
            <img src={searchIcon} />
            <input placeholder="Search" />
          </SearchInput>
          <LoginBox>
            <span>Log in / Sign up</span>
          </LoginBox>
        </SearchAndLoginBox>
      </FilterRow>
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
    </Body>
  );
}
