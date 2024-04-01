import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/utils/api-helpers';

type Props = {
    data: {
        height: number;
        width: number;
        url: string;
    };
};
export default function Logo({ data }: Props) {
    return (
        <>
            {data?.height && data?.width && data?.url ? (
                <Link
                    href={'/'}
                    className={`relative h-[24px] w-[110px] md:h-[${data?.height}px] md:w-[${data?.width}px]`}
                >
                    <Image
                        src={getStrapiMedia(data?.url)!}
                        priority={true}
                        alt='Logo'
                        fill
                    />
                </Link>
            ) : null}
        </>
    );
}
