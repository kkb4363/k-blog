import { useRef, useState } from "react";
import styled from "styled-components";
import categoryIcon from "&/imgs/category.png";
import dayjs from "dayjs";
import { useModalStore } from "stores/modal.store";
import { motion } from "framer-motion";
import { axiosInstance } from "utils/axios";

export default function CreateCategory() {
  const { setOpenModal } = useModalStore();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const categoryTitleRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const deleteImg = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", image);

    if (categoryTitleRef.current) {
      formData.append("title", categoryTitleRef.current.value);
      formData.append("updatedDate", dayjs(new Date()).format("YYYY-MM-DD"));
    }

    axiosInstance
      .post("/api/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setOpenModal("");
      });
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
          <p>카테고리 이미지 미리보기</p>
          <ImgBoxContainer>
            {preview === null ? (
              <>
                <ImgBox>
                  <img src={categoryIcon} alt="category-icon" />
                </ImgBox>
                <span onClick={handleImageClick}>
                  이미지 업로드
                  <input
                    ref={imageInputRef}
                    type="file"
                    hidden
                    onChange={handleImage}
                  />
                </span>
              </>
            ) : (
              <>
                <img src={preview} alt="img-preview" />
                <DeleteImg onClick={deleteImg}>제거</DeleteImg>
              </>
            )}
          </ImgBoxContainer>
        </Col>
        <Col>
          <p>이름</p>
          <input
            placeholder="카테고리 이름을 입력해주세요"
            ref={categoryTitleRef}
          />
          <BtnRow>
            <button onClick={() => setOpenModal("")}>취소</button>
            <button onClick={handleSubmit}>생성</button>
          </BtnRow>
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
  min-width: 770px;
  display: flex;
  padding: 0 20px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 10px;
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

const DeleteImg = styled.p`
  position: absolute;
  top: -28px;
  right: 0;
  color: ${(props) => props.theme.body.subTxt};
  text-decoration: underline;
  cursor: pointer;
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
    color: ${(props) => props.theme.default};
    padding: 10px 30px;
    background-color: ${(props) => props.theme.body.tag};
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.body.tagHover};
    }
  }
`;

const ImgBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 150px;
    height: 150px;
  }
`;

const BtnRow = styled.div`
  margin-top: auto;
  margin-left: auto;

  & > button {
    padding: 10px;
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.blog.submitBtn};
    &:hover {
      color: ${(props) => props.theme.blog.submitBtnHover};
    }
  }
`;
