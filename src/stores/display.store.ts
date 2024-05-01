import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Tabs = "home" | "blog";
export type Categories = "all" | "featured" | "fitness" | "diet" | "invest";
// number로 타입 바꾸기
export interface Post {
  title: string;
  detail: string;
  name: string;
  date: string;
  id: any;
}

interface DisplayState {
  selectedTab: Tabs;
  headerState: boolean;
  currentPostCategory: Categories;
  postList: any[];
}

interface Action {
  setSelectedTab: (tab: Tabs) => void;
  getSelectedTab: () => any;
  setHeaderState: (state: boolean) => void;
  getHeaderState: () => any;
  setPostCategory: (category: Categories) => void;
  getPostCategory: () => any;
  setPostList: (post: Post, category: string) => void;
  getPostList: () => any;
  deletePostList: (id: any) => void;
}

const initData: DisplayState = {
  selectedTab: "home",
  headerState: true,
  currentPostCategory: "all",
  postList: [
    {
      name: "featured",
      child: [],
    },
    {
      name: "fitness",
      child: [],
    },
    {
      name: "diet",
      child: [],
    },
    {
      name: "invest",
      child: [],
    },
  ],
};

export const useDisplayStore = create<DisplayState & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      setSelectedTab: (tab: Tabs) => {
        return set({ selectedTab: tab });
      },
      getSelectedTab: () => {
        return get().selectedTab;
      },
      setHeaderState: (state: boolean) => {
        return set({ headerState: state });
      },
      getHeaderState: () => {
        return get().headerState;
      },
      setPostCategory: (category: Categories) => {
        return set({ currentPostCategory: category });
      },
      getPostCategory: () => {
        return get().currentPostCategory;
      },
      setPostList: (post: Post, category: string) => {
        const prev = get().postList;
        const updatedPostList = prev.map((item) => {
          if (item.name === category) {
            return {
              ...item,
              child: [...item.child, post],
            };
          }
          return item;
        });
        return set({ postList: updatedPostList });
      },
      getPostList: () => {
        return get().postList;
      },
      deletePostList: (id: any) => {
        const prev = get().postList;
        const deletedPostList = prev.map((item) => {
          return {
            ...item,
            child: item.child.filter((c: any) => c.id !== id),
          };
        });
        return set({ postList: deletedPostList });
      },
      clear: () => {
        return set({ ...initData });
      },
    }),
    {
      name: "displayStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
