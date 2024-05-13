'use client';
import { Options } from '@splidejs/splide';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Loader } from '@/components/Loader';
import { getStrapiMedia } from '@/utils/api-helpers';

// type Image = {
//     id: string;
//     attributes: {
//         src: string;
//         width: number;
//         height: number;
//     };
// };

export default function GalleryComponent({ photos }: any) {
    const mainRef = useRef<Splide>(null);
    const thumbsRef = useRef<Splide>(null);
    console.log('photos ', photos);

    const mainOptions: Options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '0',
        pagination: false,
        arrows: false,
    };

    const thumbsOptions: Options = {
        type: 'slide',
        rewind: true,
        gap: '1rem',
        pagination: false,
        fixedWidth: 110,
        fixedHeight: 70,
        cover: true,
        focus: 'center',
        arrows: false,
        isNavigation: true,
    };
    useEffect(() => {
        if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
            mainRef.current.sync(thumbsRef.current.splide);
        }
    }, []);

    function renderSlides() {
        if (!photos?.data) {
            return (
                <SplideSlide className={'w-full'} key={'no photos'}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='mx-auto h-20 w-20'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        />
                    </svg>
                </SplideSlide>
            );
        }
        return photos?.data?.map((slide: any) => {


            return (
                <SplideSlide className={'w-full flex items-center justify-center'} key={slide.id}>
                    <Image
                        src={getStrapiMedia(slide.attributes.url)!}
                        alt={slide.attributes.src}
                        width={slide.attributes.width}
                        height={slide.attributes.height}
                        className={'mx-auto my-auto'}
                    />
                </SplideSlide>
            );
        });
    }

    return (
        <div>
            {photos?.data && photos.data.length > 0 ? (
                <>
                    <Splide
                        options={mainOptions}
                        ref={mainRef}
                        className={'overflow-hidden'}
                        aria-labelledby='thumbnail-slider-example'
                    >
                        {renderSlides()}
                    </Splide>

                    <Splide
                        options={thumbsOptions}
                        ref={thumbsRef}
                        className={'my-4 flex w-full overflow-hidden'}
                        aria-label='The carousel with thumbnails. Selecting a thumbnail will change the main carousel'
                    >
                        {renderSlides()}
                    </Splide>
                </>
            ) : (
                <div className='flex h-full w-full items-center justify-center'>
                    <Image
                        src={'/image_not_found.jpeg'}
                        alt='image not found'
                        width={400}
                        height={400}
                        className='mx-auto my-auto rounded-xl'
                    />
                </div>
            )}
        </div>
    );
}
