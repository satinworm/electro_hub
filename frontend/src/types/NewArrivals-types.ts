// Описание основных атрибутов автомобиля
type CarAttributes = {
    name: string;
    year: string;
    description: string;
    mileage: number;
    price_byn: number;
    price_usd: number;
    createdAt: string;
    updatedAt: string;
    locale: string;
    color: string;
    slug: string;
    new_arrival: boolean;
    bg_gradient: string;
    sale_type: SaleType;
    brand: Brand;
    image: Image;
    localizations: Localizations;
};

// Тип для объекта "sale_type"
type SaleType = {
    id: number;
    type: string | null;
};

// Тип для объекта "brand"
type Brand = {
    data: {
        id: number;
        attributes: {
            name: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            new_arrival: boolean | null;
        };
    };
};

// Тип для объекта "image"
type Image = {
    data: {
        id: number;
        attributes: ImageAttributes;
    };
};

type ImageAttributes = {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail: Thumbnail;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
};

type Thumbnail = {
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
};

// Тип для объекта "localizations"
type Localizations = {
    data: Array<{
        id: number;
        attributes: CarAttributes;
    }>;
};

// Общий тип для каждого элемента массива "data"
export type Car = {
    id: number;
    attributes: CarAttributes;
};

// Тип для ответа с бекенда

export type NewArrivalResponse = {
    // newArrivals: {
    data: Car[];
    // }; // Используйте здесь соответствующий тип данных
};
