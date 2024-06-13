import styled, { ThemeContext } from "styled-components";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";

import flagIcon from "&/imgs/flag.svg";
import arrowDownIcon from "&/imgs/arrowDown.svg";
import arrowDownDarkIcon from "&/imgs/arrowDown_dark.svg";
import tagIcon from "&/imgs/tag.svg";
import tagDarkIcon from "&/imgs/tag_dark.svg";
import arrowLeftIcon from "&/imgs/arrowLeft.svg";
import arrowRightIcon from "&/imgs/arrowRight.svg";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDisplayStore } from "stores/display.store";
import { DateFormatComponent } from "utils/utils";

export default function BlogDetail() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const { directoryId, id } = useParams();
  const { getCategory, getCurrentPostIdx, setCurrentPostIdx } =
    useDisplayStore();

  const getCurrentBlog = () => {
    return getCategory()
      .filter((c) => c.id === directoryId)[0]
      ?.posts.filter((p) => p.id === id)[0];
  };

  const getCategoryDetail = () => {
    return getCategory().filter((c) => c.id === directoryId)[0];
  };

  const handlePrev = () => {
    const currentIndex = getCurrentPostIdx();
    if (currentIndex > 1) {
      setCurrentPostIdx(currentIndex - 1);
      const newCategoryId = getCategory()
        .filter((c) => c.id === directoryId)[0]
        .posts.find((d) => d.postIndex === currentIndex - 1).categoryId;
      const newBlogId = getCategory()
        .filter((c) => c.id === directoryId)[0]
        .posts.find((d) => d.postIndex === currentIndex - 1).id;

      navigate(`/blog/${newCategoryId}/${newBlogId}`);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentPostIdx();
    if (currentIndex < getCategoryDetail().posts.length) {
      setCurrentPostIdx(currentIndex + 1);
      const newCategoryId = getCategory()
        .filter((c) => c.id === directoryId)[0]
        .posts.find((d) => d.postIndex === currentIndex + 1).categoryId;
      const newBlogId = getCategory()
        .filter((c) => c.id === directoryId)[0]
        .posts.find((d) => d.postIndex === currentIndex + 1).id;

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
    setCurrentPostIdx(id);
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
    <div>
      <BlogDetailHeader>
        <p>{DateFormatComponent(getCurrentBlog()?.createdDate)}</p>
        <span>{getCurrentBlog().title}</span>
      </BlogDetailHeader>

      <BlogDetailBody>
        <BlogDetailCategoryBox>
          <img src={flagIcon} alt="flag" width={35} height={40} />
          <p>{getCategoryDetail().title}</p>

          <ListCol $show={showList}>
            {getCategoryDetail().posts.map((p, idx) => (
              <List
                key={idx}
                $isCurrent={p.postIndex === getCurrentPostIdx()}
                onClick={() => handlePost(p.postIndex)}
              >
                <span>{p.postIndex}.</span>
                <span>{p.title}</span>
              </List>
            ))}
          </ListCol>

          <ShowList>
            <Left onClick={() => setShowList((p) => !p)}>
              {showList ? (
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
              <span>{showList ? "숨기기" : "목록 보기"}</span>
            </Left>

            <Right>
              <span>
                {getCurrentPostIdx()} / {getCategoryDetail().posts.length}
              </span>
              <PageBtn
                onClick={handlePrev}
                $isDisabled={getCurrentPostIdx() === 1}
              >
                <img src={arrowLeftIcon} alt="arrow_left" />
              </PageBtn>
              <PageBtn
                onClick={handleNext}
                $isDisabled={
                  getCurrentPostIdx() === getCategoryDetail().posts.length
                }
              >
                <img src={arrowRightIcon} alt="arrow_right" />
              </PageBtn>
            </Right>
          </ShowList>
        </BlogDetailCategoryBox>

        <BlogMarkdown>
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
        </BlogMarkdown>

        <BlogTag>
          {getCurrentBlog().tags.map((tag, idx) => (
            <Tag href={`/tags/${tag}`} key={idx}>
              <img src={tagDarkIcon} alt="tag" />
              <span>{tag}</span>
            </Tag>
          ))}
        </BlogTag>
      </BlogDetailBody>
    </div>
  );
}

const BlogTag = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0;
  gap: 20px;
`;

const Tag = styled.a`
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

const BlogMarkdown = styled.pre`
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

const ShowList = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  & > span {
    color: ${(props) => props.theme.body.subTxt2};
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > span {
    color: ${(props) => props.theme.blog.listTxt};
  }
`;

const PageBtn = styled.button<{ $isDisabled: boolean }>`
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

const ListCol = styled.div<{ $show: boolean }>`
  gap: 10px;

  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
`;

const List = styled.div<{ $isCurrent: boolean }>`
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
