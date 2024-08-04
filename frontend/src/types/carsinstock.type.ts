import type { ImageData } from '@/types/brands.types';

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
    price: string;
    generation: string;
    gearbox: 'автомат' | 'механика';
    lising: string;
    short_specification: Paragraph[];
    preview_image: {
        data: ImageData;
    };
    full_description: Paragraph[];
    publish_date: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    slug: string;
    specification: SpecificationCategory[];
    battery_capacity: number;
    vehicle_range: number;
    body: 'лифтбек' | 'кроссовер' | 'минивэн' | 'седан';
    engine: number;
    engine_type:
        | 'Электро'
        | 'Гибрид(последовательный)'
        | 'Гибрид(параллельный)'
        | 'Бензин';
    privod: 'передний' | 'задний' | 'полный';
    hourse_power: number;
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
