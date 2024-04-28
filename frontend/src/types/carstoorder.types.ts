import { ImageFormat } from '@/types/mainsection.types';

export type CarsToOrderItem = {
    id: number;
    attributes: Attributes;
};

interface Attributes {
    name: string;
    battery: string;
    acceleration: string;
    driving_range: string;
    privod: string;
    starting_price: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    image: ImageContainer;
    localizations: Localizations;
}
export interface ImageContainer {
    data: ImageData[];
}

export interface ImageData {
    id: number;
    attributes: ImageAttributes;
}

export interface ImageAttributes {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any | null; // Replace `any` with a more specific type if possible
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null; // Replace `any` with a more specific type if possible
    createdAt: string;
    updatedAt: string;
}
interface Localizations {
    data: any[];
}
