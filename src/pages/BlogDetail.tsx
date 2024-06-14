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
import { useDisplayStore } from "stores/display.store";
import { formatDate } from "utils/utils";

export default function BlogDetail() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [showBlogList, setShowBlogList] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const { directoryId, id } = useParams();
  const { getCategory } = useDisplayStore();

  const getCurrentBlog = () => {
    return getCategory()
      .filter((c) => c.id === directoryId)[0]
      ?.posts.filter((p) => p.id === id)[0];
  };

  const getCurrentCategory = () => {
    return getCategory().filter((c) => c.id === directoryId)[0];
  };

  const handlePrevNext = (isNext: boolean) => {
    const currentIndex = getCurrentBlog().postIndex;
    const prevCondition = currentIndex > 1;
    const nextCondition = currentIndex < getCurrentCategory().posts.length;

    if (isNext ? nextCondition : prevCondition) {
      const adjustment = isNext ? 1 : -1;
      const newCategoryId = getCategory()
        .filter((c) => c.id === directoryId)[0]
        .posts.find(
          (d) => d.postIndex === currentIndex + adjustment
        ).categoryId;
      const newBlogId = getCategory()
        .filter((c) => c.id === directoryId)[0]
        .posts.find((d) => d.postIndex === currentIndex + adjustment).id;

      navigate(`/blog/${newCategoryId}/${newBlogId}`);
    }
  };

  const handlePost = (id: number) => {
    const newCategoryId = getCategory()
      .filter((c) => c.id === directoryId)[0]
      .posts.find((p) => p.postIndex === id).categoryId;
    const newBlogId = getCategory()
      .filter((c) => c.id === directoryId)[0]
      .posts.find((p) => p.postIndex === id).id;
    navigate(`/blog/${newCategoryId}/${newBlogId}`);
  };

  useEffect(() => {
    const filePath = `/blog/${directoryId}/${id}.md`;

    fetch(filePath)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch file: ${filePath}`);
        }
        return res.text();
      })
      .then((text) => setMarkdown(text))
      .catch((error) => {
        console.error(error);
        setMarkdown("파일을 불러오는 데 실패했습니다.");
      });
  }, [directoryId, id]);

  return (
    <>
      <BlogDetailHeader>
        <p>{formatDate(getCurrentBlog()?.createdDate)}</p>
        <span>{getCurrentBlog().title}</span>
      </BlogDetailHeader>

      <BlogDetailBody>
        <BlogDetailCategoryBox>
          <img src={flagIcon} alt="flag" width={35} height={40} />
          <p>{getCurrentCategory().title}</p>

          <BlogListCol $show={showBlogList}>
            {getCurrentCategory()
              .posts.sort((a, b) => (a.postIndex > b.postIndex ? 1 : -1))
              .map((p, idx) => (
                <BlogList
                  key={idx}
                  $isCurrent={p.postIndex === getCurrentBlog().postIndex}
                  onClick={() => handlePost(p.postIndex)}
                >
                  <span>{p.postIndex}.</span>
                  <span>{p.title}</span>
                </BlogList>
              ))}
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
                {getCurrentBlog().postIndex} /{" "}
                {getCurrentCategory().posts.length}
              </span>
              <BlogPageBtn
                onClick={() => handlePrevNext(false)}
                $isDisabled={getCurrentBlog().postIndex === 1}
              >
                <img src={arrowLeftIcon} alt="arrow_left" />
              </BlogPageBtn>
              <BlogPageBtn
                onClick={() => handlePrevNext(true)}
                $isDisabled={
                  getCurrentBlog().postIndex ===
                  getCurrentCategory().posts.length
                }
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
            {markdown}
          </ReactMarkdown>
        </BlogMarkdownContainer>

        <BlogTagRow>
          {getCurrentBlog().tags.map((tag, idx) => (
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
