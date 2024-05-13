import { create } from 'zustand';

// В файле `frontend/src/types/zeekr-constructor.ts`
export type CarConstructorResponse = {
    data: Array<{
        attributes: {
            models: Array<Model>;
        };
    }>;
};

export type Model = {
    name: string;
    default_image: ImageData | '';
    render_images: RenderImages;
    body_colors: Array<Color>;
};

export type ImageData = {
    data?: {
        attributes: {
            url: string;
            width: number;
            height: number;
        };
    };
};

export type RenderImages = {
    data: Array<{
        attributes: {
            name: string;
            url: string;
        };
    }>;
};

export type Color = {
    render_url: string;
    incremental_price: number;
    additional_description: string;
};
export type ConstructorObjectState = {
    configuration: string;
    body: string;
    wheels: string;
    defaultRenderImage: {
        url: string;
        width: number;
        height: number;
    };
    interior_colors: string;
    renderImage: string;
    defaultPrice: number;
    price: any;
};
type OfferItem = { name: string; price: number };
export type OfferType = {
    model: OfferItem;
    body: OfferItem;
    wheels: OfferItem;
    interior_colors: OfferItem;
    additional_otions: any;
};
// В файле `frontend/src/stores/car-constructor.store.ts`
export type ConstructorStoreState = {
    constructor: ConstructorObjectState;
    setConstructor: (
        data: Partial<ConstructorStoreState['constructor']>
    ) => void;
    resetConstructor: () => void;
    updatePrice: (price: ConstructorStoreState['constructor']['price']) => void;
    calculateTotalPrice: (state: ConstructorObjectState) => number;
    offer: any;
    updateOffer: any;
};
export type SelectedViewConstructoreStoreTypes = {
    selectedView: 'body' | 'interior' | 'virtual_view';
    setSelectedView: (selectedView: 'body' | 'interior') => void;
};

export const ConstructorStore = create<ConstructorStoreState>((set) => ({
    offer: {
        model: { name: '', price: 0 },
        body: { name: '', price: 0 },
        wheels: { name: '', price: 0 },
        interior_colors: { name: '', price: 0 },
        additional_otions: {},
    },
    //@ts-ignore
    updateOffer: (offer: any) => set({ offer }),
    constructor: {
        configuration: '',
        body: 'black',
        wheels: 'default',
        interior_colors: 'black',
        defaultRenderImage: {
            url: '',
            width: 0,
            height: 0,
        },
        renderImage: '',
        defaultPrice: 0,
        price: {
            body: 0,
            wheels: 0,
        },
    },
    setConstructor: (data) =>
        set((state) => ({
            constructor: { ...state.constructor, ...data },
        })),
    resetConstructor: () =>
        set(() => ({
            constructor: {
                configuration: '',
                body: 'black',
                wheels: 'default',
                interior_colors: 'black',
                defaultPrice: 0,
                defaultRenderImage: {
                    url: '',
                    width: 0,
                    height: 0,
                },
                renderImage: '',
                price: {},
            },
        })),
    updatePrice: (price) =>
        set((state) => ({
            constructor: {
                ...state.constructor,
                price: { ...state.constructor.price, ...price },
            },
        })),
    calculateTotalPrice: (state: ConstructorObjectState) => {
        const priceSum = (Object.values(state.price) as number[]).reduce(
            (a: number, b: number) => a + b,
            0
        );
        return state.defaultPrice + priceSum;
    },
}));
export const SelectedViewConstructoreStore =
    create<SelectedViewConstructoreStoreTypes>((set) => ({
        selectedView: 'body',
        setSelectedView: (selectedView) => set({ selectedView }),
    }));
