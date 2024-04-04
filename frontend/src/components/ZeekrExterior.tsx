'use client';
import { getDataFromAPI } from '@/utils/fetch-api';
import { Divide } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useEffect } from 'react';
import { ColorPicker } from '@/components/Zeekr/ColorPicker';

type Props = {
    data: {
        title: string;
        subtitle: string;
        color: ColorOption[];
    };
};
interface ImageData {
    id: number;
    attributes: {
        url: string;
        width: number;
        height: number;
    };
}

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

    console.log('opa', data);
    return (
        <div className='bg-white font-electrohub'>
            <div className='container md:py-20'>
                <Image
                    src={'/zeekr_exterior_logo.png'}
                    width={280}
                    height={60}
                    alt='zeekr exterior logo'
                />
                <div className='mt-8 flex w-full gap-32'>
                    <div className='w-[50%]'>
                        <ColorPicker options={data?.color} />
                    </div>
                    <div className='w-[40%]'>
                        <h3 className='text-[16px] font-extrabold uppercase text-[#1e1e1e]'>
                            {data?.subtitle}
                        </h3>
                        <h2 className='mt-5 text-[32px] font-extrabold leading-tight text-[#1e1e1e]'>
                            {data?.title}
                        </h2>
                        <div className={'mt-20'}>{data?.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
