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
    defaultRenderImage: ImageData | '';
    renderImage: string;
    defaultPrice: number;
    price: any;
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
};
export const ConstructorStore = create<ConstructorStoreState>((set) => ({
    constructor: {
        configuration: '',
        body: 'black',
        wheels: 'default',
        defaultRenderImage: '',
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
                defaultPrice: 0,
                defaultRenderImage: '',
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
        // const currentState
        const priceSum = (Object.values(state.price) as number[]).reduce(
            (a: number, b: number) => a + b,
            0
        );
        return state.defaultPrice + priceSum;
    },
}));
