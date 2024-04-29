import { ImageData } from '@/types/brands.types';

interface TextChild {
    type: string;
    text: string;
    bold?: boolean;
}

interface Paragraph {
    type: string;
    children: TextChild[];
}

interface SpecificationItem {
    id: number;
    name: string;
}

interface SpecificationCategory {
    id: number;
    name: string;
    items: SpecificationItem[];
}

// Main attributes structure for a car entity
export type CarAttributes = {
    name: string;
    engine_type: string;
    price_byn: string;
    price_usd: string;
    gearbox: string;
    lising: string;
    short_specification: Paragraph[];
    engine: string;
    preview_image: {
        data: ImageData;
    };
    full_description: Paragraph[];
    publish_date: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    slug: string;
    privod: string;
    body: string;
    specification: SpecificationCategory[];
};

// Root interface for a single car entity
export type CarEntity = {
    id: number;
    attributes: CarAttributes;
};

// Top level structure to be used when decoding the JSON response
export type CarsInStockBackendResponse = {
    data: CarEntity[];
};
