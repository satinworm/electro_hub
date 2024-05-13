'use client';

// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { cn } from '@/lib/utils';
import ActionButtons, { ButtonFromProps } from '@/components/ActionButtons';
import React, { useEffect } from 'react';
import { MainSectionSliderTypes } from '@/types/mainsection.types';
import { getStrapiMedia } from '@/utils/api-helpers';
import Image from 'next/image';
import ModalComponent from '@/components/ModalComponent';
import { DialogStore } from '@/stores/dialog.store';
import ModalTrigger from './ModalTrigger';

type Props = {
    title: string;
    description: string;
    subTitle: string;
    bg: string;
    data?: MainSectionSliderTypes;
};

export default function MainSectionSlider({ props }: { props: Props }) {
    const { setOpen } = DialogStore();
    const [windowWidth, setWindowWidth] = React.useState<number>(0);
    const { title, description, subTitle, bg, data } = props;
    const getPrevItem = (items: any, currentItem: any) => {
        if (items.length === currentItem.id - 1) {
            return items[0];
        }
        if (currentItem.id === 1) {
            return items[items.length - 1];
        }
        return items[currentItem.id - 2];
    };

    const getNextItem = (items: any, currentItem: any) => {
        if (items.length === currentItem.id) {
            return items[0];
        }
        return items[currentItem.id];
    };
    useEffect(() => {
        // Обработчик изменения размера окна
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        // Проверка существования объекта window и установка начального значения ширины
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
        }

        // Функция очистки
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Splide
                className={'mb-8 w-full font-electrohub md:max-h-[85vh]'}
                hasTrack={false}
                options={{
                    type: 'fade',
                    // heightRatio: 0.98,
                    pagination: true,
                    arrows: windowWidth >= 768,
                    autoplay: true,
                    interval: 4000,
                    rewind: true,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    resetProgress: false,
                    lazyLoad: 'nearby',
                    speed: 1000,
                    waitForTransition: true,
                }}
            >
                <SplideTrack>
                    {/* <SplideSlide>
                        <div
                            className={cn(
                                `${bg} w-full bg-center bg-no-repeat md:bg-cover`
                            )}
                        > */}
                    {/* <div className='item-center relative flex h-full min-h-[85vh] w-full flex-col justify-end px-[0.4rem] sm:px-[1rem] md:px-[1.5rem] lg:px-[2rem]'>
                                <SocialLinks />
                                <div className='absolute left-1/2 top-1/2 mb-[25%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-3 md:mb-[15%] md:space-y-5'>
                                    <div className='px-4 text-center font-terminatorgen text-[52px] leading-[1] tracking-[0.2em] text-white md:text-[80px] lg:whitespace-nowrap lg:text-[92px] xl:text-[112px] 2xl:text-[128px]'>
                                        {title}
                                    </div>
                                    <div className='text-center font-electrohub text-[15px] font-bold text-white md:text-[20px]'>
                                        {subTitle}
                                    </div>
                                </div>
                                <div className='mb-[140px] text-white'>
                                    <div className='hidden max-w-2xl text-center font-electrohub text-[16px] font-bold text-white md:block md:text-left md:text-2xl'>
                                        {description}
                                    </div>
                                    <div className='mt-7 flex w-full justify-between'>
                                        <ActionButtons
                                            buttons={buttons}
                                            containerStyles={
                                                'flex w-full flex-col gap-5 md:w-auto md:flex-row'
                                            }
                                        />
                                    </div>
                                </div>
                            </div> */}
                    {/* </div> */}
                    {/* </SplideSlide> */}
                    {data?.items?.map((item, index) => {
                        const bgUrl = getStrapiMedia(
                            item.main_image.data.attributes.url
                        );
                        const prevItem = getPrevItem(data.items, item);
                        const nextItem = getNextItem(data.items, item);

                        return (
                            <SplideSlide
                                key={index}
                                className={cn(
                                    `w-full bg-center bg-no-repeat px-[0.4rem] sm:px-[1rem] md:bg-cover md:px-[1.5rem] lg:px-[2rem]`
                                )}
                                style={{
                                    backgroundImage:
                                        windowWidth < 768
                                            ? 'black'
                                            : `url(${bgUrl})`,
                                }}
                            >
                                <div className='item-center relative mb-6 mt-24 flex min-h-[75vh] w-full flex-col md:mt-0 md:min-h-[85vh] md:justify-end '>
                                    <div className='left-1/2 flex w-full flex-col items-center justify-center space-y-3 md:absolute md:top-1/4 md:mb-[15%] md:-translate-x-1/2 md:-translate-y-2/3 md:space-y-5'>
                                        <div className='text-center font-terminatorgen text-[52px] leading-[1] text-white md:px-4 md:text-[80px] md:tracking-[0.2em] lg:whitespace-nowrap lg:text-[92px] xl:text-[112px] 2xl:text-[128px]'>
                                            {item?.name}
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            'relative mt-7 min-h-[400px] rounded-2xl md:hidden'
                                        }
                                    >
                                        <Image
                                            src={bgUrl!}
                                            fill
                                            alt={item?.name}
                                            objectFit={'cover'}
                                            className={
                                                'h-full w-full overflow-hidden rounded-2xl object-fill'
                                            }
                                        />
                                        <button
                                            className={
                                                'absolute bottom-0 left-1/2 mx-auto flex w-fit -translate-x-1/2 translate-y-1/2 rounded-xl bg-white p-5 px-10 py-5 text-xs md:block md:rounded-[10px] md:text-base md:backdrop-blur-[10px]'
                                            }
                                            key={item.name}
                                            onClick={() => setOpen(true)}
                                        >
                                            <span
                                                className={
                                                    'whitespace-nowrap font-electrohub font-black text-[#1e1e1e]'
                                                }
                                            >
                                                {'Узнать подбробнее'}
                                            </span>
                                        </button>
                                    </div>
                                    <div
                                        className={
                                            'mt-14 text-[28px] font-black text-white md:hidden'
                                        }
                                    >
                                        {item.starting_price}
                                    </div>
                                    <div className='relative mt-4 text-white md:mb-[80px] md:mt-0'>
                                        <div
                                            className={
                                                'flex justify-between gap-7'
                                            }
                                        >
                                            <div
                                                className={
                                                    'hidden max-w-[170px] flex-col items-center justify-center rounded-[10px] bg-white/30 p-7 backdrop-blur-[10px] xl:flex'
                                                }
                                            >
                                                <Image
                                                    src={
                                                        getStrapiMedia(
                                                            prevItem?.logo?.data
                                                                ?.attributes
                                                                ?.url
                                                        )!
                                                    }
                                                    alt={prevItem?.name}
                                                    width={
                                                        prevItem?.logo?.data
                                                            ?.attributes?.width
                                                    }
                                                    height={
                                                        prevItem?.logo?.data
                                                            ?.attributes?.height
                                                    }
                                                />
                                                <div
                                                    className={
                                                        'hidden text-center font-electrohub font-bold capitalize text-[#1E1E1E] md:block'
                                                    }
                                                >
                                                    {prevItem?.name}
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    'grid w-full grid-cols-4 gap-[2px] md:w-auto md:grid-cols-5 xl:grid-cols-7'
                                                }
                                            >
                                                <div
                                                    className={
                                                        'hidden flex-col items-center justify-center gap-2 rounded-[10px] backdrop-blur-[10px]  md:mr-2 md:flex md:bg-white/30 md:px-5 md:py-7'
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            getStrapiMedia(
                                                                item?.logo?.data
                                                                    ?.attributes
                                                                    ?.url
                                                            )!
                                                        }
                                                        alt={item?.name}
                                                        width={
                                                            item?.logo?.data
                                                                ?.attributes
                                                                ?.width
                                                        }
                                                        height={
                                                            item?.logo?.data
                                                                ?.attributes
                                                                ?.height
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            'text-center font-electrohub text-xs font-bold capitalize text-[#1E1E1E] md:text-base'
                                                        }
                                                    >
                                                        {item?.name}
                                                    </div>
                                                </div>

                                                <div
                                                    className={
                                                        'flex flex-col items-center justify-center gap-4 text-xs md:rounded-l-[10px] md:bg-white/30 md:px-5 md:py-7 md:text-base md:backdrop-blur-[10px] '
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            '/mainsection_slider/engine.svg'
                                                        }
                                                        alt={'engine'}
                                                        width={46}
                                                        height={27}
                                                    />
                                                    <div
                                                        className={
                                                            'flex flex-col text-center font-electrohub text-white'
                                                        }
                                                    >
                                                        <span>Двигатель:</span>
                                                        <span
                                                            className={
                                                                'font-semibold'
                                                            }
                                                        >
                                                            {item?.engine}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        'flex flex-col items-center justify-center gap-4 text-xs md:bg-white/30 md:px-5 md:py-7 md:text-base md:backdrop-blur-[10px]'
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            '/mainsection_slider/range.svg'
                                                        }
                                                        alt={'range icon'}
                                                        width={39}
                                                        height={36}
                                                    />
                                                    <div
                                                        className={
                                                            'flex flex-col text-center font-electrohub text-white'
                                                        }
                                                    >
                                                        <span>
                                                            Запас хода:{' '}
                                                        </span>
                                                        <span
                                                            className={
                                                                'font-semibold'
                                                            }
                                                        >
                                                            {
                                                                item?.driving_range
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        'flex flex-col items-center justify-center gap-4 text-xs md:bg-white/30 md:px-5 md:py-7 md:text-base md:backdrop-blur-[10px]'
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            '/mainsection_slider/acceleration.svg'
                                                        }
                                                        alt={
                                                            'acceleration icon'
                                                        }
                                                        width={36}
                                                        height={36}
                                                    />
                                                    <div
                                                        className={
                                                            'flex flex-col text-center font-electrohub text-white'
                                                        }
                                                    >
                                                        <span>0-100 км/ч</span>
                                                        <span
                                                            className={
                                                                'font-semibold'
                                                            }
                                                        >
                                                            {item?.acceleration}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        'flex flex-col items-center justify-center gap-4 text-xs md:mr-2 md:rounded-r-[10px] md:bg-white/30 md:px-5 md:py-7 md:text-base md:backdrop-blur-[10px]'
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            '/mainsection_slider/weight.svg'
                                                        }
                                                        alt={'weight icon'}
                                                        width={50}
                                                        height={36}
                                                    />
                                                    <div
                                                        className={
                                                            'flex flex-col text-center font-electrohub text-white'
                                                        }
                                                    >
                                                        <span>Масса</span>
                                                        <span
                                                            className={
                                                                'font-semibold'
                                                            }
                                                        >
                                                            {item?.acceleration}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* <button
                                                    className={
                                                        'relative col-span-2 hidden w-full p-5 text-xs md:rounded-[10px] md:bg-white/60 md:text-base md:backdrop-blur-[10px] xl:block'
                                                    }
                                                    key={item.name}
                                                    onClick={() =>
                                                        setOpen(true)
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            'absolute left-5 top-5 text-sm font-black text-[#1e1e1e]'
                                                        }
                                                    >
                                                        {item.starting_price}
                                                    </span>
                                                    <span
                                                        className={
                                                            'whitespace-nowrap font-black text-[#1e1e1e]'
                                                        }
                                                    >
                                                        {'Консультация'}
                                                    </span>
                                                </button> */}
                                                <div className='relative col-span-2 h-full'>
                                                    <ModalTrigger
                                                        header={'Связь с нами'}
                                                        description={
                                                            'Наш специалист свяжется с Вами и ответит на все интересующие Вас вопросы.'
                                                        }
                                                        label={'Консультация'}
                                                        data={{
                                                            type: 'feedback',
                                                        }}
                                                        styles='relative col-span-2 hidden w-full h-full border-0 p-5 text-xs md:rounded-[10px] md:bg-white/60 md:text-base md:backdrop-blur-[10px] xl:block'
                                                    />
                                                    <span
                                                        className={
                                                            'absolute left-5 top-5 text-sm font-black text-[#1e1e1e]'
                                                        }
                                                    >
                                                        {item.starting_price}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    'ml-14 hidden max-w-[170px] flex-col items-center justify-center rounded-[10px] bg-white/30 p-7 text-xs backdrop-blur-[10px] md:text-base xl:flex'
                                                }
                                            >
                                                <Image
                                                    src={
                                                        getStrapiMedia(
                                                            nextItem?.logo?.data
                                                                ?.attributes
                                                                ?.url
                                                        )!
                                                    }
                                                    alt={nextItem?.name}
                                                    width={
                                                        nextItem?.logo?.data
                                                            ?.attributes?.width
                                                    }
                                                    height={
                                                        nextItem?.logo?.data
                                                            ?.attributes?.height
                                                    }
                                                />
                                                <div
                                                    className={
                                                        'hidden text-center font-electrohub font-bold capitalize text-[#1E1E1E] md:block'
                                                    }
                                                >
                                                    {nextItem?.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className={
                                                    'relative mt-3 hidden flex-col p-5 text-xs md:flex md:rounded-[10px] md:bg-white/60 md:text-base md:backdrop-blur-[10px] xl:hidden'
                                                }
                                                key={item.name}
                                                onClick={() => setOpen(true)}
                                            >
                                                <span
                                                    className={
                                                        'text-sm font-black text-[#1e1e1e]'
                                                    }
                                                >
                                                    {item.starting_price}
                                                </span>
                                                <span
                                                    className={
                                                        'whitespace-nowrap font-black text-[#1e1e1e]'
                                                    }
                                                >
                                                    {'Консультация'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                        );
                    })}
                </SplideTrack>
                <div className='splide__arrows'>
                    <button className='splide__arrow splide__arrow--prev bottom-0'>
                        <Image
                            src={'/left-arrow-slider.svg'}
                            alt={'prev slide'}
                            width={8}
                            height={14}
                        />
                    </button>
                    <button
                        style={{ bottom: 0 }}
                        className='splide__arrow splide__arrow--next'
                    >
                        <Image
                            src={'/right-arrow-slider.svg'}
                            alt={'prev slide'}
                            width={8}
                            height={14}
                        />
                    </button>
                </div>
            </Splide>
            <ModalComponent
                header={'Связь с нами'}
                description={
                    'Наш специалист свяжется с Вами и ответит на все интересующие Вас вопросы.'
                }
            />
        </>
    );
}
