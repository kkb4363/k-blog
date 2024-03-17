import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Tabs = "home" | "blog";
export type Categories = "all" | "featured" | "fitness" | "diet" | "invest";

export interface Post {
  title: string;
  detail: string;
  name: string;
  date: string;
  category: Categories;
}

interface DisplayState {
  selectedTab: Tabs;
  headerState: boolean;
  currentPostCategory: Categories;
  postList: Post[];
}

interface Action {
  setSelectedTab: (tab: Tabs) => void;
  getSelectedTab: () => any;
  setHeaderState: (state: boolean) => void;
  getHeaderState: () => any;
  setPostCategory: (category: Categories) => void;
  getPostCategory: () => any;
  setPostList: (post: Post) => void;
  getPostList: () => any;
}

const initData: DisplayState = {
  selectedTab: "home",
  headerState: true,
  currentPostCategory: "all",
  postList: [],
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
      setPostList: (post: Post) => {
        const prev = get().postList;
        prev.push(post);
        return set({ postList: prev });
      },
      getPostList: () => {
        return get().postList;
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
