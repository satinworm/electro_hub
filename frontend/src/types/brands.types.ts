export interface ImageAttributes {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any | null;
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
}

export interface ImageData {
    id: number;
    attributes: ImageAttributes;
}

export interface ModelAttributes {
    name: string;
    year: string;
    description: string;
    mileage: string;
    price_byn: number;
    price_usd: number;
    createdAt: string;
    updatedAt: string;
    locale: string;
    color: string;
    slug: string;
    new_arrival: boolean | null;
    bg_gradient: string;
}

export interface ModelData {
    id: number;
    attributes: ModelAttributes;
}

export interface BrandAttributes {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    new_arrival: boolean | null;
    logo?: {
        data: ImageData;
    };
    image?: {
        data: ImageData;
    };
    models?: {
        data: ModelData[];
    };
}

export interface BrandData {
    id: number;
    attributes: BrandAttributes;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface Meta {
    pagination: Pagination;
}

export interface BrandsResponse {
    data: BrandData[];
    meta: Meta;
}
