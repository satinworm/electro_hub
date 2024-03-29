import MainSection from '@/components/MainSection';
import BrandSection from '@/components/BrandSection';
import { fetchAPI, getDataFromAPI } from '@/utils/fetch-api';
import NewArrivals from '@/components/NewArrivals';
import DeliveryStageSection from '@/components/DeliveryStageSection';
import NewsSection from '@/components/NewsSection';

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
                SEO: {
                    fields: ['*'],
                },
                sections: {
                    fields: ['*'],
                    populate: {
                        heading: {
                            fields: ['*'],
                        },
                    },
                },
            },
            locale: locale,
        },
        locale
    );
    const { SEO } = pageProperties?.data?.[0]?.attributes;
    return {
        title: SEO.MetaTitle,
        description: SEO.MetaDescription,
    };
}

export default async function RootRoute({
    params: { locale },
}: {
    params: { locale: string };
}) {
    // const locale = useLocale();
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
            },
            locale: locale,
        },
        locale
    );
    const brandsSection = pageProperties?.data?.[0]?.attributes?.sections?.find(
        (section: any) => section.section_name === 'brands'
    );
    const newArrivalsSection =
        pageProperties?.data?.[0]?.attributes?.sections?.find(
            (section: any) => section.section_name === 'newArrivals'
        );
    const stagePurchaseSection =
        pageProperties?.data?.[0]?.attributes?.sections?.find(
            (section: any) => section.section_name === 'stagespurchase'
        );
    // console.dir(pageProperties, { depth: null });
    // console.log('brandsSection', brandsSection);
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

    console.dir(newsData, { depth: null });

    return (
        <main className='flex flex-col items-center justify-between'>
            <MainSection />
            <BrandSection brands={brands} data={brandsSection} />
            <NewArrivals
                newArrivalsModels={newArrivalsModels}
                data={newArrivalsSection}
            />
            <DeliveryStageSection data={stagePurchaseSection} />
            <NewsSection data={newsData} />
        </main>
    );
}
