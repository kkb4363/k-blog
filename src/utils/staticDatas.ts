import codingTest from "&/imgs/coding.jpg";
import c1 from "&/imgs/posts/c1.jpg";
import js from "&/imgs/posts/js.jpg";
import pr from "&/imgs/posts/pr.jpg";
import air from "&/imgs/posts/air.jpg";
import gabook from "&/imgs/posts/ga.jpg";

export const headerTabs = [
  {
    id: "blog",
    name: "Blog",
  },
  {
    id: "tags",
    name: "Tags",
  },
  {
    id: "category",
    name: "Category",
  },
  // {
  //   id: "comment",
  //   name: "Comment",
  // },
  // {
  //   id: "writePost",
  //   name: "writePost",
  // },
  // {
  //   id: "project",
  //   name: "Project",
  // },
  // {
  //   id: "about",
  //   name: "About",
  // },
];

// 카테고리
export const categories = [
  {
    img: codingTest,
    title: "Coding Test(BackJoon)",
    posts: [],
    updatedDate: "2024-01-29",
    id: "coding",
  },
  {
    img: js,
    title: "JavaScript",
    posts: [],
    updatedDate: "2024-06-12",
    id: "js",
  },
  {
    img: pr,
    title: "Project",
    posts: [],
    updatedDate: "2024-06-13",
    id: "project",
  },
];

// 블로그 포스트
export const posts = [
  {
    img: c1,
    title: "대충 만든 자판",
    tags: ["javascript", "프로그래머스 level 1"],
    subTitle: "프로그래머스 코딩테스트 level 1 - 대충만든자판 문제 후기입니다.",
    createdDate: "2024-01-16",
    categoryId: "coding",
    id: "roughly-made-keyboard",
    postIndex: 1,
  },
  {
    img: js,
    title: "자바스크립트 정리",
    tags: ["javascript"],
    subTitle: "몰랐던 내용 및 복습 겸 정리한 내용입니다.",
    createdDate: "2024-06-12",
    categoryId: "js",
    id: "javascript-study",
    postIndex: 1,
  },
  {
    img: gabook,
    title: "간단하게 사용하는 가게부",
    tags: ["project", "가게부"],
    subTitle:
      "간단하게 쓰기 위해 가게부를 만든 프로젝트 입니다. 2023년 11월 30일 기준",
    createdDate: "2024-06-13",
    categoryId: "project",
    id: "간단하게 사용하는 가게부",
    postIndex: 1,
  },
  {
    img: air,
    title: "에어비엔비 클론",
    tags: ["project", "에어비엔비 클론"],
    subTitle: "에어비엔나 프로젝트입니다. (백엔드 1명, 프론트엔드 1명)",
    createdDate: "2024-06-13",
    categoryId: "project",
    id: "에어비엔비 클론",
    postIndex: 2,
  },
];
