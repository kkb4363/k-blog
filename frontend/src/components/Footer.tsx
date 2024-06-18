import styled from "styled-components";
import instaIcon from "&/imgs/insta.png";
import gitIcon from "&/imgs/github.png";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterTxt>
        <span>98_gb의 블로그</span>
      </FooterTxt>
      <FooterImg>
        <a target="_blank" href="https://www.instagram.com/98_gibeom/">
          <img src={instaIcon} alt="insta" />
        </a>
        <a target="_blank" href="https://github.com/kkb4363">
          <img src={gitIcon} alt="github" />
        </a>
      </FooterImg>
      <CopyTxt>
        <span>© 2024 &nbsp;&nbsp;•&nbsp;&nbsp; 98_gb</span>
      </CopyTxt>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  width: 100%;
  height: 200px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const FooterImg = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  img {
    width: 20px;
    height: 20px;
  }
`;

const FooterTxt = styled.div`
  & > span {
    color: #a3a3a3;
    font-size: 20px;
  }
`;

const CopyTxt = styled.div`
  & > span {
    color: #a3a3a3;
    font-size: 14px;
  }
`;
