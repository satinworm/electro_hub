import SocialLinks from '@/components/SocialLinks';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import React, { Suspense } from 'react';
import ActionButtons, { ButtonFromProps } from '@/components/ActionButtons';
import MainSectionSlider from './MainSectionslider';
import { MainSectionSliderTypes } from '@/types/mainsection.types';

type Link = {
    id: number;
    name: string;
    href: string;
};

type Props = {
    title: string;
    description: string;
    subTitle: string;
    bg: string;
    buttons: ButtonFromProps[];
    data?: MainSectionSliderTypes;
};

export default function MainSection(props: Props) {
    const { title, description, subTitle, bg, buttons, data } = props;
    const exist = data?.items && data?.items?.length > 0;
    console.log('data', data);
    const t = useTranslations('MainSection');
    return (
        <>
            {!exist ? (
                <>
                    <div
                        className={cn(
                            `${bg} mx-auto w-full bg-center bg-no-repeat md:bg-cover`
                        )}
                    >
                        <div className='item-center container relative flex h-full min-h-[98vh] w-full flex-col justify-end'>
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

                                    <div className='hidden gap-5 font-electrohub font-bold text-white lg:flex'>
                                        <span className='pt-8'>
                                            {t('scroll_down')}
                                        </span>
                                        <Image
                                            src={'/scroll.svg'}
                                            alt={'scroll'}
                                            width={14}
                                            height={68}
                                            className='animate-bounce'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                //
                <div className={'h-[98vh] w-full'}>
                    <Suspense
                        fallback={
                            <div
                                className={cn(
                                    `${bg} mx-auto w-full bg-center bg-no-repeat md:bg-cover`
                                )}
                            >
                                <div className='item-center container relative flex h-full min-h-[98vh] w-full flex-col justify-end'>
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

                                            <div className='hidden gap-5 font-electrohub font-bold text-white lg:flex'>
                                                <span className='pt-8'>
                                                    {t('scroll_down')}
                                                </span>
                                                <Image
                                                    src={'/scroll.svg'}
                                                    alt={'scroll'}
                                                    width={14}
                                                    height={68}
                                                    className='animate-bounce'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <MainSectionSlider props={props} />
                    </Suspense>
                </div>
            )}
        </>
    );
}
