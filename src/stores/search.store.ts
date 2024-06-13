import { create } from "zustand";

interface State {
  search: string;
}

interface Action {
  setSearch: (s: string) => void;
  getSearch: () => string;
}

const initData: State = {
  search: "",
};

export const useSearchStore = create<State & Action>()((set, get) => ({
  ...initData,
  setSearch: (s: string) => set({ search: s }),
  getSearch: () => get().search,
}));
