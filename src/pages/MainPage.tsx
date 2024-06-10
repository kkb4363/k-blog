import testImg from "&/imgs/logo.png";
import heartIcon from "&/imgs/heart.svg";
import heartDarkIcon from "&/imgs/heart_dark.svg";
import styled, { css } from "styled-components";
import HomeBodyMain from "components/HomeBodyMain";

export default function MainPage() {
  return (
    <MainPageContainer>
      <HomeBodyMain />
      <BlogPost>
        <span>블로그 포스트</span>
        <div>
          <span>ALL POSTS</span>
        </div>
      </BlogPost>
      <BlogBox>
        <p>최신 포스트</p>
        <BlogItem>
          <BlogImg>
            <img src={testImg} />
          </BlogImg>
          <BlogTxtCol>
            <p>[JavaScript] 배열 생성 방법 속도 비교</p>
            <TagRow>
              <Tag>Javascript</Tag>
              <Tag>배열</Tag>
            </TagRow>
            <BlogDetail>
              array 블로그내용아무거나 쓰는중입니다 어자피
              테스트중이라상관없습니다
            </BlogDetail>
            <BlogDate>
              <span>2024년 1월 27일</span>
              <span> - </span>
              <img src={heartIcon} />
              <span>333</span>
            </BlogDate>
          </BlogTxtCol>
        </BlogItem>
        <BlogItem>
          <BlogImg>
            <img src={testImg} />
          </BlogImg>
          <BlogTxtCol>
            <p>[JavaScript] 배열 생성 방법 속도 비교</p>
            <TagRow>
              <Tag>Javascript</Tag>
              <Tag>배열</Tag>
            </TagRow>
            <BlogDetail>
              array 블로그내용아무거나 쓰는중입니다 어자피
              테스트중이라상관없습니다
            </BlogDetail>
            <BlogDate>
              <span>2024년 1월 27일</span>
              <span> - </span>
              <img src={heartIcon} />
              <span>333</span>
            </BlogDate>
          </BlogTxtCol>
        </BlogItem>
        <BlogItem>
          <BlogImg>
            <img src={testImg} />
          </BlogImg>
          <BlogTxtCol>
            <p>[JavaScript] 배열 생성 방법 속도 비교</p>
            <TagRow>
              <Tag>Javascript</Tag>
              <Tag>배열</Tag>
            </TagRow>
            <BlogDetail>
              array 블로그내용아무거나 쓰는중입니다 어자피
              테스트중이라상관없습니다
            </BlogDetail>
            <BlogDate>
              <span>2024년 1월 27일</span>
              <span> - </span>
              <img src={heartIcon} />
              <span>333</span>
            </BlogDate>
          </BlogTxtCol>
        </BlogItem>
      </BlogBox>
      <BlogBox>
        <p>인기 포스트</p>
        <BlogItem>
          <BlogImg>
            <img src={testImg} />
          </BlogImg>
          <BlogTxtCol>
            <p>[JavaScript] 배열 생성 방법 속도 비교</p>
            <TagRow>
              <Tag>Javascript</Tag>
              <Tag>배열</Tag>
            </TagRow>
            <BlogDetail>
              array 블로그내용아무거나 쓰는중입니다 어자피
              테스트중이라상관없습니다
            </BlogDetail>
            <BlogDate>
              <span>2024년 1월 27일</span>
              <span> - </span>
              <img src={heartIcon} />
              <span>333</span>
            </BlogDate>
          </BlogTxtCol>
        </BlogItem>
        <BlogItem>
          <BlogImg>
            <img src={testImg} />
          </BlogImg>
          <BlogTxtCol>
            <p>[JavaScript] 배열 생성 방법 속도 비교</p>
            <TagRow>
              <Tag>Javascript</Tag>
              <Tag>배열</Tag>
            </TagRow>
            <BlogDetail>
              array 블로그내용아무거나 쓰는중입니다 어자피
              테스트중이라상관없습니다
            </BlogDetail>
            <BlogDate>
              <span>2024년 1월 27일</span>
              <span> - </span>
              <img src={heartIcon} />
              <span>333</span>
            </BlogDate>
          </BlogTxtCol>
        </BlogItem>
        <BlogItem>
          <BlogImg>
            <img src={testImg} />
          </BlogImg>
          <BlogTxtCol>
            <p>[JavaScript] 배열 생성 방법 속도 비교</p>
            <TagRow>
              <Tag>Javascript</Tag>
              <Tag>배열</Tag>
            </TagRow>
            <BlogDetail>
              array 블로그내용아무거나 쓰는중입니다 어자피
              테스트중이라상관없습니다
            </BlogDetail>
            <BlogDate>
              <span>2024년 1월 27일</span>
              <span> - </span>
              <img src={heartIcon} />
              <span>333</span>
            </BlogDate>
          </BlogTxtCol>
        </BlogItem>
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

const BlogPost = styled.div`
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
