import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "stores/modal.store";
import SelectCategory from "components/SelectCategory";
import { Tooltip } from "react-tooltip";
import { axiosInstance } from "utils/axios";

export default function Write() {
  const navigate = useNavigate();
  const { getOpenModal, setOpenModal } = useModalStore();
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const titleRef = useRef(null);
  const tagRef = useRef(null);

  const handleTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const newTag = tagRef.current.value.trim();

      if (newTag && tags.includes(newTag)) {
        tagRef.current.value = "";
        return;
      }

      if (newTag) {
        setTags((prevTags) => [...prevTags, newTag]);
      }

      tagRef.current.value = "";
    } else if (e.key === "Backspace") {
      if (tagRef.current.value === "" && tags.length > 0) {
        const updatedTags = [...tags.slice(0, tags.length - 1)];
        setTags(updatedTags);
      }
    }
  };

  const deleteTag = (tag: string) => {
    const updatedTag = tags.filter((prev) => prev !== tag);
    setTags(updatedTag);
  };

  const preRef = useRef(null);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [preRef, text]);

  useEffect(() => {
    if (history?.state.usr?.blogId) {
      axiosInstance.get(`/api/post/${history.state.usr.blogId}`).then((res) => {
        setText(res.data.text);
        setTags(res.data.tags);
        titleRef.current.value = res.data.title;
      });
    }
  }, []);

  const isBlogEditting = history?.state.usr?.blogId !== undefined;

  const editPost = () => {
    if (history?.state?.usr?.blogId) {
      const blogId = history.state.usr.blogId;

      const updatedData = {
        title: titleRef?.current.value,
        text: text,
        tags: tags,
      };

      axiosInstance
        .patch(`/api/edit/${blogId}`, updatedData)
        .then((res) => {
          navigate(`/blog/${res.data._id}`);
        })
        .catch((error) => {
          console.error("블로그 수정 실패:", error);
        });
    }
  };

  return (
    <WriteContainer>
      {getOpenModal() === "SelectCategory" && (
        <SelectCategory
          title={titleRef?.current?.value}
          tags={tags}
          text={text}
        />
      )}
      <WriteHalf>
        <input placeholder="제목을 입력하세요" ref={titleRef} />
        <Br />
        <TagBox>
          {tags?.map((tag, idx) => (
            <Tag key={idx} onClick={() => deleteTag(tag)}>
              <span>{tag}</span>
            </Tag>
          ))}
          <input
            placeholder="태그를 입력하세요"
            ref={tagRef}
            onKeyDown={handleTag}
            data-tooltip-content="쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다. 등록된 태그를 클릭하면 삭제됩니다."
            data-tooltip-id="tag-tooltip"
          />
          <Tooltip
            id="tag-tooltip"
            style={{ background: "gray" }}
            place="bottom"
          />
        </TagBox>

        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="내용을 입력하세요"
        />
        <SubmitBtns>
          <Btn onClick={() => navigate(-1)}>나가기</Btn>
          {isBlogEditting ? (
            <Btn onClick={editPost}>수정하기</Btn>
          ) : (
            <Btn onClick={() => setOpenModal("SelectCategory")}>출간하기</Btn>
          )}
        </SubmitBtns>
      </WriteHalf>

      <WriteHalf>
        <BlogMarkdownContainer ref={preRef}>
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <img style={{ maxWidth: "100%" }} {...props} alt="" />
              ),
            }}
            rehypePlugins={[rehypeHighlight]}
          >
            {text}
          </ReactMarkdown>
        </BlogMarkdownContainer>
      </WriteHalf>
    </WriteContainer>
  );
}

const WriteContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 20px;
  background-color: ${(props) => props.theme.bgColor};
`;

const BlogMarkdownContainer = styled.pre`
  padding-top: calc(50px + 58px + 36px);
  height: calc(100% - 50px);
  white-space: pre-wrap;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

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
    background-color: ${(props) => props.theme.blog.codeBg};
    color: ${(props) => props.theme.blog.codeTxt};
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

const WriteHalf = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  & > input {
    width: 100%;
    font-size: 40px;
    color: gray;
    background-color: inherit;
    outline: none;
    border: none;
  }
`;

const Br = styled.div`
  width: 50px;
  height: 5px;
  border-radius: 5px;
  margin: 25px 0 20px 0;
  background-color: gray;
`;

const TagBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & > input {
    padding: 5px 0;
    font-size: 18px;
    background-color: inherit;
    outline: none;
    border: none;
    color: gray;
    max-width: 250px;
  }
`;

const Tag = styled.div`
  background-color: ${(props) => props.theme.blog.tagBg};
  padding: 3px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  height: 35px;
  cursor: pointer;

  & > span {
    color: ${(props) => props.theme.blog.tagTxt};
    font-size: 16px;
  }
`;

const TextArea = styled.textarea`
  background-color: inherit;
  color: ${(props) => props.theme.default};
  outline: none;
  border: none;
  padding-top: 30px;
  padding-bottom: 10px;
  width: 100%;
  font-size: 20px;
  resize: none;
  font-family: "NotoSansKR";
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  flex: 1;
`;

const SubmitBtns = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button:last-child {
    color: ${(props) => props.theme.body.tag};
    &:hover {
      color: ${(props) => props.theme.body.tagHover};
    }
  }
`;

const Btn = styled.button`
  font-size: 20px;
  font-weight: 600;
  padding: 5px 10px;
  color: ${(props) => props.theme.default};
`;
