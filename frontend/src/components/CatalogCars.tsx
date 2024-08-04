'use client';
import FiltersBurger from '@/components/FiltersBurger';
import type { BrandData } from '@/types/brands.types';
import type { CarsInStockBackendResponse } from '@/types/carsinstock.type';
import { getStrapiMedia } from '@/utils/api-helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { memo, useState } from 'react';

type Props = {
    data: CarsInStockBackendResponse;
    locale: string;
    brands: BrandData[];
};

const CatalogCars = memo(({ data, locale, brands }: Props) => {
    const [initialData, setInitialData] =
        useState<CarsInStockBackendResponse>(data);
    console.log('CatalogCars', initialData);

    const { push } = useRouter();

    // console.log('extractGenerations', extractGenerations);

    return (
        <>
            <div className={'bg-white py-20'}>
                <div className={'container'}>
                    <div className="container relative mt-10 text-black">
                        <div className="mt-2 flex items-center justify-between md:mt-5">
                            <span
                                className={
                                    'font-bold text-[#1e1e1e] text-xl leading-tight sm:text-2xl lg:max-w-[720px] lg:text-[32px]'
                                }
                            >
                                {locale === 'ru'
                                    ? 'Поиск по параметрам'
                                    : 'Search by parameters'}
                            </span>
                        </div>
                    </div>
                    <FiltersBurger
                        initialData={initialData}
                        setInitialData={setInitialData}
                        locale={locale}
                        brands={brands}
                    />

                    <div className="z-[1] mt-4 w-full ">
                        <div
                            className={
                                'relative grid grid-cols-4 py-5 lg:gap-5 xl:gap-5 2xl:gap-6'
                            }
                        >
                            {initialData?.data?.length === 0 && (
                                <div>Извините, еще не добавили)</div>
                            )}
                            {initialData?.data?.map((item, index) => {
                                return (
                                    <div
                                        key={item.attributes.slug}
                                        // shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]
                                        className=""
                                    >
                                        <div
                                            className={
                                                'mx-auto flex flex-col items-center justify-center overflow-hidden rounded-[20px] p-3 shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]'
                                            }
                                        >
                                            <div className={'relative'}>
                                                <div className={'relative'}>
                                                    <Image
                                                        className={
                                                            'max-h-[200px] rounded-[10px]'
                                                        }
                                                        src={
                                                            // biome-ignore lint/style/noNonNullAssertion: <explanation>
                                                            getStrapiMedia(
                                                                item?.attributes
                                                                    ?.preview_image
                                                                    ?.data
                                                                    ?.attributes
                                                                    ?.url
                                                            )!
                                                        }
                                                        alt={'asd'}
                                                        width={
                                                            item?.attributes
                                                                ?.preview_image
                                                                ?.data
                                                                ?.attributes
                                                                ?.width
                                                        }
                                                        height={200}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    'mt-6 w-full text-left font-bold text-[20px]'
                                                }
                                            >
                                                {item.attributes?.name}
                                            </div>
                                            <div
                                                className={
                                                    'my-3 flex w-full items-center justify-start gap-1 font-bold text-[#808080] capitalize'
                                                }
                                            >
                                                <div className={'text-xs'}>
                                                    {item.attributes?.gearbox}
                                                </div>
                                                <div className={'text-xs'}>
                                                    ●
                                                </div>
                                                <div className={'text-xs'}>
                                                    {item.attributes?.body}
                                                </div>
                                                <div className={'text-xs'}>
                                                    ●
                                                </div>
                                                <div className={'text-xs'}>
                                                    {
                                                        item.attributes
                                                            ?.engine_type
                                                    }
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    'mt-5 grid w-full grid-cols-2 gap-y-4'
                                                }
                                            >
                                                <div
                                                    className={
                                                        'flex min-h-[40px] items-center gap-2.5 font-bold text-sm'
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            '/carstoorder/battery.svg'
                                                        }
                                                        alt={'Battery'}
                                                        width={30}
                                                        height={20}
                                                    />
                                                    <span>
                                                        {
                                                            item.attributes
                                                                ?.battery_capacity
                                                        }{' '}
                                                        {locale === 'ru'
                                                            ? 'кВт/ч'
                                                            : 'kW/h'}
                                                    </span>
                                                </div>
                                                <div
                                                    className={
                                                        'flex items-center gap-2.5 font-bold text-sm'
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            '/carstoorder/hourse_power.png'
                                                        }
                                                        alt={'Battery'}
                                                        width={30}
                                                        height={20}
                                                    />
                                                    <span>
                                                        {
                                                            item.attributes
                                                                ?.hourse_power
                                                        }{' '}
                                                        {locale === 'ru'
                                                            ? 'л/c'
                                                            : 'h/p'}
                                                    </span>
                                                </div>
                                                <div
                                                    className={
                                                        'flex items-center gap-2.5 font-bold text-sm'
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            '/carstoorder/range.svg'
                                                        }
                                                        alt={'Battery'}
                                                        width={22}
                                                        height={20}
                                                    />
                                                    <span>
                                                        {
                                                            item.attributes
                                                                ?.vehicle_range
                                                        }{' '}
                                                        {locale === 'ru'
                                                            ? 'км'
                                                            : 'km'}
                                                    </span>
                                                </div>
                                                <div
                                                    className={
                                                        'flex items-center gap-2.5 font-bold text-sm'
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            '/carstoorder/privod.svg'
                                                        }
                                                        alt={'Battery'}
                                                        width={22}
                                                        height={20}
                                                    />
                                                    <span>
                                                        {
                                                            item.attributes
                                                                ?.privod
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div
                                                className={
                                                    'mt-4 flex w-full items-center justify-between'
                                                }
                                            >
                                                <div
                                                    className={
                                                        'font-bold text-[24px] text-black'
                                                    }
                                                >
                                                    ${item?.attributes?.price}
                                                </div>
                                                <button
                                                    type={'button'}
                                                    onClick={() =>
                                                        push(
                                                            `/stock/${item.attributes.slug}`
                                                        )
                                                    }
                                                    className={
                                                        'rounded-[10px] bg-[#1e1e1e] px-4 py-3 text-center font-bold text-white text-xs'
                                                    }
                                                >
                                                    {locale === 'ru'
                                                        ? 'Подробнее'
                                                        : 'More details'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
export default CatalogCars;
