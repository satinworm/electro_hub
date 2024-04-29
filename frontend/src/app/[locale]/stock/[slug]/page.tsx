import { getDataFromAPI } from '@/utils/fetch-api';
import GalleryComponent from '@/components/GalleryComponent';
import { CarAttributes, CarEntity } from '@/types/carsinstock.type';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import ScrollLink from '@/components/ScrollLink';
import TechnicalSpecifications from '@/components/TechnicalSpecifications';
import React from 'react';

export default async function StockCarFullPage({ params }: any) {
    const { slug, locale } = params;
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
    const item = carsInStockData?.data?.[0]?.attributes as CarAttributes;
    return (
        <section className={'bg-[#1e1e1e]/30 font-electrohub'}>
            <div
                className={
                    'mt-24 flex w-full -space-x-2 bg-white py-4 text-white'
                }
            >
                <div className='wrapper w-full md:w-[62%]'>
                    <GalleryComponent
                        photos={carsInStockData?.data?.[0]?.attributes?.gallery}
                    />
                </div>
                <div
                    className={
                        'bg-white px-10 text-[#1e1e1e] md:w-[38%] md:py-12'
                    }
                >
                    <h1 className={'text-[40px] font-bold'}>{item.name}</h1>
                    <p className={'mt-6 text-[28px] font-bold'}>
                        {item.price_usd} $
                    </p>
                    <p className={'text-[20px] font-bold text-[#3E4247]'}>
                        {item.price_byn} BYN
                    </p>
                    <p className={'mb-10 mt-6 text-[#2E71EF]'}>{item.lising}</p>

                    <div className={'text-xl'}>
                        <BlocksRenderer
                            content={item.short_specification as any}
                        />
                    </div>
                    <p className={'mt-5 text-lg'}>{item.engine}</p>
                    <ScrollLink
                        styles={
                            'font-bold text-[#2E71EF] border-b-transparent hover:border-[#2E71EF] text-sm mt-5'
                        }
                        label={'Все параметры'}
                        href={'specification'}
                    />
                    <div>
                        <button
                            type={'button'}
                            // onClick={() => console.log('')}
                            className={
                                'mt-10 rounded-[8px] bg-[#1e1e1e] px-10 py-4 text-center text-base font-bold text-white'
                            }
                        >
                            {locale === 'ru'
                                ? 'Написать продавцу'
                                : 'Write to seller'}
                        </button>
                    </div>
                </div>
            </div>
            <TechnicalSpecifications data={item?.specification} />
        </section>
    );
}
