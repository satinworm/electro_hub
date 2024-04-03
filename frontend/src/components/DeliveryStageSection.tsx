'use client';
import { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from '@/components/ui/EmblaCarouselDotButton';

type Props = {
    data: any;
};
type StageCard = {
    id: number;
    title: string;
    description: string;
};

const options = {};
export default function DeliveryStageSection(props: Props) {
    const [windowWidth, setWindowWidth] = useState(0);
    const { data } = props;
    const h1 = data?.heading?.[0]?.h1;
    const h2 = data?.heading?.[0]?.h2;
    const h3 = data?.heading?.[0]?.h3;
    const stagesCardsData = data?.stage_card;

    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            window.addEventListener('resize', () => {
                setWindowWidth(window.innerWidth);
            });
        }
        return () => {
            window.removeEventListener('resize', () => {
                setWindowWidth(window.innerWidth);
            });
        };
    }, []);

    return (
        <>
            <section className='-mt-5 mb-12 flex min-h-[680px] w-full flex-col bg-white bg-main_stage_bg bg-cover bg-no-repeat pb-16 font-electrohub text-white md:-mt-16 lg:mb-16'>
                <div className='z-[1] h-[38px] w-full bg-rectangle_main_stage_mobile bg-cover bg-no-repeat md:mt-[0px] md:h-[52px] md:bg-rectangle_main_stage' />
                <div className='container mt-12 sm:mt-16 md:mt-24'>
                    {h3 && <h3 className='font-black'>{h2}</h3>}
                    {h1 && h2 && (
                        <div className='mt-3 flex flex-col gap-3 md:mt-5 lg:gap-5'>
                            <span
                                className={
                                    'text-base font-bold leading-tight sm:text-lg md:text-2xl lg:max-w-[720px] lg:text-2xl lg:text-[32px]'
                                }
                            >
                                {h1}
                            </span>
                            <span
                                className={
                                    'hidden leading-tight lg:block lg:max-w-[720px] lg:text-[16px]'
                                }
                            >
                                {h3}
                            </span>
                        </div>
                    )}
                </div>
                {windowWidth > 768 ? (
                    <div className='container mb-3 mt-12 grid grid-cols-1 gap-3 md:mb-8 md:mt-20 md:gap-5 lg:mb-16 lg:grid-cols-3 lg:gap-6 xl:gap-10'>
                        {stagesCardsData?.map(
                            (stageCard: StageCard, index: number) => (
                                <div
                                    className={
                                        'rounded-[10px] px-4 py-3 pb-8 text-white md:px-4 md:py-4 md:pb-12 lg:px-6 lg:py-5 lg:pb-20 xl:px-7'
                                    }
                                    style={{
                                        backdropFilter: 'blur(10px)',
                                        background:
                                            'linear-gradient(135deg, rgba(128, 128, 128, 0.8) 0%, rgba(30, 30, 30, 0.8) 100%)',
                                    }}
                                    key={stageCard.id}
                                >
                                    <p
                                        className={
                                            'text-right font-terminatorgen text-[80px] leading-[0.8] text-[#808080]'
                                        }
                                    >
                                        0{index + 1}
                                    </p>
                                    <p
                                        className={
                                            'font-electrohub text-[20px] font-bold leading-tight tracking-tight md:text-[22px]'
                                        }
                                    >
                                        {stageCard.title}
                                    </p>
                                    <p
                                        className={
                                            'mt-5 font-electrohub text-[16px] leading-tight md:text-[18px]'
                                        }
                                    >
                                        {stageCard.description}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <Carousel className='mt-3 w-full max-w-full px-3'>
                        <CarouselContent>
                            {stagesCardsData?.map(
                                (stageCard: StageCard, index: number) => (
                                    <CarouselItem
                                        key={stageCard.id}
                                        className={'h-full'}
                                    >
                                        <div
                                            className={
                                                'rounded-[10px] px-4 py-3 pb-8 text-white md:px-4 md:py-4 md:pb-12 lg:px-6 lg:py-5 lg:pb-20 xl:px-7'
                                            }
                                            style={{
                                                backdropFilter: 'blur(10px)',
                                                background:
                                                    'linear-gradient(135deg, rgba(128, 128, 128, 0.8) 0%, rgba(30, 30, 30, 0.8) 100%)',
                                            }}
                                            key={stageCard.id}
                                        >
                                            <p
                                                className={
                                                    'text-right font-terminatorgen text-[54px] leading-[0.8] text-[#808080] md:text-[80px]'
                                                }
                                            >
                                                0{index + 1}
                                            </p>
                                            <p
                                                className={
                                                    'font-electrohub text-[20px] font-bold leading-tight tracking-tight md:text-[22px]'
                                                }
                                            >
                                                {stageCard.title}
                                            </p>
                                            <p
                                                className={
                                                    'mt-5 font-electrohub text-[15px] leading-tight md:text-[18px]'
                                                }
                                            >
                                                {stageCard.description}
                                            </p>
                                        </div>
                                    </CarouselItem>
                                )
                            )}
                        </CarouselContent>
                        <div
                            className={'mt-2 flex w-full justify-center gap-5'}
                        >
                            <CarouselPrevious className={''} />
                            <CarouselNext className={''} />
                        </div>
                    </Carousel>
                )}
            </section>
        </>
    );
}
