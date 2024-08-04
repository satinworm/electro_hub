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
import ModalTrigger from './ModalTrigger';

type Props = {
    data: {
        data: CarsToOrderItem[];
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
export default function CarsToOrder({ data }: Props) {
    const { setOpen } = DialogStore();
    const locale = useLocale();
    return (
        <section
            id={'cars-to-order'}
            className="flex w-full flex-col bg-white py-4 font-electrohub text-black xl:py-10"
        >
            <div className="z-[1] mt-[-38px] h-[38px] w-full bg-rectangle_main_mobile bg-cover bg-no-repeat md:-mt-[48px] md:h-[48px] md:bg-rectangle_main" />
            <div className="container mt-10 text-black">
                <h3 className="text-sm font-black text-[#1e1e1e] md:text-base">
                    {locale === 'ru' ? 'АВТОМОБИЛИ К ЗАКАЗУ' : 'CARS TO ORDER'}
                </h3>
                <div className="mt-2 flex items-center justify-between md:mt-5">
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
                className="container mt-6 w-full px-3 md:mt-10 lg:mt-12 xl:mt-16 "
            >
                <div
                    className="absolute right-0 top-1/2 h-full -translate-y-1/2 md:w-[120px] lg:w-[187px]"
                    style={{
                        zIndex: 10,
                        background:
                            'linear-gradient(270deg, rgb(255, 255, 255) 40.9%, rgba(255, 255, 255, 0) 100%)',
                    }}
                ></div>
                <CarouselContent
                    className={'relative px-3 py-5 lg:gap-5 xl:gap-5 2xl:gap-6'}
                >
                    {data?.data?.map((item, index) => (
                        <CarouselItem
                            key={index}
                            // shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]
                            className="md:basis-1/2 lg:basis-1/4"
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
                                                    item?.attributes?.image
                                                        ?.data?.[0]?.attributes
                                                        ?.url
                                                )!
                                            }
                                            alt={'asd'}
                                            width={
                                                item?.attributes?.image
                                                    ?.data?.[0]?.attributes
                                                    ?.width
                                            }
                                            height={
                                                item?.attributes?.image
                                                    ?.data?.[0]?.attributes
                                                    ?.height
                                            }
                                        />
                                    </div>
                                    <div
                                        className={
                                            'absolute bottom-2 right-2 rounded-lg bg-[#1e1e1e]/30 px-5 py-2 text-center font-bold text-white backdrop-blur-[10px]'
                                        }
                                    >
                                        {item.attributes?.starting_price}
                                    </div>
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
                                        'mt-5 grid w-full grid-cols-2 gap-y-4'
                                    }
                                >
                                    <div
                                        className={
                                            'flex min-h-[40px] items-center gap-2.5 text-sm font-bold'
                                        }
                                    >
                                        <Image
                                            src={'/carstoorder/battery.svg'}
                                            alt={'Battery'}
                                            width={30}
                                            height={20}
                                        />
                                        <span>
                                            {item.attributes?.battery}{' '}
                                            {locale === 'ru' ? 'кВт/ч' : 'kW/h'}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            'flex items-center gap-2.5 text-sm font-bold'
                                        }
                                    >
                                        <Image
                                            src={
                                                '/carstoorder/acceleration.svg'
                                            }
                                            alt={'Battery'}
                                            width={20}
                                            height={20}
                                        />
                                        <span>
                                            {item.attributes?.acceleration}{' '}
                                            {locale === 'ru' ? 'сек' : 's'}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            'flex items-center gap-2.5 text-sm font-bold'
                                        }
                                    >
                                        <Image
                                            src={'/carstoorder/range.svg'}
                                            alt={'Battery'}
                                            width={22}
                                            height={20}
                                        />
                                        <span>
                                            {item.attributes?.driving_range}{' '}
                                            {locale === 'ru' ? 'км' : 'km'}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            'flex items-center gap-2.5 text-sm font-bold'
                                        }
                                    >
                                        <Image
                                            src={'/carstoorder/privod.svg'}
                                            alt={'Battery'}
                                            width={22}
                                            height={20}
                                        />
                                        <span>
                                            {getPrivod(
                                                locale,
                                                item.attributes?.privod
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className={'mt-7 w-full'}>
                                    <ModalTrigger
                                        header={'Связь с нами'}
                                        description={
                                            'Наш специалист свяжется с Вами и ответит на все интересующие Вас вопросы.'
                                        }
                                        label={
                                            locale === 'ru'
                                                ? 'Подробнее'
                                                : 'More details'
                                        }
                                        styles="w-full rounded-[10px] bg-[#1e1e1e] py-3 text-center text-xs font-bold text-white"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                    <CarouselItem
                        key={Math.random()}
                        // shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]
                        className="opacity-0 md:basis-1/2 lg:basis-1/4"
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
