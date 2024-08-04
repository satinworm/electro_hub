'use client';
import { ConstructorStore } from '@/stores/car-constructor.store';
import { Car, NewArrivalResponse } from '@/types/NewArrivals-types';
import { getStrapiMedia } from '@/utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NewArrivals({ newArrivalsModels, data }: any) {
    const h1 = data?.heading?.[0]?.h1;
    const h2 = data?.heading?.[0]?.h2;
    const store = ConstructorStore((state: any) => state.constructor);
    const setConstructor = ConstructorStore(
        (state: any) => state.setConstructor
    );
    const linksToConstructor = [
        {
            id: 'X',
            store: {
                configuration: 'Zeekr X',
                body: 'white',
                wheels: 'default',
                interior_colors: 'black',
                defaultRenderImage: {
                    url: '/uploads/white_default_bd44812b2f.png',
                    width: 800,
                    height: 310,
                    name: 'white_default.png',
                },
                renderImage:
                    'http://localhost:1349/uploads/white_default_bd44812b2f.png',
                defaultPrice: 26000,
                price: {
                    body: 200,
                    wheels: 0,
                },
            },
        },
        {
            id: '001',
            store: {
                configuration: 'Zeekr 001',
                body: 'черный',
                wheels: 'default',
                interior_colors: 'black',
                defaultRenderImage: {
                    url: '/uploads/black_default_5d8970bbc6.png',
                    width: 1200,
                    height: 440,
                    name: 'black_default.png',
                },
                renderImage:
                    'http://localhost:1349/uploads/black_default_5d8970bbc6.png',
                defaultPrice: 40000,
                price: {
                    body: 0,
                    wheels: 0,
                },
            },
        },
        {
            id: '009',
            store: {
                configuration: 'Zeekr 009',
                body: 'white',
                wheels: 'default',
                interior_colors: 'black',
                defaultRenderImage: {
                    url: '/uploads/white_default_21a847a9cb.png',
                    width: 1000,
                    height: 360,
                    name: 'white_default.png',
                },
                renderImage:
                    'http://localhost:1349/uploads/white_default_21a847a9cb.png',
                defaultPrice: 80000,
                price: {
                    body: 2000,
                    wheels: 0,
                },
            },
        },
        {
            id: '001 FR',
            store: {
                configuration: 'Zeekr 001 FR',
                body: 'white',
                wheels: 'default',
                interior_colors: 'black',
                defaultRenderImage: {
                    url: '/uploads/gray_default_858c8d828a.png',
                    width: 1000,
                    height: 360,
                    name: 'white_default.png',
                },
                renderImage:
                    'http://localhost:1349/uploads/gray_default_858c8d828a.png',
                defaultPrice: 62000,
                price: {
                    body: 100,
                    wheels: 0,
                },
            },
        },
        {
            id: '007 RWD',
            store: {
                configuration: 'Zeekr 007 RWD',
                body: 'white',
                wheels: 'default',
                interior_colors: 'black',
                defaultRenderImage: {
                    url: '/uploads/white_default_c3f04a6850.png',
                    width: 1000,
                    height: 360,
                    name: 'white_default.png',
                },
                renderImage:
                    'http://localhost:1349/uploads/white_default_c3f04a6850.png',
                defaultPrice: 50000,
                price: {
                    body: 200,
                    wheels: 0,
                },
            },
        },
    ];
    return (
        <>
            <div className="z-[1] mt-[-38px] h-[38px] w-full bg-rectangle_main_mobile bg-cover bg-no-repeat md:-mt-[48px] md:h-[48px] md:bg-rectangle_main" />
            <section className="-mt-1 flex w-full flex-col bg-white pt-3 font-electrohub text-black md:px-8 md:pt-12 xl:py-10">
                <div className="container mt-10 text-black">
                    <h3 className="font-black text-[#1e1e1e]">{h2}</h3>
                    <div className="mt-5 flex items-center justify-between">
                        <div
                            className={
                                'text-2xl font-bold leading-tight text-[#1e1e1e] lg:max-w-[720px] lg:text-[32px]'
                            }
                        >
                            {h1}
                        </div>
                    </div>
                    <div className="mb-12 mt-6 grid grid-cols-1 gap-7 md:mt-12 md:grid-cols-3 lg:mb-24 lg:grid-cols-4 xl:mt-20">
                        {newArrivalsModels?.data?.map((item: Car) => (
                            <Link
                                onClick={async () => {
                                    console.log('item', item);
                                    const id = item?.attributes?.name;
                                    const model = linksToConstructor.find(
                                        (el) => el.id === id
                                    );
                                    if (model) {
                                        setConstructor({
                                            ...store,
                                            ...model.store,
                                        });
                                    }
                                    //   setConstructor({
                                    //       ...store,
                                    //       ...linksToConstructor[item.attributes?.name]
                                    //           .store,
                                    //   });
                                }}
                                href={`/zeekr/constructor`}
                                key={item.attributes.slug}
                                className="flex cursor-pointer flex-col items-center justify-center rounded-[10px] px-3 py-5 transition-all duration-200 ease-in-out hover:shadow-[5px_5px_10px_0_rgba(0,0,0,0.15)] lg:py-12"
                                //  style={{ background: item.attributes.bg_gradient }}
                            >
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

                                <div
                                    className={
                                        'z-10 font-electrohub text-black'
                                    }
                                >
                                    <div
                                        className={
                                            'flex w-full gap-1.5 font-electrohub text-[16px] font-black text-black sm:text-[18px] md:text-[20px]'
                                        }
                                    >
                                        <span>
                                            {
                                                item.attributes.brand.data
                                                    .attributes.name
                                            }
                                        </span>
                                        <span>{item.attributes.name}</span>
                                        {/* <div>{item.attributes.year}</div> */}
                                    </div>
                                    <p
                                        className={
                                            'mt-2 flex flex-wrap text-xs leading-tight text-black md:text-xs'
                                        }
                                    >
                                        {item.attributes.description}
                                    </p>
                                    {/* <div className={'text-xs leading-tight'}>
                                    {item.attributes.mileage} км
                                </div> */}

                                    <div
                                        className={
                                            'mt-2 text-base font-bold text-[#808080] md:text-lg'
                                        }
                                    >
                                        от {item.attributes.price_usd} $
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
