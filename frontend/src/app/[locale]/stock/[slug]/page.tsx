import GalleryComponent from '@/components/GalleryComponent';
import ModalTrigger from '@/components/ModalTrigger';
import ScrollLink from '@/components/ScrollLink';
import TechnicalSpecifications from '@/components/TechnicalSpecifications';
import type { CarAttributes } from '@/types/carsinstock.type';
import { getDataFromAPI } from '@/utils/fetch-api';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getTranslations } from 'next-intl/server';
import React from 'react';
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function StockCarFullPage({ params }: any) {
    const { slug, locale } = params;
    const modal = await getTranslations('ContactModal');
    const carsInStockData = await getDataFromAPI(
        'cars-in-stocks',
        {
            filters: {
                slug: {
                    $eq: slug,
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
                gallery: {
                    populate: '*',
                    fields: ['url', 'width', 'height'],
                },
            },
            locale: locale,
        },
        locale
    );
    console.log('slug kurwa ', slug);
    const item = carsInStockData?.data?.[0]?.attributes as CarAttributes;
    return (
        <section className={'bg-[#1e1e1e]/30 font-electrohub'}>
            <div
                className={
                    'md:-space-x-2 mt-24 flex w-full flex-col bg-white py-4 text-white lg:flex-row'
                }
            >
                <div className="wrapper w-full p-3 md:w-[62%]">
                    <GalleryComponent
                        photos={carsInStockData?.data?.[0]?.attributes?.gallery}
                    />
                </div>
                <div
                    className={
                        'bg-white px-4 text-[#1e1e1e] md:w-[38%] md:py-12 lg:px-10'
                    }
                >
                    <h1
                        className={
                            'font-bold text-[24px] md:text-[32px] lg:text-[40px]'
                        }
                    >
                        {item.name}
                    </h1>
                    <p
                        className={
                            'mt-3 font-bold text-xl lg:mt-6 lg:text-[28px]'
                        }
                    >
                        {item.price_usd} $
                    </p>
                    <p className={' font-bold text-[#3E4247] text-[20px]'}>
                        {item.price_byn} BYN
                    </p>
                    <p className={'mt-6 mb-10 text-[#2E71EF]'}>{item.lising}</p>

                    {item?.short_specification && (
                        <div className={'text-base lg:text-xl'}>
                            <BlocksRenderer
                                content={item.short_specification as any}
                            />
                        </div>
                    )}
                    <p className={'mt-5 text-lg'}>{item.engine}</p>
                    <ScrollLink
                        styles={
                            'font-bold text-[#2E71EF] border-b-transparent hover:border-[#2E71EF] text-sm mt-5'
                        }
                        label={'Все параметры'}
                        id={'specification'}
                    />
                    <div>
                        <ModalTrigger
                            header={modal('header')}
                            description={modal('description')}
                            label={
                                locale === 'ru'
                                    ? 'Написать продавцу'
                                    : 'Write to seller'
                            }
                            styles="mt-10 rounded-[8px] bg-[#1e1e1e] px-10 py-4 text-center text-base font-bold text-white"
                            data={{
                                type: 'stock',
                                text: `${process.env.NEXT_PUBLIC_SERVER_URL}/ru/stock/${slug}`,
                            }}
                        />
                        {/* <button
                            type={'button'}
                            // onClick={() => console.log('')}
                            className={
                                'mt-10 rounded-[8px] bg-[#1e1e1e] px-10 py-4 text-center text-base font-bold text-white'
                            }
                        >
                            {locale === 'ru'
                                ? 'Написать продавцу'
                                : 'Write to seller'}
                        </button> */}
                    </div>
                </div>
            </div>
            {item?.specification?.length > 0 && (
                <TechnicalSpecifications data={item?.specification} />
            )}
            {item?.full_description && (
                <div
                    className={
                        ' w-full bg-white p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20'
                    }
                >
                    <h1 className="mb-6 font-semibold text-3xl">
                        {locale ? 'Описание' : 'Description'}
                    </h1>
                    <BlocksRenderer content={item.full_description as any} />
                </div>
            )}
        </section>
    );
}
