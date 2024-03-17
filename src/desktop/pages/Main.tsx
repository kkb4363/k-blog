import styled, { css, keyframes } from "styled-components";
import Select from "react-select";
import dayjs from "dayjs";

import { Categories, Post, useDisplayStore } from "../../stores/display.store";
import { FormEvent, useEffect, useRef, useState } from "react";
import Home from "../../components/Home";
import Blog from "../../components/Blog";
import Header from "../../components/Header";

import logoIcon from "../../assets/logo.png";
import twiterIcon from "../../assets/twitter.svg";
import instagramIcon from "../../assets/instagram.svg";

const PcBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const fadeInAnimation = keyframes`
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`;

export const StyledElement = styled.div`
  animation: ${fadeInAnimation} 0.5s ease-in;
  width: 100%;
  height: 100%;
`;

const HeaderStyledElement = styled(StyledElement)`
  animation: ${fadeInAnimation} 0.2s ease-in;
`;

const Footer = styled.div`
  width: 90%;
  height: 120px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const BottomBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  width: 50%;
  padding: 20px 0 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    width: 20%;
    font-weight: 500;
  }
`;

const SocialRow = styled.div`
  display: flex;
  width: 8%;
  justify-content: space-around;

  & > a {
    & > img {
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
  }
`;

const Copy = styled.div`
  width: 50%;

  padding: 10px 0;
  & > p {
    font-size: 14px;
  }
`;

const WriteBox = styled.div`
  width: 90%;
  height: 500px;
  background-color: #000000;
  display: flex;
`;

const ModalTitle = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 70px 40px 0 200px;
  color: white;
  & > p {
    font-size: 60px;
    font-weight: 800;
    line-height: 1.1;
  }
  & > p:nth-child(2) {
    padding-left: 45px;
  }
  & > span {
    font-size: 25px;
    line-height: 2;
    padding-left: 45px;
  }
`;

const ModalText = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 70px 0 0 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputBorderStyle = css`
  border: 2px solid white;
  height: 100%;
  width: 350px;
  &:hover {
    border: 2px solid #c3ff5b;
  }
`;

const SubmitBox = styled.form`
  width: 70%;
  height: 45px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > button {
    cursor: pointer;
    color: #c3ff5b;
    border: 2px solid #c3ff5b;
    width: 200px;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    background-color: transparent;

    &:hover {
      background-color: #c3ff5b;
      color: #000000;
    }
  }
`;

const InputBox = styled.div`
  width: 70%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
  }

  & > div {
    ${InputBorderStyle};

    & > input {
      height: 100%;
      width: 100%;
      border: none;
      background-color: transparent;
      color: white;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 20px;
      &:focus {
        outline: none;
      }
    }
  }
`;

const TextAreaBox = styled.div`
  width: 70%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
  }

  & > div {
    ${InputBorderStyle}

    & > textarea {
      width: 100%;
      height: 100%;
      background-color: transparent;
      color: white;
      box-sizing: border-box;
      padding: 10px;
      font-size: 20px;
      font-weight: 600;
      resize: none;

      &::placeholder {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
`;

const categories = [
  { value: "featured", label: "featured" },
  { value: "fitness", label: "fitness" },
  { value: "diet", label: "diet" },
  { value: "invest", label: "invest" },
];

const selectStyle = {
  control: (style: any, { isFocused }: any) => ({
    //current
    ...style,
    boxShadow: "none",
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
    color: "#ebebeb",
    width: "100%",
  }),
  option: (style: any, { isFocused }: any) => {
    //option
    return {
      ...style,
      backgroundColor: isFocused ? "#DDCEF5" : null,
      color: "#333333",
      width: "100%",
      fontWeight: "500",
      fontSize: "20px",
    };
  },
  singleValue: (base: any) => ({
    ...base,
    color: "#ebebeb",
    fontSize: "20px",
    fontWeight: "500",
  }),
};

export default function Main() {
  const displayStore = useDisplayStore();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const handleSelectedCategory = (e: any) => {
    setSelectedCategory(e.value);
  };

  const handleScroll = () => {
    if ((window.scrollY as number) > 200) {
      displayStore.setHeaderState(false);
    } else {
      displayStore.setHeaderState(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const titleRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLTextAreaElement>(null);
  const currentDate = dayjs();
  const formattedDate = currentDate.format("YYYY-MM-DD HH:mm:ss");

  const handleSubmit = (e: FormEvent) => {
    if (titleRef?.current && detailRef?.current) {
      e.preventDefault();
      const newPost: Post = {
        title: titleRef.current.value,
        detail: detailRef.current.value,
        name: "gibeom",
        date: formattedDate,
        category: selectedCategory.value as Categories,
      };
      displayStore.setPostList(newPost);
      titleRef.current.value = "";
      detailRef.current.value = "";
      setSelectedCategory(categories[0]);
    }
  };

  return (
    <PcBox>
      {displayStore.headerState && (
        <HeaderStyledElement>
          <Header />
        </HeaderStyledElement>
      )}
      {displayStore.selectedTab === "home" && (
        <StyledElement>
          <BodyContainer>
            <Home />
          </BodyContainer>
        </StyledElement>
      )}
      {displayStore.selectedTab === "blog" && (
        <StyledElement>
          <BodyContainer>
            <Blog />
          </BodyContainer>
        </StyledElement>
      )}

      <WriteBox onSubmit={handleSubmit}>
        <ModalTitle>
          <p>
            {/* 얘 클릭하면 위로 스크롤 */}
            <img
              style={{ marginRight: "5px", cursor: "pointer" }}
              width={"40px"}
              height={"40px"}
              src={logoIcon}
            />
            K-Blog
          </p>
          <p>Write a blog post</p>
          <span>by Gibeom Kim</span>
        </ModalTitle>
        <ModalText>
          <InputBox>
            <span>Title</span>
            <div>
              <input ref={titleRef} placeholder="Title" />
            </div>
          </InputBox>
          <TextAreaBox>
            <span>Detail</span>
            <div>
              <textarea ref={detailRef} placeholder="Detail" />
            </div>
          </TextAreaBox>
          <InputBox>
            <span>Category</span>
            <div>
              <Select
                onChange={handleSelectedCategory}
                defaultValue={selectedCategory}
                isClearable={false}
                isSearchable={false}
                options={categories}
                styles={selectStyle}
              />
            </div>
          </InputBox>
          <InputBox>
            <span>Image</span>
            <span>이미지는 서버 구현 후 개발 예정입니다.</span>
          </InputBox>
          <SubmitBox>
            <button>
              <span>Upload</span>
            </button>
          </SubmitBox>
        </ModalText>
      </WriteBox>
      <Footer>
        <BottomBox>
          <Bottom>
            <span>kkb4363@naver.com</span>
            <SocialRow>
              <a href="https://www.instagram.com/gibeom__0/" target="_blank">
                <img src={instagramIcon} />
              </a>
              <a href="https://twitter.com/gimgibe55865136" target="_blank">
                <img src={twiterIcon} />
              </a>
            </SocialRow>
          </Bottom>
        </BottomBox>
        <Copy>
          <p>© 2024 by Developer kkb. Powered and secured by Wix</p>
        </Copy>
      </Footer>
    </PcBox>
  );
}
