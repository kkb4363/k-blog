import styled, { ThemeContext } from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useContext, useState } from "react";

export default function WritePost() {
  const theme = useContext(ThemeContext);
  const [txt, setTxt] = useState("");

  const download = () => {
    const blob = new Blob([txt], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <WritePostContainer data-color-mode={theme.currentTheme}>
      <MDEditor height={800} value={txt} onChange={(val) => setTxt(val)} />
      <SubmitBtnBox>
        <button onClick={download}>저장</button>
      </SubmitBtnBox>
    </WritePostContainer>
  );
}

const WritePostContainer = styled.div`
  padding: 50px 0;
`;

const SubmitBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  & > button {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.blog.submitBtnBg};
    color: ${(props) => props.theme.blog.submitBtn};

    &:hover {
      background-color: ${(props) => props.theme.blog.submitBtnHover};
    }
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
  }
`;
