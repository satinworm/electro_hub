import { Loader } from '@/components/Loader';
import MainSection from '@/components/MainSection';
import NewArrivals from '@/components/NewArrivals';
import ZeekrExterior from '@/components/ZeekrExterior';
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
                    $eq: 'Zeekr',
                },
            },
            populate: {
                sections: {
                    fields: '*',
                    populate: {
                        logo: {
                            fields: ['url', 'width', 'height'],
                            populate: '*',
                        },
                        heading: {
                            fields: '*',
                            populate: '*',
                        },
                        color: {
                            fields: '*',
                            populate: {
                                image: {
                                    fields: ['url', 'width', 'height'],
                                    populate: '*',
                                },
                            },
                        },
                    },
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
    const modal = await getTranslations('ContactModal');
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
                    fields: '*',
                    populate: {
                        fields: ['*'],
                        heading: {
                            fields: '*',
                            populate: '*',
                        },
                        advantage: {
                            fields: '*',
                        },
                        btn: {
                            fields: '*',
                            populate: {
                                icon: {
                                    fields: ['url', 'width', 'height'],
                                    populate: '*',
                                },
                            },
                        },
                        color: {
                            fields: '*',
                            populate: {
                                image: {
                                    fields: ['url', 'width', 'height'],
                                    populate: '*',
                                },
                            },
                        },
                    },
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
    const Zeekrexterior = pageProperties?.data?.[0]?.attributes?.sections?.find(
        (section: any) => section.section_name === 'zeekr_advantages'
    );
    const modelsSection = pageProperties?.data?.[0]?.attributes?.sections?.find(
        (section: any) => section.section_name === 'models'
    );
    const models = await getDataFromAPI(
        'models',
        {
            filters: {
                brand: {
                    name: {
                        $eq: 'Zeekr',
                    },
                },
            },
            locale: locale,
            populate: '*',
        },
        locale
    );

    // console.log('suka ', pageProperties?.[0]?.attributes);
    return (
        <>
            {pageProperties && pageProperties?.data?.[0] && models ? (
                <>
                    <MainSection
                        title={'zeekr'}
                        subTitle={t('heading_description')}
                        description={t('text_description')}
                        bg={'zeekr-bg'}
                        buttons={[
                            {
                                name: t('btn_constructor'),

                                action: {
                                    actionType: 'link',
                                    actionUrl: '/zeekr/constructor',
                                    styles: 'flex w-full items-center justify-center gap-5 rounded-none border-white bg-white px-12 py-3 font-electrohub text-lg font-bold text-black md:max-w-[370px]',
                                },
                                children: (
                                    <Image
                                        src={'/constructor.svg'}
                                        width={20}
                                        height={20}
                                        alt={'Constructor link'}
                                    />
                                ),
                            },
                            {
                                name: t('btn_consultation'),
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
                    <NewArrivals
                        newArrivalsModels={models}
                        data={modelsSection}
                    />
                    <ZeekrExterior data={Zeekrexterior} />
                </>
            ) : (
                <Loader styles={'h-[100vh]'} />
            )}
        </>
    );
}
