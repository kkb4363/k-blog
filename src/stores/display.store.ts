import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { HeaderTabs, Theme } from "./display";

interface State {
  theme: Theme;
  currentHeaderTab: HeaderTabs;
  category: any;
  tag: any;
  currentPostIdx: number;
}

interface Action {
  setTheme: (t: Theme) => void;
  getTheme: () => Theme;
  setHeaderTab: (t: HeaderTabs) => void;
  getHeaderTab: () => HeaderTabs;
  setCategory: (d: any) => void;
  getCategory: () => any;
  setCurrentPostIdx: (n: number) => void;
  getCurrentPostIdx: () => number;
  setTag: (t: any) => void;
  getTag: () => any;
}

const initData: State = {
  theme: "light",
  currentHeaderTab: "home",
  category: [],
  tag: [],
  currentPostIdx: 1,
};

export const useDisplayStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      setTheme: (t: Theme) => set({ theme: t }),
      getTheme: () => get().theme,
      setHeaderTab: (t: HeaderTabs) => set({ currentHeaderTab: t }),
      getHeaderTab: () => get().currentHeaderTab,
      setCategory: (d: any) => set({ category: d }),
      getCategory: () => get().category,
      setCurrentPostIdx: (n: number) => set({ currentPostIdx: n }),
      getCurrentPostIdx: () => get().currentPostIdx,
      setTag: (t: any) => set({ tag: t }),
      getTag: () => get().tag,
    }),
    {
      name: "displayStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
