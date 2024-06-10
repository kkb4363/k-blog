import TabInfoCol from "components/TabInfoCol";
import { useEffect } from "react";
import { useDisplayStore } from "stores/display.store";
import styled from "styled-components";
import testImg from "&/imgs/logo.png";

export default function Category() {
  const { setHeaderTab } = useDisplayStore();

  useEffect(() => {
    setHeaderTab("category");
  }, []);
  return (
    <>
      <TabInfoCol
        title="Category"
        info="카테고리별 작성된 포스트 내용들입니다."
      />
      <CategoryGrid>
        <CategoryBox>
          <img src={testImg} alt="test" />
          <CategoryTxtCol>
            <p>자바스크립트와 맞짱</p>
            <SecondTxt>
              <span>3개의 포스트 </span>
              <span>&nbsp; 마지막 업데이트 4개월 전</span>
            </SecondTxt>
          </CategoryTxtCol>
        </CategoryBox>
        <CategoryBox>
          <img src={testImg} alt="test" />
          <CategoryTxtCol>
            <p>자바스크립트와 맞짱</p>
            <SecondTxt>
              <span>3개의 포스트 </span>
              <span>&nbsp; 마지막 업데이트 4개월 전</span>
            </SecondTxt>
          </CategoryTxtCol>
        </CategoryBox>{" "}
        <CategoryBox>
          <img src={testImg} alt="test" />
          <CategoryTxtCol>
            <p>자바스크립트와 맞짱</p>
            <SecondTxt>
              <span>3개의 포스트 </span>
              <span>&nbsp; 마지막 업데이트 4개월 전</span>
            </SecondTxt>
          </CategoryTxtCol>
        </CategoryBox>{" "}
        <CategoryBox>
          <img src={testImg} alt="test" />
          <CategoryTxtCol>
            <p>자바스크립트와 맞짱</p>
            <SecondTxt>
              <span>3개의 포스트 </span>
              <span>&nbsp; 마지막 업데이트 4개월 전</span>
            </SecondTxt>
          </CategoryTxtCol>
        </CategoryBox>{" "}
        <CategoryBox>
          <img src={testImg} alt="test" />
          <CategoryTxtCol>
            <p>자바스크립트와 맞짱</p>
            <SecondTxt>
              <span>3개의 포스트 </span>
              <span>&nbsp; 마지막 업데이트 4개월 전</span>
            </SecondTxt>
          </CategoryTxtCol>
        </CategoryBox>{" "}
        <CategoryBox>
          <img src={testImg} alt="test" />
          <CategoryTxtCol>
            <p>자바스크립트와 맞짱</p>
            <SecondTxt>
              <span>3개의 포스트 </span>
              <span>&nbsp; 마지막 업데이트 4개월 전</span>
            </SecondTxt>
          </CategoryTxtCol>
        </CategoryBox>
      </CategoryGrid>
    </>
  );
}

const CategoryGrid = styled.div`
  border-top: 1px solid ${(props) => props.theme.category.borderTop};
  border-bottom: 2px solid ${(props) => props.theme.category.borderTop};
  padding: 50px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  @media screen and (max-width: 1870px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 864px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (max-width: 780px) {
    padding: 50px 10px;
  }
`;

const CategoryBox = styled.div`
  border: 2px solid ${(props) => props.theme.category.border};
  transition: transform 0.1s;
  min-height: 264px;
  min-width: 330px;
  border-radius: 15px;

  & > img {
    width: 100%;
    height: 70%;
    object-fit: contain;
    aspect-ratio: 191 / 100;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.category.borderShadow};
    transform: translateY(-5px);
  }
`;

const CategoryTxtCol = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding-left: 10px;

  & > p {
    font-size: 18px;
    color: ${(props) => props.theme.default};
  }
`;

const SecondTxt = styled.div`
  display: flex;

  & > span:first-child {
    &::after {
      content: "·";
    }
    color: ${(props) => props.theme.body.infoTxt};
  }

  & > span:last-child {
    color: ${(props) => props.theme.body.subTxt2};
  }
`;
