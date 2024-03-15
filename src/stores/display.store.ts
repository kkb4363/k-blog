import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Tabs = "home" | "blog";

interface DisplayState {
  selectedTab: Tabs;
  headerState: boolean;
}

interface Action {
  setSelectedTab: (tab: Tabs) => void;
  getSelectedTab: () => any;
  setHeaderState: (state: boolean) => void;
  getHeaderState: () => any;
}

const initData: DisplayState = {
  selectedTab: "home",
  headerState: true,
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
