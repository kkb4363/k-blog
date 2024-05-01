import styled from "styled-components";

import lineIcon from "../assets/line.svg";
import circleIcon from "../assets/circle.svg";
import shopIcon from "../assets/shop.svg";
import tempIcon from "../assets/tmp1.png";
import { Post, useDisplayStore } from "../stores/display.store";
import { Fragment } from "react/jsx-runtime";

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
  padding-bottom: 20px;
`;

const Title = styled.div`
  position: relative;
  align-self: flex-start;

  & > p {
    font-size: 70px;
    font-weight: 900;
    line-height: 1.1;
  }
  margin-bottom: 10vh;
`;

const Line1 = styled.img`
  position: absolute;
  width: 40%;
  left: -20px;
  top: -10px;
  z-index: -1;
  transform: rotate(15deg);
`;

const Line2 = styled.img`
  position: absolute;
  width: 65%;
  right: 0px;
  top: -20px;
  z-index: -1;
  transform: rotate(15deg);
`;

const BlogTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 150px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

const BlogTitleRow = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
`;

const ShopIcon = styled.img`
  width: 5%;
  height: 100%;
  min-width: 60px;
  background-color: black;
`;

const BlogTitleName = styled.div`
  width: 95%;
  display: flex;
  align-items: flex-end;
  padding-left: 30px;

  & > span {
    font-size: 50px;
    font-weight: 600;
  }
`;

const BlogTitleRow2 = styled(BlogTitleRow)`
  & > span {
    padding-left: calc(35px + 5%);
    padding-top: 10px;
    font-weight: 500;
    font-size: 20px;
  }
  justify-content: space-between;
  & > div {
    cursor: pointer;
    align-self: flex-end;
    width: 12%;
    min-height: 50px;
    min-width: 118px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    color: #ffffff;

    &:hover {
      background-color: #333333;
    }

    & > span {
      font-size: 18px;
      font-weight: 500;
    }
  }
`;

const BlogContentRow = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  gap: 30px;
`;

const BlogItemBox = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px;
  background-color: #f8f8f8;
`;

const BlogItemTitle = styled.div`
  height: 20%;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const BlogText = styled.div`
  height: 80%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
`;

export default function Home() {
  const displayStore = useDisplayStore();

  return (
    <Body>
      <Title>
        <Line1 src={lineIcon} />
        <Line2 src={circleIcon} />
        <p>Slow down</p>
        <p>and Enjoy life</p>
      </Title>

      {displayStore.getPostList().map((item: any, idx: number) => (
        <Fragment key={item.name}>
          <BlogTitleBox>
            <BlogTitleRow>
              <ShopIcon src={shopIcon} />
              <BlogTitleName>
                <span>{item.name}</span>
              </BlogTitleName>
            </BlogTitleRow>
            <BlogTitleRow2>
              <span>My secret workout plan{idx + 1}</span>
              <div>
                <span
                  onClick={() => {
                    displayStore.setSelectedTab("blog");
                    displayStore.setPostCategory(item.name);
                  }}
                >
                  Read More
                </span>
              </div>
            </BlogTitleRow2>
          </BlogTitleBox>

          <BlogContentRow>
            {item.child.map((child: any) => (
              <BlogItemBox key={child.id}>
                <BlogItemTitle>
                  <span>{child.title}</span>
                </BlogItemTitle>
                <BlogText>
                  <span>{child.detail}</span>
                </BlogText>
              </BlogItemBox>
            ))}
          </BlogContentRow>
        </Fragment>
      ))}
    </Body>
  );
}
