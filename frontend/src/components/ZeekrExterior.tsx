'use client';
import { getDataFromAPI } from '@/utils/fetch-api';
import { Divide } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useEffect } from 'react';
import { ColorPicker } from '@/components/Zeekr/ColorPicker';
import { getStrapiMedia } from '@/utils/api-helpers';

type Props = {
    data: {
        title: string;
        subtitle: string;
        description: string;
        btn: Button[];
        color: ColorOption[];
        advantage: Advantage[];
    };
};
interface Advantage {
    id: number;
    title: string;
    description: string;
}
interface ImageData {
    id: number;
    attributes: {
        url: string;
        width: number;
        height: number;
    };
}
type Button = {
    id: number;
    text: string;
    icon: {
        data: ImageData;
    };
};
export interface ColorOption {
    id: number;
    color: string;

    image: {
        data: ImageData;
    };
}
export default function ZeekrExterior(props: Props) {
    const locale = useLocale;
    const { data } = props;

    return (
        <div className='bg-white font-electrohub'>
            <div className='container py-12 md:py-20'>
                <Image
                    src={'/zeekr_exterior_logo.png'}
                    width={280}
                    height={60}
                    className={'mx-auto md:mx-0'}
                    alt='zeekr exterior logo'
                />
                <div className='mt-8 flex w-full flex-col gap-12 md:gap-16 lg:gap-24 xl:flex-row xl:gap-32'>
                    <div className='xl:w-[50%]'>
                        <ColorPicker options={data?.color} />
                    </div>
                    <div className='xl:w-[40%]'>
                        <h3 className='text-[16px] font-extrabold uppercase text-[#1e1e1e]'>
                            {data?.subtitle}
                        </h3>
                        <h2 className='mt-3 text-[26px] font-extrabold leading-tight text-[#1e1e1e] md:mt-5 md:text-[24px] lg:text-[26px] xl:text-[32px]'>
                            {data?.title}
                        </h2>
                        <div className={'mt-6 md:mt-10 lg:mt-12 2xl:mt-16'}>
                            {data?.description}
                        </div>
                        <div className='mt-6 flex w-full flex-col gap-5 md:mt-10 md:flex-row lg:mt-16'>
                            {data?.btn?.map((btn) => (
                                <button
                                    key={btn.text}
                                    className={
                                        'flex w-full items-center justify-center space-x-2 rounded-sm border-[2px] border-[#1e1e1e] py-3 text-lg md:w-1/2 md:py-4'
                                    }
                                >
                                    <span>{btn.text}</span>
                                    <Image
                                        src={
                                            getStrapiMedia(
                                                btn?.icon?.data?.attributes?.url
                                            )!
                                        }
                                        alt={btn.text}
                                        width={
                                            btn?.icon?.data?.attributes?.width
                                        }
                                        height={
                                            btn?.icon?.data?.attributes?.height
                                        }
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className={
                        'xl:gap-x-18 2xl:gap-x-26 mt-10 grid place-items-center gap-y-10 sm:mt-12 lg:mt-20 xl:grid-cols-4 2xl:grid-cols-4'
                    }
                >
                    {data?.advantage?.map((advantage) => (
                        <div
                            key={advantage.id}
                            className='flex flex-col items-center'
                        >
                            <h4 className='text-[28px] font-bold text-[#3E4247] xl:text-[32px]'>
                                {advantage.title}
                            </h4>
                            <p className='text-center text-[18px] text-[#3E4247]'>
                                {advantage.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
