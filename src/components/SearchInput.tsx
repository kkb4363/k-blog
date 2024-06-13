import styled from "styled-components";
import searchIcon from "&/imgs/search.svg";
import { useSearchStore } from "stores/search.store";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  placeHolder: string;
}

export default function SearchInput(props: Props) {
  const searchStore = useSearchStore();
  const [tmpQuery, setTmpQuery] = useState(searchStore.getSearch());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTmpQuery(e.target.value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      return searchStore.setSearch(tmpQuery);
    }, 200);
    return () => clearTimeout(debounce);
  }, [tmpQuery]);

  return (
    <SearchInputContainer>
      <div>
        <input
          placeholder={props.placeHolder}
          value={tmpQuery}
          onChange={handleChange}
        />
        <img src={searchIcon} alt="search" />
      </div>
    </SearchInputContainer>
  );
}

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 80px;

  @media screen and (max-width: 780px) {
    padding: 0 10px;
  }

  & > div {
    width: 512px;
    height: 40px;
    border-radius: 5px;
    position: relative;

    @media screen and (max-width: 530px) {
      width: 100%;
    }

    & > img {
      position: absolute;
      width: 20px;
      height: 20px;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    & > input {
      background-color: ${(props) => props.theme.blog.bg};
      color: ${(props) => props.theme.blog.inputTxt};
      border: 1px solid ${(props) => props.theme.blog.border};
      border-radius: inherit;
      padding-left: 15px;
      font-size: 16px;
      width: 100%;
      height: 100%;
      &::placeholder {
        color: gray;
        font-size: 16px;
      }
    }
  }
`;
