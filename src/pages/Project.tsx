import TabInfoCol from "components/TabInfoCol";
import styled from "styled-components";
import testImg from "&/imgs/logo.png";

export default function Project() {
  return (
    <>
      <TabInfoCol title="Projects" info="프로젝트 기록들 입니다." />
      <ProjectGrid>
        <ProjectBox>
          <img src={testImg} alt="test" />
          <ProjectTxtCol>
            <p>98_gb Blo_gb Blo_gb Blo_gb Blo_gb Blo_gb Blog</p>
            <TxtInfo>
              테스트중입니다 프로젝트기록한 내용아무거나프로젝트기록한
              내용아무거나프로젝트기록한 내용아무거나
            </TxtInfo>
            <span>보러가기 →</span>
          </ProjectTxtCol>
        </ProjectBox>
        <ProjectBox>
          <img src={testImg} alt="test" />
          <ProjectTxtCol>
            <p>98_gb Blo_gb Blo_gb Blo_gb Blo_gb Blo_gb Blog</p>
            <TxtInfo>
              테스트중입니다 프로젝트기록한 내용아무거나프로젝트기록한
              내용아무거나프로젝트기록한 내용아무거나
            </TxtInfo>
            <span>보러가기 →</span>
          </ProjectTxtCol>
        </ProjectBox>
        <ProjectBox>
          <img src={testImg} alt="test" />
          <ProjectTxtCol>
            <p>98_gb Blo_gb Blo_gb Blo_gb Blo_gb Blo_gb Blog</p>
            <TxtInfo>
              테스트중입니다 프로젝트기록한 내용아무거나프로젝트기록한
              내용아무거나프로젝트기록한 내용아무거나
            </TxtInfo>
            <span>보러가기 →</span>
          </ProjectTxtCol>
        </ProjectBox>
        <ProjectBox>
          <img src={testImg} alt="test" />
          <ProjectTxtCol>
            <p>98_gb Blo_gb Blo_gb Blo_gb Blo_gb Blo_gb Blog</p>
            <TxtInfo>
              테스트중입니다 프로젝트기록한 내용아무거나프로젝트기록한
              내용아무거나프로젝트기록한 내용아무거나
            </TxtInfo>
            <span>보러가기 →</span>
          </ProjectTxtCol>
        </ProjectBox>
        <ProjectBox>
          <img src={testImg} alt="test" />
          <ProjectTxtCol>
            <p>98_gb Blo_gb Blo_gb Blo_gb Blo_gb Blo_gb Blog</p>
            <TxtInfo>
              테스트중입니다 프로젝트기록한 내용아무거나프로젝트기록한
              내용아무거나프로젝트기록한 내용아무거나
            </TxtInfo>
            <span>보러가기 →</span>
          </ProjectTxtCol>
        </ProjectBox>
      </ProjectGrid>
    </>
  );
}

const ProjectGrid = styled.div`
  border-top: 1px solid ${(props) => props.theme.category.borderTop};
  border-bottom: 2px solid ${(props) => props.theme.category.borderTop};
  padding: 50px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media screen and (max-width: 864px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (max-width: 780px) {
    padding: 50px 10px;
  }
`;

const ProjectBox = styled.div`
  border: 2px solid ${(props) => props.theme.category.border};
  transition: transform 0.1s;
  min-height: 400px;
  min-width: 330px;
  border-radius: 15px;

  & > img {
    width: 100%;
    height: 50%;
    object-fit: contain;
    aspect-ratio: 16/9;
  }
`;

const ProjectTxtCol = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 0 20px;

  & > p {
    cursor: pointer;
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.default};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > span:last-child {
    color: ${(props) => props.theme.body.tag};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.body.tagHover};
    }
  }
`;

const TxtInfo = styled.span`
  color: ${(props) => props.theme.body.infoTxt};
  line-height: 1.5;
`;
