'use client';
import { CarConstructorResponse } from '@/types/zeekr-constructor';
import Image from 'next/image';
import { getStrapiMedia } from '@/utils/api-helpers';

export default function ConfigurationForm({
    defaultData,
}: {
    defaultData: CarConstructorResponse;
}) {
    const logo = defaultData?.data?.[0]?.attributes?.logo;
    return (
        <div className={'p-10'}>
            {logo && (
                <Image
                    src={getStrapiMedia(logo?.data.attributes?.url)!}
                    alt={'Zeekr Logo'}
                    width={logo?.data.attributes?.width}
                    height={logo?.data.attributes?.height}
                />
            )}
        </div>
    );
}
