'use client';

// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { cn } from '@/lib/utils';
import ActionButtons, { ButtonFromProps } from '@/components/ActionButtons';
import React from 'react';
import { MainSectionSliderTypes } from '@/types/mainsection.types';
import { getStrapiMedia } from '@/utils/api-helpers';
import Image from 'next/image';
import ModalComponent from '@/components/ModalComponent';
import { DialogStore } from '@/stores/dialog.store';

type Props = {
    title: string;
    description: string;
    subTitle: string;
    bg: string;
    buttons: ButtonFromProps[];
    data?: MainSectionSliderTypes;
};

export default function MainSectionSlider({ props }: { props: Props }) {
    const { setOpen } = DialogStore();
    const { title, description, subTitle, bg, buttons, data } = props;
    console.log('slider ', data);
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

    return (
        <>
            <Splide
                className={'max-h-[98vh] w-full font-electrohub'}
                hasTrack={false}
                options={{
                    type: 'fade',
                    // heightRatio: 0.98,
                    pagination: true,
                    arrows: true,
                    // autoplay: true,
                    interval: 5000,
                    rewind: true,
                    pauseOnHover: true,
                    // pauseOnFocus: true,
                    resetProgress: false,
                    // resetProgress: false,
                    lazyLoad: 'nearby',
                    speed: 1000,
                    gap: 0,
                }}
            >
                <SplideTrack>
                    {data?.items?.map((item, index) => {
                        const bgUrl = getStrapiMedia(
                            item.main_image.data.attributes.url
                        );
                        const prevItem = getPrevItem(data.items, item);
                        const nextItem = getNextItem(data.items, item);
                        console.log('prevItem', prevItem);

                        return (
                            <SplideSlide
                                key={index}
                                className={cn(
                                    `w-full bg-center bg-no-repeat px-[1rem] md:bg-cover md:px-[1.5rem] lg:px-[2rem]`
                                )}
                                style={{
                                    backgroundImage: `url(${bgUrl})`,
                                }}
                            >
                                <div className='item-center relative flex min-h-[98vh] w-full flex-col justify-end '>
                                    {/*<SocialLinks />*/}
                                    <div className='absolute left-1/2 top-1/4 flex -translate-x-1/2 -translate-y-2/3 flex-col items-center justify-center space-y-3 md:mb-[15%] md:space-y-5'>
                                        <div className='px-4 text-center font-terminatorgen text-[52px] leading-[1] tracking-[0.2em] text-white md:text-[80px] lg:whitespace-nowrap lg:text-[92px] xl:text-[112px] 2xl:text-[128px]'>
                                            {item?.name}
                                        </div>
                                    </div>
                                    <div className='relative mb-[80px] text-white'>
                                        <div
                                            className={
                                                'flex justify-between gap-7'
                                            }
                                        >
                                            <div
                                                className={
                                                    'flex max-w-[170px] flex-col items-center justify-center rounded-[10px] bg-white/30 p-7 backdrop-blur-[10px]'
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
                                                        'text-center font-electrohub font-bold capitalize text-[#1E1E1E]'
                                                    }
                                                >
                                                    {prevItem?.name}
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    'grid grid-cols-7 gap-[2px]'
                                                }
                                            >
                                                <div
                                                    className={
                                                        'mr-2 flex flex-col items-center justify-center gap-2 rounded-[10px] bg-white/30 px-5 py-7 backdrop-blur-[10px]'
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
                                                            'text-center font-electrohub font-bold capitalize text-[#1E1E1E]'
                                                        }
                                                    >
                                                        {item?.name}
                                                    </div>
                                                </div>

                                                <div
                                                    className={
                                                        'flex flex-col items-center justify-center  gap-4 rounded-l-[10px] bg-white/30 px-5 py-7 backdrop-blur-[10px]'
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
                                                        'flex flex-col items-center justify-center gap-4 bg-white/30 px-5 py-7 backdrop-blur-[10px]'
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
                                                        'flex flex-col items-center justify-center gap-4 bg-white/30 px-5 py-7 backdrop-blur-[10px]'
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
                                                        'mr-2 flex flex-col items-center justify-center gap-4 rounded-r-[10px] bg-white/30 px-5 py-7 backdrop-blur-[10px]'
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
                                                <button
                                                    className={
                                                        'relative col-span-2 w-full rounded-[10px] bg-white/60 p-5 backdrop-blur-[10px]'
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
                                                </button>
                                            </div>
                                            <div
                                                className={
                                                    'ml-14 flex max-w-[170px] flex-col items-center justify-center rounded-[10px] bg-white/30 p-7 backdrop-blur-[10px]'
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
                                                        'text-center font-electrohub font-bold capitalize text-[#1E1E1E]'
                                                    }
                                                >
                                                    {nextItem?.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                        );
                    })}
                    <SplideSlide>
                        <div
                            className={cn(
                                `${bg} w-full bg-center bg-no-repeat md:bg-cover`
                            )}
                        >
                            <div className='item-center relative flex h-full min-h-[98vh] w-full flex-col justify-end px-[1rem] md:px-[1.5rem] lg:px-[2rem]'>
                                {/*<SocialLinks />*/}
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
                            </div>
                        </div>
                    </SplideSlide>
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
