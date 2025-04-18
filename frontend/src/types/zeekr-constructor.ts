export interface CarConstructorResponse {
	data: CarConstructor[];
	meta?: Meta;
}

interface CarConstructor {
	id: number;
	attributes: CarAttributes;
}

interface CarAttributes {
	brand: string;
	createdAt: string;
	updatedAt: string;
	locale: string;
	logo: Logo;
	price: any;
	models: Model[];
}

interface Logo {
	data: ImageData;
}

interface ImageData {
	id: number;
	attributes: ImageAttributes;
}

interface ImageAttributes {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: ImageFormats | null;
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

interface ImageFormats {
	thumbnail: ImageDetails;
	small: ImageDetails;
	medium: ImageDetails;
	large: ImageDetails;
}

interface ImageDetails {
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

export interface Model {
	id: number;
	name: string;
	default_price: number;
	render_images: RenderImages;
	default_image: {
		data: ImageData;
	};
	body_colors: BodyColor[];
	wheels: Wheel[];
	tyres: Tyre[];
	interior_colors: InteriorColor[];
	additional_options: AdditionalOption[];
	virtual_view?: string;
	commercial_image: string;
}

interface RenderImages {
	data: ImageData[];
}

interface BodyColor {
	id: number;
	name: string;
	btn_bg: string;
	render_url: string;
	incremental_price: number;
	additional_description: string;
}
interface InteriorColor {
	render_image: any;
	id: number;
	name: string;
	icon: {
		data: ImageData;
	};
	render_url: string;
	incremental_price: number;
	additional_description: string;
}

interface Wheel {
	id: number;
	name: string;
	incremental_price: number;
	additional_description: string;
	render_url: string;
	icon: {
		data: ImageData;
	};
}

type Tyre = {};

interface AdditionalOption {
	title: "string";
	id: number;
	name: string;
	incremental_price: number;
}

interface Meta {
	pagination: Pagination;
}

interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}
