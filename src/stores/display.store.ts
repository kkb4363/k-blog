import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Tabs = "home" | "blog";
type Categories = "all" | "featured" | "fitness" | "diet" | "invest";

interface DisplayState {
  selectedTab: Tabs;
  headerState: boolean;
  currentPostCategory: Categories;
}

interface Action {
  setSelectedTab: (tab: Tabs) => void;
  getSelectedTab: () => any;
  setHeaderState: (state: boolean) => void;
  getHeaderState: () => any;
  setPostCategory: (category: Categories) => void;
  getPostCategory: () => any;
}

const initData: DisplayState = {
  selectedTab: "home",
  headerState: true,
  currentPostCategory: "all",
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
