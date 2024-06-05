import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { HeaderTabs, Theme } from "./display";

interface State {
  theme: Theme;
  currentHeaderTab: HeaderTabs;
}

interface Action {
  setTheme: (t: Theme) => void;
  getTheme: () => Theme;
  setHeaderTab: (t: HeaderTabs) => void;
  getHeaderTab: () => HeaderTabs;
}

const initData: State = {
  theme: "light",
  currentHeaderTab: "home",
};

export const useDisplayStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      setTheme: (t: Theme) => set({ theme: t }),
      getTheme: () => get().theme,
      setHeaderTab: (t: HeaderTabs) => set({ currentHeaderTab: t }),
      getHeaderTab: () => get().currentHeaderTab,
    }),
    {
      name: "displayStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
