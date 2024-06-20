import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  id: number;
  name: string;
  imgSrc: string;
}

interface Action {
  setUser: (id: number, name: string, imgSrc: string) => void;
  getUser: () => any;
  clear: () => void;
}

const initData: State = {
  id: null,
  name: "",
  imgSrc: "",
};

export const useUserStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initData,
      setUser: (id: number, name: string, imgSrc: string) =>
        set({ id: id, name: name, imgSrc: imgSrc }),
      getUser: () => get(),
      clear: () => set(initData),
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
