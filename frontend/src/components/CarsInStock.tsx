'use client';

import { CarsToOrderItem } from '@/types/carstoorder.types';
import React from 'react';
import { useLocale } from 'next-intl';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { getStrapiMedia } from '@/utils/api-helpers';
import { DialogStore } from '@/stores/dialog.store';
import {
    CarEntity,
    CarsInStockBackendResponse,
} from '@/types/carsinstock.type';
import { useRouter } from 'next/navigation';

type Props = {
    data: {
        data: CarEntity[];
    };
};

function getPrivod(locale: string, privod: string) {
    if (privod === 'передний') {
        return locale === 'ru' ? 'Передний' : 'Front';
    } else if (privod === 'полный') {
        return locale === 'ru' ? 'Полный' : 'All-wheel';
    } else if (privod === 'задний') {
        return locale === 'ru' ? 'Задний' : 'Rear';
    }
}
export default function CarsInStock({ data }: Props) {
    const { setOpen } = DialogStore();
    const { push } = useRouter();
    // console.log('Cars in stock ', data);
    const locale = useLocale();
    console.log('opa data ', data?.data);
    return (
        <section
            id={'cars-in-stock'}
            className='flex w-full flex-col bg-white py-4 font-electrohub text-black xl:py-10'
        >
            <div className='z-[1] mt-[-38px] h-[38px] w-full bg-rectangle_main_mobile bg-cover bg-no-repeat md:-mt-[48px] md:h-[48px] md:bg-rectangle_main' />
            <div className='container mt-10 text-black'>
                <h3 className='text-sm font-black text-[#1e1e1e] md:text-base'>
                    {locale === 'ru' ? 'АВТОМОБИЛИ В НАЛИЧИИ' : 'CARS IN STOCK'}
                </h3>
                <div className='mt-2 flex items-center justify-between md:mt-5'>
                    <span
                        className={
                            'text-xl font-bold leading-tight text-[#1e1e1e] sm:text-2xl lg:max-w-[720px] lg:text-[32px]'
                        }
                    >
                        {locale === 'ru'
                            ? 'Выбeрите свой автомобиль'
                            : 'Choose your car'}
                    </span>
                </div>
            </div>
            <Carousel
                opts={{
                    align: 'start',
                }}
                className='container mt-6 w-full px-3 md:mt-10 lg:mt-12 xl:mt-16 '
            >
                <div
                    className='absolute right-0 top-1/2 h-full -translate-y-1/2 md:w-[120px] lg:w-[187px]'
                    style={{
                        zIndex: 10,
                        background:
                            'linear-gradient(270deg, rgb(255, 255, 255) 40.9%, rgba(255, 255, 255, 0) 100%)',
                    }}
                ></div>
                <CarouselContent
                    className={'relative px-3 py-5 lg:gap-5 xl:gap-5 2xl:gap-6'}
                >
                    {data?.data?.map((item, index) => {
                        return (
                            <CarouselItem
                                key={item.attributes.slug}
                                // shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]
                                className='md:basis-1/2 lg:basis-1/5'
                            >
                                <div
                                    className={
                                        'mx-auto flex flex-col items-center justify-center overflow-hidden rounded-[20px] p-3 shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]'
                                    }
                                >
                                    <div className={'relative'}>
                                        <div className={'relative'}>
                                            <Image
                                                className={'rounded-[10px]'}
                                                src={
                                                    getStrapiMedia(
                                                        item?.attributes
                                                            ?.preview_image
                                                            ?.data?.attributes
                                                            ?.url
                                                    )!
                                                }
                                                alt={'asd'}
                                                width={
                                                    item?.attributes
                                                        ?.preview_image?.data
                                                        ?.attributes?.width
                                                }
                                                height={
                                                    item?.attributes
                                                        ?.preview_image?.data
                                                        ?.attributes?.height
                                                }
                                            />
                                        </div>
                                        {/*<div*/}
                                        {/*    className={*/}
                                        {/*        'absolute bottom-2 right-2 rounded-lg bg-[#1e1e1e]/30 px-5 py-2 text-center font-bold text-white backdrop-blur-[10px]'*/}
                                        {/*    }*/}
                                        {/*>*/}
                                        {/*    {item.attributes?.name}*/}
                                        {/*</div>*/}
                                    </div>
                                    <div
                                        className={
                                            'mt-6 w-full text-left text-[20px] font-bold'
                                        }
                                    >
                                        {item.attributes?.name}
                                    </div>
                                    <div
                                        className={
                                            'my-3 flex w-full items-center justify-start gap-1 font-bold capitalize text-[#808080]'
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
                                            'mt-4 flex w-full items-center justify-between'
                                        }
                                    >
                                        <div
                                            className={
                                                'text-[24px] font-bold text-black'
                                            }
                                        >
                                            ${item?.attributes?.price_usd}
                                        </div>
                                        <button
                                            type={'button'}
                                            onClick={() =>
                                                push(
                                                    `/stock/${item.attributes.slug}`
                                                )
                                            }
                                            className={
                                                'rounded-[10px] bg-[#1e1e1e] px-4 py-3 text-center text-xs font-bold text-white'
                                            }
                                        >
                                            {locale === 'ru'
                                                ? 'Подробнее'
                                                : 'More details'}
                                        </button>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                    <CarouselItem
                        key={Math.random()}
                        // shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]
                        className='opacity-0 md:basis-1/2 lg:basis-1/4'
                    >
                        <></>
                    </CarouselItem>
                </CarouselContent>
                <div className={'flex w-full justify-center gap-x-5'}>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </section>
    );
}
