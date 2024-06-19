import codingTest from "&/imgs/coding.jpg";
import c1 from "&/imgs/posts/c1.jpg";
import js from "&/imgs/posts/js.jpg";
import pr from "&/imgs/posts/pr.jpg";
import air from "&/imgs/posts/air.jpg";
import hc from "&/imgs/posts/hc.jpg";
import gabook from "&/imgs/posts/ga.jpg";
import flutter from "&/imgs/posts/flutter.jpg";

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
    title: "코딩테스트(프로그래머스)",
    posts: [],
    updatedDate: "2024-06-14",
    id: "coding",
  },
  {
    img: js,
    title: "자바스크립트",
    posts: [],
    updatedDate: "2024-06-12",
    id: "js",
  },
  {
    img: hc,
    title: "HTML&CSS",
    posts: [],
    updatedDate: "2024-06-14",
    id: "html-css",
  },
  {
    img: flutter,
    title: "Flutter",
    posts: [],
    updatedDate: "2024-06-14",
    id: "flutter",
  },
  {
    img: pr,
    title: "프로젝트",
    posts: [],
    updatedDate: "2024-06-13",
    id: "project",
  },
];

// 블로그 포스트
export const posts = [
  // coding-test
  {
    img: c1,
    title: "기능개발",
    tags: ["javascript", "프로그래머스 level 2", "스택", "큐"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:스택/큐",
    createdDate: "2024-06-13",
    categoryId: "coding",
    id: "기능개발",
    postIndex: 1,
  },
  {
    img: c1,
    title: "올바른 괄호",
    tags: ["javascript", "프로그래머스 level 2", "스택", "큐"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:스택/큐",
    createdDate: "2024-06-13",
    categoryId: "coding",
    id: "올바른괄호",
    postIndex: 2,
  },
  {
    img: c1,
    title: "프로세스",
    tags: ["javascript", "프로그래머스 level 2", "스택", "큐"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:스택/큐",
    createdDate: "2024-06-13",
    categoryId: "coding",
    id: "프로세스",
    postIndex: 3,
  },
  {
    img: c1,
    title: "다리를지나는트럭",
    tags: ["javascript", "프로그래머스 level 2", "스택", "큐"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:스택/큐",
    createdDate: "2024-06-13",
    categoryId: "coding",
    id: "다리를지나는트럭",
    postIndex: 4,
  },
  {
    img: c1,
    title: "폰켓몬",
    tags: ["javascript", "프로그래머스 level 2", "해시"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:해시",
    createdDate: "2024-06-14",
    categoryId: "coding",
    id: "폰켓몬",
    postIndex: 5,
  },
  {
    img: c1,
    title: "완주하지못한선수",
    tags: ["javascript", "프로그래머스 level 2", "해시"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:해시",
    createdDate: "2024-06-14",
    categoryId: "coding",
    id: "완주하지못한선수",
    postIndex: 6,
  },
  {
    img: c1,
    title: "전화번호목록",
    tags: ["javascript", "프로그래머스 level 2", "해시"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:해시",
    createdDate: "2024-06-14",
    categoryId: "coding",
    id: "전화번호목록",
    postIndex: 7,
  },
  {
    img: c1,
    title: "의상",
    tags: ["javascript", "프로그래머스 level 2", "해시"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:해시",
    createdDate: "2024-06-14",
    categoryId: "coding",
    id: "의상",
    postIndex: 8,
  },
  {
    img: c1,
    title: "베스트앨범",
    tags: ["javascript", "프로그래머스 level 3", "해시"],
    subTitle: "프로그래머스 코딩테스트 연습 - 문제 유형:해시",
    createdDate: "2024-06-17",
    categoryId: "coding",
    id: "베스트앨범",
    postIndex: 9,
  },

  // js
  {
    img: js,
    title: "자바스크립트",
    tags: ["javascript"],
    subTitle: "몰랐던 내용 및 복습 겸 정리한 내용입니다.",
    createdDate: "2024-06-14",
    categoryId: "js",
    id: "javascript-study",
    postIndex: 1,
  },

  // html , css
  {
    img: js,
    title: "HTML&CSS",
    tags: ["HTML", "CSS"],
    subTitle: "몰랐던 내용 및 복습 겸 정리한 내용입니다.",
    createdDate: "2024-06-14",
    categoryId: "html-css",
    id: "html-css",
    postIndex: 1,
  },

  // flutter
  {
    img: flutter,
    title: "Flutter",
    tags: ["flutter"],
    subTitle: "몰랐던 내용 및 복습 겸 정리한 내용입니다.",
    createdDate: "2024-06-14",
    categoryId: "flutter",
    id: "flutter",
    postIndex: 1,
  },

  // project
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