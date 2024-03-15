import styled from "styled-components";

const Body = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
  overflow: auto;
  padding-bottom: 20px;

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default function Blog() {
  return <Body>Blog</Body>;
}
