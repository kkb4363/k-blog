import styled from "styled-components";

import HomeLayout from "components/HomeLayout";

export default function ErrorPage() {
  return (
    <HomeLayout>
      <ErrorContainer>
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다 😢</p>
        <span>주소를 잘못 입력하셨거나 다른 주소로 옮겨진 페이지입니다</span>
      </ErrorContainer>
    </HomeLayout>
  );
}

const ErrorContainer = styled.div`
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  & > h1 {
    font-size: 180px;
    color: ${({ theme }) => theme.body.bgHover};
    letter-spacing: 20px;
    line-height: 1.2;
  }

  & > p {
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.default};
  }

  & > span {
    font-size: 20px;
    color: ${({ theme }) => theme.body.infoTxt};
  }
`;
