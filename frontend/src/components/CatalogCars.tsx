'use client';
import FiltersBurger from '@/components/FiltersBurger';
import type { BrandData } from '@/types/brands.types';
import type { CarsInStockBackendResponse } from '@/types/carsinstock.type';
import { getStrapiMedia } from '@/utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { memo, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

type Props = {
    data: CarsInStockBackendResponse;
    locale: string;
    brands: BrandData[];
    slug: string;
};

const CatalogCars = memo(({ data, locale, brands, slug }: Props) => {
    const [initialData, setInitialData] =
        useState<CarsInStockBackendResponse>(data);

    const [isLoading, setIsLoading] = useState(false);

    const { push } = useRouter();
    console.log('brandPath', brands);

    useEffect(() => {
        // Set loading to true when data changes
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust this delay as needed

        // Cleanup function to clear the timer
        return () => clearTimeout(timer);
    }, [initialData]);

    const path = usePathname();

    return (
        <div className={'bg-white py-6 md:py-10 lg:py-16 xl:py-20'}>
            <div className={'container'}>
                <div className="relative text-black md:mt-10">
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
                    slug={slug}
                />

                <div className="z-[1] mt-4 w-full ">
                    <TransitionGroup
                        className={
                            'relative grid grid-cols-1 gap-3 py-5 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:gap-5 2xl:gap-6'
                        }
                    >
                        {initialData?.data?.length === 0 &&
                            path !== '/ru/catalog/all' && (
                                <div>Извините, еще не добавили)</div>
                            )}
                        {initialData?.data?.map((item, index) => (
                            <CSSTransition
                                key={item.attributes.slug}
                                timeout={300}
                                classNames="fade"
                            >
                                <div>
                                    <Link
                                        href={`/stock/${item.attributes.slug}`}
                                        className={
                                            'mx-auto flex flex-col items-center justify-center overflow-hidden rounded-[20px] p-3 shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]'
                                        }
                                    >
                                        <div className={'relative'}>
                                            <div className={'relative'}>
                                                <Image
                                                    className={
                                                        'max-h-[200px] rounded-[10px] object-contain'
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
                                                            ?.data?.attributes
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
                                            <div className={'text-xs'}>●</div>
                                            <div className={'text-xs'}>
                                                {item.attributes?.body}
                                            </div>
                                            <div className={'text-xs'}>●</div>
                                            <div className={'text-xs'}>
                                                {item.attributes?.engine_type}
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
                                                    {item.attributes?.privod}
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
                                    </Link>
                                </div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
        </div>
    );
});

export default CatalogCars;