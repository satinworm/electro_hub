import BrandSection from '@/components/BrandSection';
import DeliveryStageSection from '@/components/DeliveryStageSection';
import { Loader } from '@/components/Loader';
import MainSection from '@/components/MainSection';
import NewArrivals from '@/components/NewArrivals';
import NewsSection from '@/components/NewsSection';
import { getStrapiMedia } from '@/utils/api-helpers';
import { getDataFromAPI } from '@/utils/fetch-api';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function generateMetadata({ params }: any) {
    const { locale } = params;
    const pageProperties = await getDataFromAPI(
        'pages',
        {
            filters: {
                shortName: {
                    $eq: 'main',
                },
            },
            populate: {
                sections: {
                    fields: ['*'],
                    populate: '*',
                },
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
            return {
                [tag?.Name]: tag?.Content,
            };
        });
    const other = Object.assign({}, ...additionalOgTags);

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

export default async function RootRoute({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const t = await getTranslations('MainSection');
    const modal = await getTranslations('ContactModal');
    const pageProperties = await getDataFromAPI(
        'pages',
        {
            filters: {
                shortName: {
                    $eq: 'main',
                },
            },
            populate: {
                sections: {
                    fields: ['*'],
                    populate: {
                        populate: true,
                        items: {
                            fields: '*',
                            populate: '*',
                        },
                        heading: {
                            fields: '*',
                            populate: '*',
                        },
                        stage_card: {
                            fields: '*',
                            populate: '*',
                        },
                    },
                },
                SEO: {
                    fields: ['*'],
                    populate: '*',
                },
            },
            locale: locale,
        },
        locale
    );
    // console.dir(pageProperties, { depth: null });
    const brandsSection = pageProperties?.data?.[0]?.attributes?.sections?.find(
        (section: any) => section?.section_name === 'brands'
    );
    const newArrivalsSection =
        pageProperties?.data?.[0]?.attributes?.sections?.find(
            (section: any) => section.section_name === 'newArrivals'
        );
    const stagePurchaseSection =
        pageProperties?.data?.[0]?.attributes?.sections?.find(
            (section: any) => section.section_name === 'stagespurchase'
        );
    const mainSectionSlider =
        pageProperties?.data?.[0]?.attributes?.sections?.find(
            (section: any) =>
                section.__component === 'page-properties.main-page-slider'
        );

    const brands = await getDataFromAPI(
        'brands',
        {
            populate: {
                image: {
                    fields: ['url', 'width', 'height'],
                },
                logo: {
                    fields: ['url', 'width', 'height'],
                },
            },
            locale: locale,
        },
        locale
    );
    const newArrivalsModels = await getDataFromAPI(
        'models',
        {
            filters: {
                new_arrival: {
                    $eq: true,
                },
            },
            populate: {
                sale_type: {
                    fields: ['type'],
                },
                image: {
                    fields: ['url', 'width', 'height'],
                },
                brand: {
                    fields: ['name', 'slug'],
                },
            },
            locale: locale,
        },
        locale
    );
    const newsData = await getDataFromAPI(
        'news',
        {
            sort: { createdAt: 'asc' },
            populate: {
                header: '*',
                image: {
                    fields: ['url', 'width', 'height'],
                },
            },
            locale: locale,
        },
        locale
    );
    const getNavbarData = await getDataFromAPI(
        'navbars',
        {
            populate: {
                social_links: '*',
            },
            locale: locale,
        },
        locale
    );
    const socialLinks = getNavbarData?.data?.[0]?.attributes?.social_links;
    // console.dir(getNavbarData, { depth: null });

    // console.dir(newsData, { depth: null });
    // console.log('brandsSection ', brands?.data?.[0]);

    return (
        <main className='flex flex-col items-center justify-between'>
            {brandsSection &&
            pageProperties?.data?.[0] &&
            brands?.data?.[0] &&
            newArrivalsModels?.data?.[0] &&
            newsData?.data?.[0] ? (
                <>
                    <MainSection
                        title={'electro hub'}
                        subTitle={t('heading_description')}
                        description={t('text_description')}
                        bg={'bg-main'}
                        data={mainSectionSlider}
                        buttons={[
                            {
                                name: t('btn_catalog'),
                                action: {
                                    actionType: 'link',
                                    actionUrl: '/zeekr/constructor',
                                    styles: 'flex w-full items-center justify-center gap-5 rounded-none border-white bg-white px-12 py-3 font-electrohub text-lg font-bold text-black md:max-w-[370px]',
                                },
                                children: (
                                    <Image
                                        src={'/catalog.svg'}
                                        width={20}
                                        height={17}
                                        alt={'Constructor link'}
                                    />
                                ),
                            },
                            {
                                name: t('btn_consultation'),
                                // style: 'flex w-full items-center justify-center gap-5 rounded-none border border-white bg-transparent px-12 py-3 font-electrohub text-lg font-bold text-white',
                                action: {
                                    actionType: 'modal',
                                    styles: 'flex w-full items-center justify-center gap-5 rounded-none border border-white bg-transparent px-12 py-3 font-electrohub text-lg font-bold text-white',
                                    modal_header: modal('header'),
                                    modal_description: modal('description'),
                                },
                                children: (
                                    <Image
                                        src={'/consultation.svg'}
                                        width={20}
                                        height={17}
                                        alt={'Constructor link'}
                                    />
                                ),
                            },
                        ]}
                    />
                    <BrandSection brands={brands} data={brandsSection} />
                    <NewArrivals
                        newArrivalsModels={newArrivalsModels}
                        data={newArrivalsSection}
                    />
                    <DeliveryStageSection data={stagePurchaseSection} />
                    <NewsSection data={newsData} />
                </>
            ) : (
                <Loader styles={'h-[100vh]'} />
            )}
        </main>
    );
}
