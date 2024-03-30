import Image from 'next/image';
import { getStrapiMedia } from '@/utils/api-helpers';
import { Car, NewArrivalResponse } from '@/types/NewArrivals-types';

export default function NewArrivals({ newArrivalsModels, data }: any) {
    const h1 = data?.heading?.[0]?.h1;
    const h2 = data?.heading?.[0]?.h2;
    const h3 = data?.heading?.[0]?.h3;
    const btn = data?.heading?.[0]?.btn;
    return (
        <section className='-mt-1 flex w-full flex-col bg-white pt-3 font-electrohub text-black md:px-8 md:pt-12 xl:py-10'>
            <div className='container text-black'>
                <h3 className='font-black text-[#1e1e1e]'>{h2}</h3>
                <div className='mt-5 flex items-center justify-between'>
                    <div
                        className={
                            'text-2xl font-bold leading-tight text-[#1e1e1e] lg:max-w-[720px] lg:text-[32px]'
                        }
                    >
                        {h1}
                    </div>
                </div>
                <div className='mb-12 mt-6 grid grid-cols-1 gap-7 md:mt-12 lg:mb-24 lg:grid-cols-2 xl:mt-20'>
                    {newArrivalsModels?.data?.map((item: Car) => (
                        <div
                            key={item.attributes.slug}
                            className='flex flex-col rounded-[10px] px-3 py-5 lg:py-12 lg:pl-5 lg:pr-12 2xl:flex-row'
                            style={{ background: item.attributes.bg_gradient }}
                        >
                            <div
                                className={
                                    'relative z-[1] flex justify-center 2xl:w-1/2 2xl:justify-start'
                                }
                            >
                                <div
                                    className={
                                        'absolute z-[1] translate-y-[-20%] pl-6 font-terminatorgen text-[32px] tracking-wider text-white/20 sm:text-[52px] md:translate-y-[-40%] md:text-[64px] xl:text-[80px]'
                                    }
                                >
                                    {item.attributes.brand.data.attributes.name}
                                </div>
                                <div className={'z-10 '}>
                                    <Image
                                        className={'z-100 inline-block'}
                                        src={
                                            getStrapiMedia(
                                                item.attributes.image.data
                                                    .attributes.url
                                            )!
                                        }
                                        alt={''}
                                        width={
                                            item.attributes.image.data
                                                .attributes.width
                                        }
                                        height={
                                            item.attributes.image.data
                                                .attributes.height
                                        }
                                    />
                                </div>
                            </div>
                            <div
                                className={
                                    'z-10 font-electrohub text-white 2xl:w-1/2'
                                }
                            >
                                <div
                                    className={
                                        'flex w-full justify-between font-electrohub text-[16px] font-black text-white sm:text-[18px] md:text-[20px]'
                                    }
                                >
                                    <div className={'space-x-2'}>
                                        <span>
                                            {
                                                item.attributes.brand.data
                                                    .attributes.name
                                            }
                                        </span>
                                        <span>{item.attributes.name}</span>
                                    </div>
                                    <div>{item.attributes.year}</div>
                                </div>
                                <p
                                    className={
                                        'mt-3 flex flex-wrap text-sm leading-tight text-white sm:text-base md:mt-5 md:text-lg'
                                    }
                                >
                                    {item.attributes.description}
                                </p>
                                <div
                                    className={
                                        'mt-3 text-sm leading-tight sm:text-base md:mt-5 md:text-lg'
                                    }
                                >
                                    {item.attributes.mileage} км
                                </div>
                                <div
                                    className={
                                        'mt-3 text-right text-base font-bold md:mt-5 md:text-lg'
                                    }
                                >
                                    {item.attributes.price_byn} BYN
                                </div>
                                <div
                                    className={
                                        'text-right font-bold md:text-lg'
                                    }
                                >
                                    {item.attributes.price_usd} $
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
