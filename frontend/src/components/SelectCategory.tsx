import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useModalStore } from "stores/modal.store";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "utils/axios";

interface Props {
  title: string;
  tags: string[];
  text: string;
}

export default function SelectCategory(props: Props) {
  const navigate = useNavigate();
  const { clear } = useModalStore();
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  const handleSubmit = () => {
    const body = {
      title: props.title,
      text: props.text,
      tags: props.tags,
      categoryId: categories.find((c) => c.title === selectCategory).categoryId,
      createdDate: dayjs(new Date()).format("YYYY-MM-DD"),
    };
    axiosInstance
      .post("/api/post", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        clear();
        navigate("/");
      });
  };

  useEffect(() => {
    axiosInstance.get("/api/categories").then((res) => setCategories(res.data));
  }, []);

  const getCategoryImg = () => {
    return !!selectCategory
      ? "http://k-blog-env.eba-r5k4kdec.ap-northeast-2.elasticbeanstalk.com" +
          categories.find((c) => c.title === selectCategory)?.imgSrc
      : "";
  };

  return (
    <CreateCategoryContainer
      variants={createCategoryAnimate}
      initial="entry"
      animate="center"
      exit="exit"
    >
      <Row>
        <Col>
          <p>카테고리 이미지</p>
          <ImgBoxContainer>
            <ImgBox>
              {selectCategory && (
                <img src={getCategoryImg()} alt="카테고리를 선택해주세요" />
              )}
            </ImgBox>
          </ImgBoxContainer>
        </Col>
        <Col>
          <p>카테고리 설정</p>
          <CategoryList>
            {categories?.map((cate, idx) => (
              <Category
                $isActive={cate.title === selectCategory}
                onClick={() => setSelectCategory(cate.title)}
                key={idx}
              >
                {cate.title}
              </Category>
            ))}

            <BtnRow>
              <button onClick={() => clear()}>취소</button>
              <button onClick={handleSubmit}>선택하기</button>
            </BtnRow>
          </CategoryList>
        </Col>
      </Row>
    </CreateCategoryContainer>
  );
}

const createCategoryAnimate = {
  entry: () => ({
    transform: "translateY(500px)",
    opacity: 0,
  }),
  center: {
    transform: "translateY(0)",
    transition: {
      duration: 0.5,
    },
    opacity: 1,
  },
  exit: () => ({
    transform: "translateY(500px)",
    opacity: 0,
  }),
};

const CreateCategoryContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};

  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  width: 770px;
  display: flex;
  padding: 0 20px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 10px;
  position: relative;

  & > p {
    font-size: 20px;
    color: ${(props) => props.theme.default};
  }

  & > input {
    height: 40px;
    border-radius: 5px;
    padding: 10px;

    &:focus {
      outline: none;
    }
  }
`;

const ImgBoxContainer = styled.div`
  width: 320px;
  height: 200px;
  background-color: ${(props) => props.theme.blog.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > span {
    font-size: 18px;
    color: white;
    padding: 10px 30px;
    background-color: green;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryList = styled.div`
  width: 320px;
  height: 200px;
  background-color: ${(props) => props.theme.blog.bg};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Category = styled.div<{ $isActive: boolean }>`
  padding: 12px 0 12px 10px;
  font-size: 16px;
  border-bottom: 1px solid black;
  color: ${(props) => props.theme.body.postTxt};
  background-color: ${({ $isActive, theme }) => $isActive && theme.body.tag};
`;

const BtnRow = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  right: 50px;
  bottom: -50px;

  & > button {
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: white;
    font-family: "NotoSansKR";
    padding: 20px;
    border-radius: 5px;

    &:hover {
      background-color: gray;
    }
  }
`;
