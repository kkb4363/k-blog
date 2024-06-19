import { create } from "zustand";

type ModalType = "Category" | "SelectCategory" | string;

interface State {
  openModal: ModalType;
}

interface Action {
  setOpenModal: (m: ModalType) => void;
  getOpenModal: () => ModalType;
  clear: () => void;
}

const initData: State = {
  openModal: "",
};

export const useModalStore = create<State & Action>()((set, get) => ({
  ...initData,
  setOpenModal: (m: ModalType) => set({ openModal: m }),
  getOpenModal: () => get().openModal,
  clear: () => set({ openModal: "" }),
}));
