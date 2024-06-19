import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { useDisplayStore } from "stores/display.store";
import TabInfoCol from "components/TabInfoCol";
import SearchInput from "components/SearchInput";
import { useModalStore } from "stores/modal.store";
import { axiosInstance } from "utils/axios";

export default function Category() {
  const params = useParams();
  const navigate = useNavigate();
  const isParams = !!params.id;
  const { setHeaderTab } = useDisplayStore();
  const [categories2, setCategories] = useState(null);
  const { setOpenModal, getOpenModal } = useModalStore();

  useEffect(() => {
    axiosInstance.get("/api/categories").then((res) => setCategories(res.data));
  }, [getOpenModal()]);

  useEffect(() => {
    setHeaderTab("category");
  }, []);

  return (
    <>
      {isParams ? (
        <>
          <CurrentCategoryTitle>
            <p>
              {categories2?.find((c) => c.categoryId === params.id).title} (
              {
                categories2?.find((c) => c.categoryId === params.id).posts
                  .length
              }
              )
            </p>
          </CurrentCategoryTitle>

          <SearchInput placeHolder="어떤 포스트를 찾으시나요?" />
        </>
      ) : (
        <TabInfoCol
          title="Category"
          info="카테고리별 작성된 포스트 내용들입니다."
          btnTxt="카테고리 추가"
          btnCallback={() => setOpenModal("Category")}
        />
      )}

      {isParams ? (
        <Outlet />
      ) : (
        <CategoryGrid>
          {categories2?.map((cate, idx) => {
            return (
              <CategoryBox
                key={cate.categoryId}
                onClick={() => navigate(cate.categoryId)}
              >
                <img
                  src={
                    "http://k-blog-env.eba-r5k4kdec.ap-northeast-2.elasticbeanstalk.com" +
                    cate?.imgSrc
                  }
                  alt="categoryIcon"
                />
                <CategoryTxtCol>
                  <p>{cate.title}</p>
                  <SecondTxt>
                    <span>{cate.posts.length}개의 포스트 </span>
                    <span>&nbsp; {cate.updatedDate}</span>
                  </SecondTxt>
                </CategoryTxtCol>
              </CategoryBox>
            );
          })}
        </CategoryGrid>
      )}
    </>
  );
}

export const CurrentCategoryTitle = styled.div`
  width: 100%;
  padding: 70px 0 30px 0;

  @media screen and (max-width: 780px) {
    padding: 70px 10px 20px 15px;
  }

  & > p {
    font-size: 40px;
    font-weight: 600;
    color: ${(props) => props.theme.default};

    @media screen and (max-width: 780px) {
      font-size: 24px;
    }
  }
`;

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

export const categoryAnimate = keyframes`
  from{
    transform: translateY(20px);
    opacity: 0;
  }

  to{
    transform: translateY(0);
    opacity:1;
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
    object-fit: cover;
    aspect-ratio: 191 / 100;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.category.borderShadow};
    transform: translateY(-5px);
  }

  animation: ${categoryAnimate} 0.5s ease-in-out;
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
