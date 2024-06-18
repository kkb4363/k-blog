import { create } from "zustand";

type ModalType = "Category" | string;

interface State {
  openModal: ModalType;
}

interface Action {
  setOpenModal: (m: ModalType) => void;
  getOpenModal: () => ModalType;
}

const initData: State = {
  openModal: "",
};

export const useModalStore = create<State & Action>()((set, get) => ({
  ...initData,
  setOpenModal: (m: ModalType) => set({ openModal: m }),
  getOpenModal: () => get().openModal,
}));
