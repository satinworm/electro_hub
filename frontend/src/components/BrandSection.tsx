import { getStrapiMedia } from '@/utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

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
        <section className='mt-[-1px] flex w-full flex-col bg-white py-4 font-electrohub text-black xl:py-10'>
            <div className='container mt-10 text-black'>
                <h3 className='text-sm font-black text-[#1e1e1e] md:text-base'>
                    {h3}
                </h3>
                <div className='mt-2 flex items-center justify-between md:mt-5'>
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
            <div className='container mt-6 grid grid-cols-2 gap-5 md:mt-12 md:gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6 xl:gap-10 2xl:grid-cols-4'>
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
                            style={{
                                borderRadius: '10px',
                                background:
                                    'linear-gradient(135deg, #e4e4e4 0%, #c2cae1 100%)',
                            }}
                            className='group flex cursor-pointer flex-col items-center p-2 px-3 shadow-brandCard transition hover:scale-95 hover:shadow-brandCardHover md:px-3 md:py-2 lg:px-5 lg:pb-5 lg:pt-12'
                        >
                            <div className='flex h-full w-full flex-col items-center justify-evenly md:flex-row'>
                                <div className='flex items-center gap-2'>
                                    <Image
                                        src={getStrapiMedia(logoUrl)!}
                                        alt={name}
                                        width={logoWidth}
                                        height={logoHeight}
                                        className={'scale-75 md:scale-100'}
                                    />
                                    <span
                                        className={
                                            'text-[16px] font-bold text-[#1e1e1e]'
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
                                    className={'scale-75 md:scale-100'}
                                />
                            </div>
                            <div className='mt-2 w-full border-t-[2px] border-[#1e1e1e] py-2 text-center text-xs text-[#1e1e1e] sm:pt-4 md:mt-6 md:pt-4 md:text-base'>
                                {btn}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
