import { create } from 'zustand';

export type DialogStoreState = {
    open: boolean;
    setOpen: (open: boolean) => void;
};
export const DialogStore = create<DialogStoreState>((set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),
}));
