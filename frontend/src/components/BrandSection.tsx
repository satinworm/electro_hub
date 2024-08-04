import { getStrapiMedia } from '@/utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import React from 'react';

type Props = {
    brands: any;
    data: any;
};
export default function BrandSection(props: Props) {
    const { brands, data } = props;
    const locale = useLocale();
    // const { h1, h2, h3, btn } = data?.heading[0];
    const h1 = data?.heading?.[0]?.h1;
    const h2 = data?.heading?.[0]?.h2;
    const h3 = data?.heading?.[0]?.h3;
    const btn = data?.heading?.[0]?.btn;
    return (
        <section className="flex w-full flex-col bg-white py-4 font-electrohub text-black xl:py-10">
            <div className="z-[1] mt-[-38px] h-[38px] w-full bg-rectangle_main_mobile bg-cover bg-no-repeat md:-mt-[48px] md:h-[48px] md:bg-rectangle_main" />
            <div className="container mt-10 text-black">
                <h3 className="text-sm font-black text-[#1e1e1e] md:text-base">
                    {h3}
                </h3>
                <div className="mt-2 flex items-center justify-between md:mt-5">
                    <span
                        className={
                            'text-xl font-bold leading-tight text-[#1e1e1e] sm:text-2xl lg:max-w-[720px] lg:text-[32px]'
                        }
                    >
                        {h1}
                    </span>
                    <span
                        className={
                            'hidden text-center leading-tight text-[#1e1e1e] md:text-right lg:block lg:max-w-[720px] lg:text-[16px]'
                        }
                    >
                        {h2}
                    </span>
                </div>
            </div>
            <div className="container mt-6  grid grid-cols-2 gap-5 md:mt-12 md:gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6 xl:gap-10 2xl:grid-cols-4">
                {brands?.data?.map((brand: any) => {
                    const {
                        logo,
                        name,
                        slug: brandSlug,
                        image,
                    } = brand.attributes;
                    const {
                        url: logoUrl,
                        width: logoWidth,
                        height: logoHeight,
                        slug,
                    } = logo.data.attributes;
                    const {
                        url: imageUrl,
                        width: imageWidth,
                        height: imageHeight,
                    } = image.data.attributes;
                    return (
                        <Link
                            key={brand.id}
                            href={`/${brandSlug}`}
                            className="group relative flex cursor-pointer flex-col rounded-xl bg-white p-2 py-6 shadow-[0_4px_15px_2px_rgba(0,0,0,0.1)] transition hover:scale-95 hover:shadow-brandCardHover md:py-2"
                        >
                            <div className=" flex h-full w-full flex-col items-start ">
                                <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-3 md:flex-row md:justify-start ">
                                    <Image
                                        src={getStrapiMedia(logoUrl)!}
                                        alt={name}
                                        width={logoWidth}
                                        height={logoHeight}
                                        className={'scale-75 md:scale-100'}
                                    />
                                    <span
                                        className={
                                            'brandHeading mt-4 hidden font-electrohubHeading font-semibold text-black sm:text-[24px] md:mt-0 md:block md:text-[28px] xl:text-[32px]'
                                        }
                                    >
                                        {name}
                                    </span>
                                    <span
                                        className={
                                            'mt-4 font-electrohubHeading font-semibold text-black sm:text-[24px] md:mt-0 md:hidden md:text-[28px] xl:text-[32px]'
                                        }
                                    >
                                        {name}
                                    </span>
                                </div>
                                <Image
                                    src={getStrapiMedia(imageUrl)!}
                                    alt={name}
                                    width={imageWidth}
                                    height={imageHeight}
                                    className={
                                        '-mt-10 ml-auto hidden scale-75 md:block md:scale-100'
                                    }
                                />
                            </div>
                            <div className="group relative ml-5 hidden min-h-[41px] w-full max-w-[205px] items-center rounded-[10px] border border-[#1e1e1e] pl-5 pr-10 text-[#1e1e1e] transition-all duration-300 group-hover:bg-black md:flex  md:text-base">
                                <div
                                    className={
                                        'text-[12px] text-[#1e1e1e] transition group-hover:text-white'
                                    }
                                >
                                    {btn}
                                </div>
                                <div
                                    className={
                                        'absolute -right-[1px] top-0 flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border border-[#1e1e1e] bg-black'
                                    }
                                >
                                    <svg
                                        width="10"
                                        height="14"
                                        viewBox="0 0 10 14"
                                        fill="none"
                                        className={'flex'}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 13L9 7L1 1"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
