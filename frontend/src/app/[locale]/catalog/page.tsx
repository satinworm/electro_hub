import CatalogCars from '@/components/CatalogCars';
import { getStrapiMedia } from '@/utils/api-helpers';
// @ts-ignore
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
import { getDataFromAPI } from '@/utils/fetch-api';
import React from 'react';

// @ts-ignore
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function generateMetadata({ params }: any) {
    const { locale } = params;
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
        openGraph: {
            title: SEO?.MetaTitle,
            description: SEO?.MetaDescription,
            images: [
                {
                    url: getStrapiMedia(SEO?.ogImage?.data?.attributes?.url)!,
                    width: SEO?.ogImage?.data?.attributes?.width,
                    height: SEO?.ogImage?.data?.attributes?.width,
                },
            ],
        },
        other: other,
    };
}
export default async function CatalogPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const carsInStockData = await getDataFromAPI(
        'cars-in-stocks',
        {
            // filters: {
            //     brand: {
            //         name: {
            //             $eq: 'Denza',
            //         },
            //     },
            // },

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
    const brands = await getDataFromAPI(
        'brands',

        {
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
    );

    return (
        <section className={'bg-[#92A6AD] pt-20 font-electrohub'}>
            <CatalogCars
                data={carsInStockData}
                locale={locale}
                brands={brands?.data}
            />
        </section>
    );
}
