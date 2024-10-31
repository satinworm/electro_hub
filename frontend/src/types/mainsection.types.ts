export interface ImageData {
    id: number;
    attributes: {
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail?: ImageFormat;
            large?: ImageFormat;
            medium?: ImageFormat;
            small?: ImageFormat;
        } | null;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any | null;
        createdAt: string;
        updatedAt: string;
    };
}

export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}
export interface Item {
    id: number;
    name: string;
    engine: string;
    driving_range: string;
    acceleration: string;
    weight: string;
    starting_price: string;
	 slug?: string;
    logo: {
        data: ImageData;
    };
    main_image: {
        data: ImageData;
    };
}

export interface MainSectionSliderTypes {
    component: string;
    items: Item[];
}
