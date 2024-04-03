import { getDataFromAPI } from '@/utils/fetch-api';
import { getStrapiMedia } from '@/utils/api-helpers';
import { getTranslations } from 'next-intl/server';
import MainSection from '@/components/MainSection';
import { Loader } from '@/components/Loader';

export async function generateMetadata({ params }: any) {
    const { locale } = params;
    const pageProperties = await getDataFromAPI(
        'pages',
        {
            filters: {
                shortName: {
                    $eq: 'Zeekr',
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
export default async function ZeekrPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const t = await getTranslations('Zeekr');
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
                    fields: ['*'],
                    populate: '*',
                },
            },
            locale: locale,
        },
        locale
    );
    return (
        <>
            {pageProperties && pageProperties?.data?.[0] ? (
                <>
                    <MainSection
                        title={'zeekr'}
                        subTitle={t('heading_description')}
                        description={t('text_description')}
                        bg={'zeekr-bg'}
                        buttons={[
                            {
                                name: t('btn_constructor'),
                                style: 'flex w-full items-center justify-center gap-5 rounded-none border-white bg-white px-12 py-3 font-electrohub text-lg font-bold text-black md:max-w-[370px]',
                                image: {
                                    url: '/constructor.png',
                                    width: 20,
                                    height: 20,
                                },
                                action: '',
                            },
                            {
                                name: t('btn_consultation'),
                                style: 'flex w-full items-center justify-center gap-5 rounded-none border border-white bg-transparent px-12 py-3 font-electrohub text-lg font-bold text-white',
                                image: {
                                    url: '/consultation.svg',
                                    width: 20,
                                    height: 17,
                                },
                                action: '',
                            },
                        ]}
                    />
                </>
            ) : (
                <Loader styles={'h-[100vh]'} />
            )}
        </>
    );
}
