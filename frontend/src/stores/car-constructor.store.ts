import { create } from 'zustand';

export const ConstructoreStore = create((set) => ({
    constructor: {},
    setConstructor: (constructor) => set({ constructor }),
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    // updateBears: (newBears) => set({ bears: newBears }),
}));
