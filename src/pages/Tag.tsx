import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDisplayStore } from "stores/display.store";
import styled from "styled-components";
import { CurrentCategoryTitle } from "./Category";
import SearchInput from "components/SearchInput";
import { posts } from "utils/staticDatas";
import { useSearchStore } from "stores/search.store";

export default function Tag() {
  const { setHeaderTab, setTag, getTag } = useDisplayStore();
  const params = useParams();
  const navigate = useNavigate();
  const isParams = !!params.id;

  useEffect(() => {
    setHeaderTab("tags");
  }, []);

  useEffect(() => {
    const newTag = [];

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        const existingTag = newTag.find((p) => p.id === tag);
        if (!existingTag) {
          newTag.push({
            id: tag,
            title: tag,
            posts: [post],
          });
        } else {
          existingTag.posts.push(post);
        }
      });
    });

    setTag(newTag);
  }, []);

  return (
    <TagContainer $isParams={!!params.id}>
      {isParams ? (
        <>
          {" "}
          <CurrentCategoryTitle>
            <p>
              {params.id} (
              {getTag().find((t) => t.id === params.id).posts.length})
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
          <TagBox>
            {getTag().map((tag, idx) => (
              <Tagg
                key={idx}
                $count={tag.posts.length}
                onClick={() => navigate(tag.id)}
              >
                <span>{tag.title}</span>
              </Tagg>
            ))}
          </TagBox>
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
