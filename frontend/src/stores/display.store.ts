import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { HeaderTabs, Theme } from "./display";

interface State {
  theme: Theme;
  currentHeaderTab: HeaderTabs;
  tag: any;
}

interface Action {
  setTheme: (t: Theme) => void;
  getTheme: () => Theme;
  setHeaderTab: (t: HeaderTabs) => void;
  getHeaderTab: () => HeaderTabs;
  setTag: (t: any) => void;
  getTag: () => any;
}

const initData: State = {
  theme: "light",
  currentHeaderTab: "home",
  tag: [],
};

export const useDisplayStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      setTheme: (t: Theme) => set({ theme: t }),
      getTheme: () => get().theme,
      setHeaderTab: (t: HeaderTabs) => set({ currentHeaderTab: t }),
      getHeaderTab: () => get().currentHeaderTab,
      setTag: (t: any) => set({ tag: t }),
      getTag: () => get().tag,
    }),
    {
      name: "displayStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
