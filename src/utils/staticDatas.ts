import codingTest from "&/imgs/coding.jpg";
import c1 from "&/imgs/posts/c1.jpg";
import js from "&/imgs/posts/js.jpg";

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
  {
    id: "project",
    name: "Project",
  },
  // {
  //   id: "about",
  //   name: "About",
  // },
];

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
];

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
    img: js,
    title: "자바스크립트 2 테스트 중입니다",
    tags: ["javascript"],
    subTitle: "테스트 중이라 아무거나 적엇습니다.",
    createdDate: "2024-06-12",
    categoryId: "js",
    id: "javascript-study2",
    postIndex: 2,
  },
];
