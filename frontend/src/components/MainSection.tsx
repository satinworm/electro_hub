import SocialLinks from '@/components/SocialLinks';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function MainSection() {
    const t = useTranslations('MainSection');
    return (
        <div className='mx-auto w-full bg-main_mobile bg-cover bg-no-repeat md:bg-main md:bg-cover'>
            <div className='item-center container relative flex h-full min-h-[98vh] w-full flex-col justify-end'>
                <SocialLinks />
                <div className='mb-[25%] flex flex-col items-center justify-center space-y-3 md:mb-[15%] md:space-y-5'>
                    <div className='px-4 text-center font-terminatorgen text-[52px] leading-[1] tracking-[0.2em] text-white md:text-[80px] lg:text-[128px]'>
                        electro hub
                    </div>
                    <div className='text-center font-electrohub text-[15px] font-bold text-white md:text-[20px]'>
                        {t('heading_description')}
                    </div>
                </div>
                <div className='mb-[140px] text-white'>
                    <div className='hidden max-w-2xl text-center font-electrohub text-[16px] font-bold text-white md:block md:text-left md:text-2xl'>
                        {t('text_description')}
                    </div>
                    <div className='mt-7 flex w-full justify-between'>
                        <div className='flex w-full flex-col gap-5 md:w-auto md:flex-row'>
                            <button
                                type={'button'}
                                className='flex w-full items-center justify-center gap-5 rounded-none border-white bg-white px-12 py-3 font-electrohub text-lg font-bold text-black md:max-w-[370px]'
                            >
                                <span className={'whitespace-nowrap'}>
                                    {t('btn_catalog')}
                                </span>
                                <Image
                                    src={'/catalog.svg'}
                                    alt={''}
                                    width={20}
                                    height={17}
                                />
                            </button>
                            <button
                                type={'button'}
                                className='flex w-full items-center justify-center gap-5 rounded-none border border-white bg-transparent px-12 py-3 font-electrohub text-lg font-bold text-white'
                            >
                                <span className={'whitespace-nowrap'}>
                                    {t('btn_consultation')}
                                </span>
                                <Image
                                    src={'/consultation.svg'}
                                    alt={''}
                                    width={20}
                                    height={17}
                                />
                            </button>
                        </div>
                        <div className='hidden gap-5 font-electrohub font-bold text-white lg:flex'>
                            <span className='pt-8'>{t('scroll_down')}</span>
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
            <div className='z-[1] mt-[-38px] h-[38px] w-full bg-rectangle_main_mobile bg-cover bg-no-repeat md:mt-[-48px] md:h-[48px] md:bg-rectangle_main' />
        </div>
    );
}
