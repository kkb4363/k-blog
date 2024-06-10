import styled from "styled-components";

interface Props {
  title: string;
  info: string;
}

export default function TabInfoCol({ title, info }: Props) {
  return (
    <TabInfoColContainer>
      <p>{title}</p>
      <span>{info}</span>
    </TabInfoColContainer>
  );
}

const TabInfoColContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 30px;

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
