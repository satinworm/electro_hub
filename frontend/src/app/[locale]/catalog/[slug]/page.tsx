import CatalogCars from '@/components/CatalogCars';
import type { BrandsResponse } from '@/types/brands.types';
import { getStrapiMedia } from '@/utils/api-helpers';
// @ts-ignore
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
import { getDataFromAPI } from '@/utils/fetch-api';
import { redirect } from 'next/navigation';
import React from 'react';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function generateMetadata({ params }: any) {
    const { locale, slug } = params;
    const pageProperties = await getDataFromAPI(
        'pages',
        {
            filters: {
                shortName: {
                    $eq: 'catalog',
                },
            },
            populate: {
                SEO: {
                    fields: '*',
                    populate: '*',
                },
            },
            locale: locale,
        },
        locale
    );
    const brands = (await getDataFromAPI(
        'brands',

        {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
            sort: {
                name: 'ASC',
            },
            populate: {
                name: '*',
                slug: '*',
            },
            locale: locale,
        },
        locale
    )) satisfies BrandsResponse;
    console.dir(brands, { depth: null });
    const brandImage = brands?.data?.[0]?.attributes?.image?.data?.attributes;
    const SEO = pageProperties?.data?.[0]?.attributes?.SEO;
    const additionalOgTags =
        pageProperties?.data?.[0]?.attributes?.SEO?.MetaTag?.map((tag: any) => {
            if (!tag) return;
            return {
                [tag?.Name]: tag?.Content,
            };
        });
    const other = additionalOgTags
        ? Object.assign({}, ...additionalOgTags)
        : {};

    return {
        title: `Electrohub | ${brands?.data?.[0]?.attributes?.name || 'Каталог'}`,
        openGraph: {
            title: `Electrohub | ${brands?.data?.[0]?.attributes?.name}`,
            description: SEO?.MetaDescription,
            images: [
                {
                    // biome-ignore lint/style/noNonNullAssertion: <explanation>
                    url: getStrapiMedia(brandImage?.url)!,
                    width: brandImage?.width,
                    height: brandImage?.height,
                },
            ],
        },
        other: other,
    };
}
export default async function CatalogPage({ params }: any) {
    const { locale, slug } = params;

    if (!slug) {
        redirect('/ru/catalog/all');
    }
    const carsInStockData = await getDataFromAPI(
        'cars-in-stocks',
        {
            filters: {
                slug: {
                    $containsi: slug,
                },
            },
            populate: {
                preview_image: {
                    populate: '*',
                    fields: ['url', 'width', 'height'],
                },
                specification: {
                    fields: ['*'],
                    populate: '*',
                },
                brand: {
                    populate: '*',
                    fields: ['name', 'slug'],
                },
            },
            locale: locale,
        },
        locale
    );
    const brands = (await getDataFromAPI(
        'brands',

        {
            sort: {
                name: 'ASC',
            },
            populate: {
                name: '*',
                slug: '*',
                image: '*',
            },
            locale: locale,
        },
        locale
    )) satisfies BrandsResponse;

    return (
        <section className={'bg-[#92A6AD] pt-20 font-electrohub'}>
            <CatalogCars
                data={carsInStockData}
                locale={locale}
                brands={brands?.data}
                slug={slug}
            />
        </section>
    );
}
