import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { formatDate } from "utils/utils";

interface Props {
  img: string;
  title: string;
  details: string;
  tags?: any;
  createdDate: string;
  categoryId?: string;
  blogId?: string;
  postIdx?: number;
}

export default function BlogPost(props: Props) {
  const navigate = useNavigate();

  const handleBlogDetail = () => {
    navigate(`/blog/${props.blogId}`);
  };

  return (
    <BlogPostContainer>
      <BlogImg onClick={handleBlogDetail}>
        <img src={import.meta.env.VITE_API_SERVER + props.img} />
      </BlogImg>
      <BlogTxtCol>
        <p onClick={handleBlogDetail}>{props.title}</p>
        <TagRow>
          {props.tags?.map((tag, idx) => (
            <Tag onClick={() => navigate(`/tags/${tag}`)} key={idx}>
              {tag}
            </Tag>
          ))}
        </TagRow>
        <BlogDetail>{props.details.slice(0, 100) + "..."}</BlogDetail>
        <BlogDate>
          <span>{formatDate(props.createdDate)}</span>
        </BlogDate>
      </BlogTxtCol>
    </BlogPostContainer>
  );
}

const BlogPostContainer = styled.div`
  width: 100%;
  min-height: 160px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: inherit;
  &:hover {
    background-color: ${(props) => props.theme.body.bgHover};
  }
`;

const BlogImg = styled.div`
  width: 25%;
  height: 100%;
  cursor: pointer;
  & > img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const BlogTxtCol = styled.div`
  width: 68%;
  height: 100%;
  padding: 10px 0;
  display: flex;
  gap: 10px;
  flex-direction: column;

  & > p {
    color: ${(props) => props.theme.body.postTxt};
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.body.titleHover};
    }
  }
`;

const TagRow = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Tag = styled.span`
  color: ${(props) => props.theme.body.tag};
  &:hover {
    color: ${(props) => props.theme.body.tagHover};
  }
  cursor: pointer;
`;

const BlogDetail = styled.div`
  width: 100%;
  height: 55px;
  color: ${(props) => props.theme.body.postTxt};
`;

const BlogDate = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 5px;

  & > span {
    font-size: 14px;
    color: ${(props) => props.theme.body.subTxt};
  }
`;
