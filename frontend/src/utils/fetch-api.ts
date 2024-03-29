import qs from 'qs';
import { getStrapiURL } from './api-helpers';

export async function getDataFromAPI(
    path: string,
    urlParams: any,
    lang: string
) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const p = `/${path}`;

    if (urlParams === null) {
        const urlParamsObject = {
            sort: { createdAt: 'asc' },
            populate: '*',
            locale: lang,
        };
        return await fetchAPI(p, urlParamsObject);
    }

    return await fetchAPI(p, urlParams);
}
export async function fetchAPI(
    path: string,
    urlParamsObject = {},
    options = {}
) {
    try {
        // Merge default and user options
        const mergedOptions = {
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        // Build request URL
        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${getStrapiURL(
            `/api${path}${queryString ? `?${queryString}` : ''}`
        )}`;

        // Trigger API call
        const response = await fetch(requestUrl, mergedOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(
            `Please check if your server is running and you set all the required tokens.`
        );
    }
}
