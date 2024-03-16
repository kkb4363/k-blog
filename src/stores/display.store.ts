import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Tabs = "home" | "blog";
type Categories = "all" | "featured" | "fitness" | "diet" | "invest";

interface Post {
  title: string;
  text: string;
  name: string;
  date: string;
  category: string;
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
        const newPostList = { ...initData.postList, post };
        return set({ postList: newPostList });
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
