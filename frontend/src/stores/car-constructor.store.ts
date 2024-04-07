import { create } from 'zustand';

export const ConstructorStore = create((set) => ({
    constructor: {
        configuration: '',
        body: 'black',
        wheels: 'default',
        defaultRenderImage: '',
        renderImage: '',
        defaultPrice: 0,
        price: 0,
    },
    setConstructor: (data: any) =>
        set((state: any) => ({
            constructor: { ...state.constructor, ...data },
        })),
    resetConstructor: () =>
        set((state: any) => ({
            constructor: { defaultRenderImage: '', renderImage: '' },
        })),
}));
