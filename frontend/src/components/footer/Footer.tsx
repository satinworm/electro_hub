import { getDataFromAPI } from '@/utils/fetch-api';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export async function Footer({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'Footer' });
    const pageProperties = await getDataFromAPI('footers', null, locale);

    if (
        !pageProperties ||
        !pageProperties.data ||
        pageProperties.data.length === 0
    ) {
        // Обработка случая, когда данные отсутствуют или невалидны
        return;
    }
    const title = pageProperties?.data?.[0]?.attributes?.title;
    const footer_Links = pageProperties?.data?.[0]?.attributes?.footer_links;
    const brands_links = pageProperties?.data?.[0]?.attributes?.brands_links;
    const social_links = pageProperties?.data?.[0]?.attributes?.social_links;
    const mergedLinks = [...footer_Links, ...brands_links];

    console.log('footer_Links', mergedLinks);
    return (
        <footer className='flex w-full flex-col bg-[#F0F0F0] py-12 font-electrohub text-white md:px-3 md:py-12 lg:py-16 xl:py-24'>
            <div className={'container'}>
                <div
                    className={
                        'w-full grid-cols-6 justify-items-stretch sm:grid md:gap-5'
                    }
                >
                    <div
                        className={
                            'flex flex-col gap-3 sm:col-span-6 xl:col-span-2'
                        }
                    >
                        <div
                            className={
                                'max-w-[576px] text-xl font-bold leading-tight text-[#1e1e1e] md:text-[32px]'
                            }
                        >
                            {title}
                        </div>
                        <button
                            type={'button'}
                            className={
                                'flex w-full items-center justify-center gap-2 border border-black bg-white px-12 py-2 text-lg text-sm font-bold text-black md:w-fit md:py-3.5 md:text-base lg:mt-10'
                            }
                        >
                            <div>{t('callback')}</div>
                            <ChevronRight color={'black'} />
                        </button>
                    </div>
                    <div
                        className={
                            'mt-5 grid grid-flow-col grid-rows-12 gap-x-1.5 gap-y-3 sm:col-span-6 sm:grid-rows-8 sm:gap-4 md:col-span-3 md:mt-0'
                        }
                    >
                        {mergedLinks.map((link: any, index: number) => (
                            <Link
                                href={link.href}
                                key={index}
                                className={cn(
                                    'text-sm font-bold text-[#1e1e1e] md:text-base lg:text-lg',
                                    link.name === 'Telegram'
                                        ? 'col-start-1'
                                        : ''
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div
                        className={
                            'mt-3 grid grid-flow-col grid-rows-2 gap-4 sm:col-span-6 md:col-span-1 md:mt-0 md:grid-rows-8'
                        }
                    >
                        {social_links.map((link: any, index: number) => (
                            <Link
                                href={link.href}
                                key={index}
                                className={cn(
                                    'text-sm font-bold text-[#1e1e1e] md:text-base lg:text-lg'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div
                    className={
                        'mt-6 flex w-full items-center justify-between border-t-[3px] border-white pt-6'
                    }
                >
                    <div className={'text-[#808080]'}>
                        Electrohub © 2024 {t('rights')}
                    </div>
                    <div className={'flex gap-2'}>
                        <Image
                            src={'/globus.svg'}
                            width={20}
                            height={20}
                            alt={'globus'}
                        />
                        <span className={'font-bold text-[#808080]'}>
                            Belarus, Grodno
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
