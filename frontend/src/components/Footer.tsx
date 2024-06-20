import styled from "styled-components";
import instaIcon from "&/imgs/insta.png";
import gitIcon from "&/imgs/github.png";
import kakaoIcon from "&/imgs/kakao_login_medium.png";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "utils/axios";
import { useUserStore } from "stores/user.store";
import { getCookie, setCookie } from "utils/cookie";

export default function Footer() {
  const params = useLocation();
  const urlParams = new URLSearchParams(params.search);
  // const redirectUrl = "http://localhost:5173/";
  const redirectUrl = "https://k-blog-snowy.vercel.app/";
  const { setUser, getUser, clear } = useUserStore();

  useEffect(() => {
    if (urlParams.get("code")) {
      const code = urlParams.get("code");
      axiosInstance
        .post("https://kauth.kakao.com/oauth/token", null, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params: {
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_KAKAO_KEY,
            redirect_uri: redirectUrl,
            code: code,
          },
        })
        .then((res) => {
          const aceessToken = res.data.access_token;
          setCookie("accessToken", aceessToken);

          axiosInstance
            .get("https://kapi.kakao.com/v2/user/me", {
              headers: {
                Authorization: `Bearer ${aceessToken}`,
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            })
            .then((res) => {
              setUser(
                res.data.id,
                res.data.properties.nickname,
                res.data.properties.profile_image
              );
            });
        });
    }
  }, [urlParams]);

  const logout = () => {
    axiosInstance
      .post("https://kapi.kakao.com/v1/user/logout", null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCookie("accessToken", "");
          clear();
        }
      });
  };

  return (
    <FooterContainer>
      <KakaoLoginBtn>
        {getUser().id ? (
          <button onClick={logout}>
            <div>로그아웃</div>
          </button>
        ) : (
          <a
            href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
              import.meta.env.VITE_KAKAO_KEY
            }&redirect_uri=${redirectUrl}`}
          >
            <img src={kakaoIcon} alt="kakao-login" />
          </a>
        )}
      </KakaoLoginBtn>
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
  position: relative;
`;

const KakaoLoginBtn = styled.div`
  position: absolute;
  right: 0;

  & > button {
    & > div {
      padding: 15px;
      color: #191919;
      background-color: #fee500;
      border-radius: 5px;
      cursor: pointer;
    }
  }
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
