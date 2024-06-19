import styled, { css } from "styled-components";
import logo from "&/imgs/logo.png";
import axios from "axios";

export default function BlogPostMain() {
  return (
    <>
      <BodyBigScreen>
        <BigScreenBox>
          <p>98_gb Blog</p>
          <span>흥미와 열정을 잃지 않기 위해 노력합니다.</span>
          <span>사용자 경험을 향상시키고 싶은 프론트 엔드 개발자입니다</span>
        </BigScreenBox>
        <BigScreenBox2>
          <img src={logo} alt="logo" />
        </BigScreenBox2>
      </BodyBigScreen>
      <BodySmallScreen>
        <img src={logo} alt="logo" />
        <div>
          <p>98_gb Blog</p>
          <span>흥미와 열정을 잃지 않기 위해 노력합니다.</span>
          <span>사용자 경험을 향상시키고 싶은 프론트 엔드 개발자입니다</span>
        </div>
      </BodySmallScreen>
    </>
  );
}

const BodyBigScreen = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1070px) {
    display: none;
  }
`;

const bodyImgStyle = css`
  width: 120px;
  height: 120px;
`;

const bodyTxtStyle = css`
  & > p {
    font-size: 40px;
    font-weight: 600;
    color: ${(props) => props.theme.body.mainTxt};
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  & > span:nth-child(2) {
    font-size: 18px;
    color: ${(props) => props.theme.body.subTxt};
    white-space: nowrap;
  }
  & > span:nth-child(3) {
    font-size: 18px;
    color: ${(props) => props.theme.body.subTxt2};
    white-space: nowrap;
    margin-top: 5px;
  }
`;

const BigScreenBox = styled.div`
  width: 50%;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 20px;

  ${bodyTxtStyle};
`;

const BigScreenBox2 = styled(BigScreenBox)`
  align-items: center;
  & > img {
    ${bodyImgStyle};
  }
`;

const BodySmallScreen = styled.div`
  width: 100%;
  padding-top: 30px;
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 1071px) {
    display: none;
  }

  & > img {
    ${bodyImgStyle};
  }

  & > div {
    gap: 15px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    ${bodyTxtStyle};
  }
`;
