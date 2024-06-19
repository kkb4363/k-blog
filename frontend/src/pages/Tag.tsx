import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useDisplayStore } from "stores/display.store";
import { CurrentCategoryTitle } from "./Category";
import SearchInput from "components/SearchInput";
import axios from "axios";

export default function Tag() {
  const { setHeaderTab } = useDisplayStore();
  const params = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setHeaderTab("tags");
  }, []);

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get("/api/posts");
        const blogs = res.data;

        const tagMap = new Map();
        blogs.forEach((blog) => {
          if (blog.tags.length !== 0) {
            for (let i = 0; i < blog.tags.length; i++) {
              if (!tagMap.has(blog.tags[i])) {
                tagMap.set(blog.tags[i], 1);
              } else {
                tagMap.set(blog.tags[i], tagMap.get(blog.tags[i]) + 1);
              }
            }
          }
        });

        const tagComponents = [];
        for (const [key, value] of tagMap) {
          tagComponents.push(
            <Tagg
              key={key}
              $count={value}
              onClick={() =>
                navigate(key, {
                  state: {
                    length: value,
                  },
                })
              }
            >
              <span>{key}</span>
            </Tagg>
          );
        }

        setTags(tagComponents);
      } catch (error) {
        console.error("태그 데이터를 불러오는 중 에러:", error);
      }
    };

    getTags();
  }, []);

  return (
    <TagContainer $isParams={!!params.id}>
      {!!params.id ? (
        <>
          <CurrentCategoryTitle>
            <p>
              {params.id}({location?.state?.length})
            </p>
          </CurrentCategoryTitle>
          <SearchInput placeHolder="어떤 포스트를 찾으시나요?" />
          <Outlet />
        </>
      ) : (
        <TagRow>
          <TagTxt>
            <span>Tags</span>
          </TagTxt>
          <TagBox>{tags}</TagBox>
        </TagRow>
      )}
    </TagContainer>
  );
}

const commonPaddingSize = "25px";

const TagContainer = styled.div<{ $isParams: boolean }>`
  width: 100%;
  height: 100%;
  min-height: 340px;
  display: flex;
  flex-direction: ${({ $isParams }) => $isParams && "column"};
  justify-content: ${({ $isParams }) => !$isParams && "center"};
`;

const TagRow = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 780px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const TagTxt = styled.div`
  width: 20%;

  & > span {
    color: ${(props) => props.theme.body.postTxt};
    font-size: 64px;
    font-weight: 600;
    padding-right: ${commonPaddingSize};
    border-right: 2px solid ${(props) => props.theme.body.postTxt};
    width: 100%;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: 780px) {
      border: none;
    }
  }
`;

const TagBox = styled.div`
  width: 60%;
  padding: ${commonPaddingSize};
  box-sizing: border-box;
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
`;

const Tagg = styled.div<{ $count: string }>`
  display: flex;
  gap: 10px;
  align-items: center;

  &::after {
    content: "(${(props) => props.$count})";
    color: ${(props) => props.theme.default};
    cursor: pointer;
  }

  & > span {
    cursor: pointer;
  }

  & > span:first-child {
    color: ${(props) => props.theme.body.tag};
    &:hover {
      color: ${(props) => props.theme.body.tagHover};
    }
  }
`;
