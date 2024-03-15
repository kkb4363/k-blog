import styled from "styled-components";

import lineIcon from "../../assets/line.svg";
import circleIcon from "../../assets/circle.svg";
import shopIcon from "../../assets/shop.svg";
import tempIcon from "../../assets/tmp1.png";

const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Body = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Title = styled.div`
  position: relative;
  & > p {
    font-size: 70px;
    font-weight: 00;
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
  justify-content: space-around;
`;

const BlogItemBox = styled.div`
  width: 298px;
  height: 268px;
  display: flex;
  flex-direction: column;
  background-color: rgb(195, 255, 91);
  & > img {
    height: 60%;
    object-fit: cover;
  }

  & > div {
    padding: 20px 10px 10px 10px;
  }
`;

export default function Home() {
  return (
    <BodyContainer>
      <Body id="test">
        <Title>
          <Line1 src={lineIcon} />
          <Line2 src={circleIcon} />
          <p>Slow down</p>
          <p>and Enjoy life</p>
        </Title>
        <BlogTitleBox>
          <BlogTitleRow>
            <ShopIcon src={shopIcon} />
            <BlogTitleName>
              <span>Fitness</span>
            </BlogTitleName>
          </BlogTitleRow>
          <BlogTitleRow2>
            <span>My secret workout plan</span>
            <div>
              <span>Read More</span>
            </div>
          </BlogTitleRow2>
        </BlogTitleBox>
        <BlogContentRow>
          <BlogItemBox>
            <img src={tempIcon} />
            <div>
              <span>six simple high intensity workouts test</span>
            </div>
          </BlogItemBox>
          <BlogItemBox>
            <img src={tempIcon} />
            <div>
              <span>six simple high intensity workouts test</span>
            </div>
          </BlogItemBox>
          <BlogItemBox>
            <img src={tempIcon} />
            <div>
              <span>six simple high intensity workouts test</span>
            </div>
          </BlogItemBox>{" "}
        </BlogContentRow>
        <BlogTitleBox>
          <BlogTitleRow>
            <ShopIcon src={shopIcon} />
            <BlogTitleName>
              <span>Fitness</span>
            </BlogTitleName>
          </BlogTitleRow>
          <BlogTitleRow2>
            <span>My secret workout plan</span>
            <div>
              <span>Read More</span>
            </div>
          </BlogTitleRow2>
        </BlogTitleBox>
        <BlogContentRow>
          <BlogItemBox>
            <img src={tempIcon} />
            <div>
              <span>six simple high intensity workouts test</span>
            </div>
          </BlogItemBox>
          <BlogItemBox>
            <img src={tempIcon} />
            <div>
              <span>six simple high intensity workouts test</span>
            </div>
          </BlogItemBox>
          <BlogItemBox>
            <img src={tempIcon} />
            <div>
              <span>six simple high intensity workouts test</span>
            </div>
          </BlogItemBox>{" "}
        </BlogContentRow>
      </Body>
    </BodyContainer>
  );
}
