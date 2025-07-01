import { create } from 'zustand';

type ModalStore = {
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isEditModalOpen: false,
  openEditModal: () => set({ isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false }),
}));
