'use client';
import '../app/embla.css';
import { LazyLoadImage } from '@/components/ui/LazyLoadNewComponent';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { getStrapiMedia } from '@/utils/api-helpers';
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from '@/components/Embla Carousel Arrow Buttons';
import {
    DotButton,
    useDotButton,
} from '@/components/ui/EmblaCarouselDotButton';

type Item = {
    id: number;
    attributes: {
        title: string;
        description: string;
        header: string;
        date: string;
        btn: string;
        image: {
            data: {
                attributes: {
                    url: string;
                    width: number;
                    height: number;
                };
            };
        };
    };
};
type Data = {
    data: {
        data: Item[];
    };
};
const options = {};
export default function NewsSection({ data }: Data) {
    const [emblaRed, emblaApi] = useEmblaCarousel(options);
    const [slidesInView, setSlidesInView] = useState<number[]>([]);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
        setSlidesInView((slidesInView) => {
            if (slidesInView.length === emblaApi.slideNodes().length) {
                emblaApi.off('slidesInView', updateSlidesInView);
            }
            const inView = emblaApi
                .slidesInView()
                .filter((index) => !slidesInView.includes(index));
            return slidesInView.concat(inView);
        });
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        updateSlidesInView(emblaApi);
        emblaApi.on('slidesInView', updateSlidesInView);
        emblaApi.on('reInit', updateSlidesInView);
    }, [emblaApi, updateSlidesInView]);
    return (
        <section className='mt-[-39px] flex w-full flex-col bg-white bg-cover bg-no-repeat py-2 font-electrohub text-white md:-mt-16 xl:py-24'>
            <div className={'container'}>
                <h2 className='mb-10 text-center text-4xl font-bold'>
                    Новости
                </h2>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-2'></div>
                <div className='embla'>
                    <div className='embla__viewport' ref={emblaRed}>
                        <div className='embla__container'>
                            {data?.data?.map((item: Item, index: number) => (
                                <LazyLoadImage
                                    key={index}
                                    index={index}
                                    header={item?.attributes?.header}
                                    title={item?.attributes?.title}
                                    date={item?.attributes?.date}
                                    description={item?.attributes?.description}
                                    width={
                                        item?.attributes?.image?.data
                                            ?.attributes?.width!
                                    }
                                    height={
                                        item.attributes?.image?.data?.attributes
                                            ?.height!
                                    }
                                    imgSrc={
                                        getStrapiMedia(
                                            item?.attributes?.image?.data
                                                ?.attributes?.url
                                        )!
                                    }
                                    btn={item?.attributes?.btn}
                                    inView={slidesInView.indexOf(index) > -1}
                                />
                            ))}
                        </div>
                        <div className='embla__controls'>
                            <div className='embla__buttons flex scale-75 items-center justify-center gap-x-5 md:scale-100 lg:hidden'>
                                <PrevButton
                                    onClick={onPrevButtonClick}
                                    disabled={prevBtnDisabled}
                                />
                                <NextButton
                                    onClick={onNextButtonClick}
                                    disabled={nextBtnDisabled}
                                />
                            </div>

                            <div className='embla__dots hidden w-full justify-center gap-4 lg:flex'>
                                {scrollSnaps.map((_, index) => (
                                    <DotButton
                                        key={index}
                                        onClick={() => onDotButtonClick(index)}
                                        className={'embla__dot'.concat(
                                            index === selectedIndex
                                                ? ' embla__dot--selected'
                                                : ''
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
