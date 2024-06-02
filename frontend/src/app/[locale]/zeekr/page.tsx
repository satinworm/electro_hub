import { Loader } from '@/components/Loader';
import MainSection from '@/components/MainSection';
import ModalTrigger from '@/components/ModalTrigger';
import NewArrivals from '@/components/NewArrivals';
import ZeekrExterior from '@/components/ZeekrExterior';
import ZeekrMainSection from '@/components/ ZeekrMainSection';
import { getStrapiMedia } from '@/utils/api-helpers';
import { getDataFromAPI } from '@/utils/fetch-api';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

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
        <div>
            {pageProperties && pageProperties?.data?.[0] && models ? (
                <>
                    <ZeekrMainSection
                        title={'zeekr'}
                        subTitle={t('heading_description')}
                        description={t('text_description')}
                        bg={'zeekr-bg'}
                    >
                        <div className='mt-auto flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-5'>
                            <Link
                                className={
                                    'flex w-full items-center justify-center gap-5 rounded-none border-white bg-white px-12 py-2 font-electrohub text-base font-bold text-black md:max-w-[370px] md:py-3 md:text-lg'
                                }
                                key={t('btn_constructor')}
                                href={'/zeekr/constructor'}
                            >
                                <span className={'whitespace-nowrap'}>
                                    {t('btn_constructor')}
                                </span>
                            </Link>
                            <ModalTrigger
                                header={modal('header')}
                                description={modal('description')}
                                label={t('btn_consultation')}
                                data={{
                                    type: 'feedback',
                                }}
                                styles='flex w-full items-center justify-center gap-5 rounded-none border border-white bg-transparent px-12 py-2 md:py-3 font-electrohub text-base md:text-lg font-bold text-white'
                            />
                        </div>
                    </ZeekrMainSection>
                    <NewArrivals
                        newArrivalsModels={models}
                        data={modelsSection}
                    />
                    <ZeekrExterior data={Zeekrexterior} />
                </>
            ) : (
                <Loader styles={'h-[100vh]'} />
            )}
        </div>
    );
}
