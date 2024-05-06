import { create } from 'zustand';

export type DialogStoreState = {
    open: boolean;
    setOpen: (open: boolean) => void;
};
export const DialogStore = create<DialogStoreState>((set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),
}));
export const ZeekrModalStore = create<DialogStoreState>((set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),
}));
export const OfferModalStore = create<DialogStoreState>((set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),
}));
