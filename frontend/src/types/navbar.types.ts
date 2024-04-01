export interface Link {
    id: number;
    name: string;
    href: string;
}

export interface ImageAttributes {
    url: string;
    width: number;
    height: number;
}

export interface ImageData {
    id: number;
    attributes: ImageAttributes;
}

export interface Logo {
    data: ImageData;
}

export interface Attributes {
    contact_number: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    logo: Logo;
    main_links: Link[];
    sub_links: Link[];
    social_links: Link[];
}

export interface DataItem {
    id: number;
    attributes: Attributes;
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

export interface NavbarResponse {
    data: DataItem[];
    meta?: Meta;
}
