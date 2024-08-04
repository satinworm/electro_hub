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
                    className={`relative flex min-h-[24px] items-center md:min-h-[${data?.height}px] min-w-[${data?.width}px]`}
                >
                    <Image
                        src={getStrapiMedia(data?.url)!}
                        priority={true}
                        alt="Logo"
                        width={160}
                        height={30}
                    />
                </Link>
            ) : null}
        </>
    );
}
