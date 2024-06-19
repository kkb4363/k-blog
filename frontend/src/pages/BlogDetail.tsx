import styled, { ThemeContext } from "styled-components";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import flagIcon from "&/imgs/flag.svg";
import arrowDownIcon from "&/imgs/arrowDown.svg";
import arrowDownDarkIcon from "&/imgs/arrowDown_dark.svg";
import tagIcon from "&/imgs/tag.svg";
import tagDarkIcon from "&/imgs/tag_dark.svg";
import arrowLeftIcon from "&/imgs/arrowLeft.svg";
import arrowRightIcon from "&/imgs/arrowRight.svg";
import { formatDate } from "utils/utils";
import axios from "axios";

interface BlogProps {
  categoryId: string;
  createdDate: string;
  tags: string[];
  text: string;
  title: string;
}

export default function BlogDetail() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [showBlogList, setShowBlogList] = useState(false);
  const { id } = useParams();
  const [blog, setBlog] = useState<any>([]);
  const [blogs, setBlogs] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);

  const currentBlogIndex = blogs.findIndex((b) => b._id === id) + 1;

  const handlePrev = (isNext: boolean) => {
    const currentIndex = blogs.findIndex((b) => b._id === id);

    if (currentIndex === -1) {
      console.error("현재 포스트를 찾을 수 없습니다.");
      return;
    }
    const nextIndex = currentIndex + (isNext ? 1 : -1);

    if (nextIndex >= 0 && nextIndex < blogs.length) {
      const newBlogId = blogs[nextIndex]._id;
      navigate(`/blog/${newBlogId}`);
    } else {
      console.log("더 이상 포스트가 없습니다.");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/post/${id}`)
      .then((res) => setBlog(res.data as BlogProps[]));
  }, [id]);

  useEffect(() => {
    axios
      .get(`/api/posts/${blog.categoryId}`)
      .then((res) => setBlogs(res.data));
  }, [blog]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategory(res.data));
  }, []);

  return (
    <>
      <BlogDetailHeader>
        <p>{formatDate(blog?.createdDate)}</p>
        <span>{blog?.title}</span>
      </BlogDetailHeader>

      <BlogDetailBody>
        <BlogDetailCategoryBox>
          <img src={flagIcon} alt="flag" width={35} height={40} />
          <p>{category.find((c) => c.categoryId === blog.categoryId)?.title}</p>

          <BlogListCol $show={showBlogList}>
            {blogs?.map((b, idx) => {
              const isActive = blog._id === b._id;
              return (
                <BlogList
                  onClick={() => navigate(b._id)}
                  key={idx}
                  $isCurrent={isActive}
                >
                  <span>{idx + 1}.</span>
                  <span>{b.title}</span>
                </BlogList>
              );
            })}
          </BlogListCol>

          <BlogManagement>
            <BlogShowList onClick={() => setShowBlogList((p) => !p)}>
              {showBlogList ? (
                <img
                  style={{ rotate: "180deg" }}
                  src={
                    theme.currentTheme === "dark"
                      ? arrowDownDarkIcon
                      : arrowDownIcon
                  }
                  alt="arrow_down"
                />
              ) : (
                <img
                  src={
                    theme.currentTheme === "dark"
                      ? arrowDownDarkIcon
                      : arrowDownIcon
                  }
                  alt="arrow_down"
                />
              )}
              <span>{showBlogList ? "숨기기" : "목록 보기"}</span>
            </BlogShowList>

            <BlogPrevNext>
              <span>
                {currentBlogIndex} / {blogs.length}
              </span>
              <BlogPageBtn
                onClick={() => handlePrev(false)}
                $isDisabled={currentBlogIndex === 1}
              >
                <img src={arrowLeftIcon} alt="arrow_left" />
              </BlogPageBtn>
              <BlogPageBtn
                onClick={() => handlePrev(true)}
                $isDisabled={currentBlogIndex === blogs.length}
              >
                <img src={arrowRightIcon} alt="arrow_right" />
              </BlogPageBtn>
            </BlogPrevNext>
          </BlogManagement>
        </BlogDetailCategoryBox>

        <BlogMarkdownContainer>
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <img style={{ maxWidth: "100%" }} {...props} alt="" />
              ),
            }}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog?.text}
          </ReactMarkdown>
        </BlogMarkdownContainer>

        <BlogTagRow>
          {blog?.tags?.map((tag, idx) => (
            <BlogTag href={`/tags/${tag}`} key={idx}>
              <img
                src={theme.currentTheme === "dark" ? tagDarkIcon : tagIcon}
                alt="tag"
              />
              <span>{tag}</span>
            </BlogTag>
          ))}
        </BlogTagRow>
      </BlogDetailBody>
    </>
  );
}

const BlogMarkdownContainer = styled.pre`
  padding: 30px 0;
  white-space: pre-wrap;

  & > h1 {
    color: ${(props) => props.theme.default};
    padding-bottom: 20px;
  }

  line-height: 1.5;
  color: ${(props) => props.theme.body.subTxt};

  code {
    padding: 3px 6px;
    border: none;
    border-radius: 3px;
    background-color: #e9ecef;
    color: black;
  }

  blockquote {
    margin: 2rem 0px;
    border-left: 4px solid ${(props) => props.theme.blog.blockquoteColor};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: ${(props) => props.theme.blog.blockquoteBg};
    padding: 1rem 1rem 1rem 2rem;
    color: ${(props) => props.theme.blog.blockquoteTxt};
  }
`;

const BlogDetailHeader = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  & > p {
    color: ${(props) => props.theme.body.infoTxt};
  }

  & > span {
    color: ${(props) => props.theme.blog.inputTxt};
    font-size: 40px;
    font-weight: 600;
  }
`;

const BlogDetailBody = styled.div`
  width: 100%;
  position: relative;

  padding: 20px 0;
  border-top: 1px solid ${(props) => props.theme.category.borderTop};
  border-bottom: 1px solid ${(props) => props.theme.category.borderTop};
`;

const BlogDetailCategoryBox = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.blog.boxBg};
  border-radius: 7px;
  position: relative;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > p {
    padding-bottom: 10px;
    font-size: 30px;
    color: ${(props) => props.theme.blog.titleTxt};
  }

  & > img {
    position: absolute;
    top: -1px;
    right: 10px;
  }
`;

const BlogListCol = styled.div<{ $show: boolean }>`
  gap: 10px;

  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
`;

const BlogList = styled.div<{ $isCurrent: boolean }>`
  display: flex;
  gap: 3px;
  cursor: ${({ $isCurrent }) => ($isCurrent ? "auto" : "pointer")};

  & > span:first-child {
    font-style: italic;
    color: ${(props) => props.theme.body.subTxt2};
  }

  & > span:last-child {
    color: ${({ $isCurrent, theme }) =>
      $isCurrent ? theme.body.tag : theme.body.subTxt};
  }
`;

const BlogManagement = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BlogShowList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  & > span {
    color: ${(props) => props.theme.body.subTxt2};
  }
`;

const BlogPrevNext = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > span {
    color: ${(props) => props.theme.blog.listTxt};
  }
`;

const BlogPageBtn = styled.button<{ $isDisabled: boolean }>`
  opacity: ${({ $isDisabled }) => $isDisabled && 0.3};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "auto" : "pointer")};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.category.borderTop};
  &:hover {
    background-color: ${({ $isDisabled, theme }) =>
      !$isDisabled && theme.blog.btnHover};
  }

  & > img {
    width: 24px;
    height: 24px;
  }
`;

const BlogTagRow = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0;
  gap: 20px;
`;

const BlogTag = styled.a`
  display: flex;
  padding: 10px;
  gap: 3px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.blog.tagBg};

  & > span {
    color: ${(props) => props.theme.blog.tagTxt};
  }

  &:hover {
    background-color: ${(props) => props.theme.blog.tagHover};
    & > span {
      color: ${(props) => props.theme.blog.tagTxtHover};
    }
  }
`;