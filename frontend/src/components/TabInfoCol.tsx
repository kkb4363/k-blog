import styled from "styled-components";

interface Props {
  title: string;
  info: string;
  btnTxt?: string;
  btnCallback?: () => void;
}

export default function TabInfoCol({
  title,
  info,
  btnTxt,
  btnCallback,
}: Props) {
  return (
    <TabInfoColContainer>
      <p>{title}</p>
      <span>{info}</span>
      <WriteBtn onClick={btnCallback}>
        <span>{btnTxt}</span>
      </WriteBtn>
    </TabInfoColContainer>
  );
}

const TabInfoColContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;

  padding: 70px 0 20px 0;

  @media screen and (max-width: 780px) {
    padding: 70px 10px 20px 10px;
  }

  & > p {
    color: ${(props) => props.theme.default};
    font-size: 46px;
    font-weight: 600;
  }

  & > span {
    color: ${(props) => props.theme.body.infoTxt};
    font-size: 18px;
  }
`;

const WriteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 100px;

  padding: 20px;
  border-radius: 8px;
  background-color: inherit;
  &:hover {
    background-color: ${(props) => props.theme.body.bgHover};
  }

  & > span {
    color: ${(props) => props.theme.default};
    font-size: 20px;
  }
`;
