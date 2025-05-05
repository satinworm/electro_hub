"use client";

import ModalComponent from "@/components/ModalComponent";
import { cn } from "@/lib/utils";
import type { MainSectionSliderTypes } from "@/types/mainsection.types";
import { getStrapiMedia } from "@/utils/api-helpers";
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import ModalTrigger from "./ModalTrigger";

type Props = {
    title: string;
    description: string;
    subTitle: string;
    bg: string;
    data?: MainSectionSliderTypes;
};

export default function MainSectionSlider({ props }: { props: Props }) {
    const [windowWidth, setWindowWidth] = React.useState<number>(0);
    const { title, description, subTitle, bg, data } = props;
    const getPrevItem = (items: any, currentItem: any) => {
        if (items.length === currentItem.id - 1) {
            return items[0];
        }
        if (currentItem.id === 1) {
            return items[items.length - 1];
        }
        return items[currentItem.id - 2];
    };

    const getNextItem = (items: any, currentItem: any) => {
        if (items.length === currentItem.id) {
            return items[0];
        }
        return items[currentItem.id];
    };
    useEffect(() => {
        // Обработчик изменения размера окна
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        // Проверка существования объекта window и установка начального значения ширины
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
        }

        // Функция очистки
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <Splide
                className={
                    "mb-8 w-full z-[10] max-w-screen overflow-hidden font-electrohub md:max-h-[85vh]"
                }
                hasTrack={false}
                options={{
                    type: "fade",
                    pagination: true,
                    arrows: false,
                    autoplay: true,
                    interval: 4000,
                    rewind: true,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    resetProgress: false,
                    lazyLoad: "nearby",
                    speed: 3000,
                    waitForTransition: true,
                }}
            >
                <SplideTrack>
                    {data?.items?.map((item: any, index) => {
                        const bgUrl = getStrapiMedia(
                            item.main_image.data.attributes.url,
                        );
                        const prevItem = getPrevItem(data.items, item);
                        const nextItem = getNextItem(data.items, item);

                        return (
                            <SplideSlide
                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                key={index}
                                className={cn(
                                    "w-full relative cursor-grab bg-black",
                                )}
                            >
                                <div
                                    className={
                                        "absolute w-full md:block hidden h-full z-[1]"
                                    }
                                >
                                    <Image
                                        src={bgUrl!}
                                        alt={item?.name}
                                        fill
                                        loading={index === 0 ? "eager" : "lazy"}
                                        priority={index === 0}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className={
                                            "absolute inset-0 object-cover opacity-90"
                                        }
                                    />
                                </div>

                                <div className="item-center relative mt-24 z-[2] mb-6 px-3 flex min-h-[75vh] w-full flex-col md:mt-0 md:min-h-[85vh] md:justify-end px-[0.4rem] sm:px-[1rem] md:px-[1.5rem] lg:px-[2rem]">
                                    <div className="md:-translate-x-1/2 md:-translate-y-2/3 left-1/2 flex w-full flex-col items-center justify-center space-y-3 md:absolute md:top-1/4 md:mb-[15%] md:space-y-5">
                                        <div className="text-center font-terminatorgen text-[52px] text-white leading-[1] md:px-4 md:text-[80px] md:tracking-[0.2em] lg:text-[92px] xl:text-[112px] 2xl:text-[128px]">
                                            {item?.name}
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            "relative mt-7 min-h-[350px] sm:min-h-[400px] rounded-2xl md:hidden"
                                        }
                                    >
                                        <Image
                                            // biome-ignore lint/style/noNonNullAssertion: <explanation>
                                            src={bgUrl!}
                                            fill
                                            alt={item?.name}
                                            objectFit={"cover"}
                                            className={
                                                "h-[90%] w-full overflow-hidden rounded-lg object-cover"
                                            }
                                        />
                                        {item?.slug ? (
                                            <Link
                                                className="absolute bottom-0 left-1/2 mx-auto flex w-fit -translate-x-1/2 text-black font-black  translate-y-1/2 bg-white px-10 py-3 text-xs md:block md:text-base md:backdrop-blur-[10px]"
                                                href={`/ru/stock/${item.slug}`}
                                            >
                                                Подробнее
                                            </Link>
                                        ) : (
                                            <ModalTrigger
                                                header={"Связь с нами"}
                                                description={
                                                    "Наш специалист свяжется с Вами и ответит на все интересующие Вас вопросы."
                                                }
                                                label={"Подробнее"}
                                                data={{
                                                    type: "feedback",
                                                }}
                                                styles="absolute bottom-0 left-1/2 mx-auto flex w-fit -translate-x-1/2 text-black font-black  translate-y-1/2 bg-white px-10 py-3 text-xs md:block md:text-base md:backdrop-blur-[10px]"
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={
                                            "mt-14 font-black text-[28px] text-white md:hidden"
                                        }
                                    >
                                        {item.starting_price}$
                                    </div>
                                    <div className="relative mt-4 text-white md:mt-0 md:mb-[80px]">
                                        <div
                                            className={
                                                "flex justify-center gap-7"
                                            }
                                        >
                                            <div
                                                className={
                                                    "grid w-full grid-cols-3 gap-[2px] md:w-auto md:grid-cols-6 xl:grid-cols-6"
                                                }
                                            >
                                                <div
                                                    className={
                                                        "hidden flex-col items-center justify-center gap-2 rounded-[10px] backdrop-blur-[10px] md:mr-2 md:flex md:bg-white/30 md:px-5 md:py-7"
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            // biome-ignore lint/style/noNonNullAssertion: <explanation>
                                                            getStrapiMedia(
                                                                item?.logo?.data
                                                                    ?.attributes
                                                                    ?.url,
                                                            )!
                                                        }
                                                        alt={item?.name}
                                                        width={
                                                            item?.logo?.data
                                                                ?.attributes
                                                                ?.width
                                                        }
                                                        height={
                                                            item?.logo?.data
                                                                ?.attributes
                                                                ?.height
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            "text-center max-w-28 font-bold font-electrohub text-[#1E1E1E] text-xs capitalize md:text-base"
                                                        }
                                                    >
                                                        {item?.name}
                                                    </div>
                                                </div>

                                                <div
                                                    className={
                                                        "flex flex-col items-center justify-center gap-4 text-xs md:rounded-l-[10px] md:bg-white/30 md:px-5 md:py-7 md:text-base md:backdrop-blur-[10px] "
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            "/mainsection_slider/engine.svg"
                                                        }
                                                        alt={"engine"}
                                                        width={46}
                                                        height={27}
                                                    />
                                                    <div
                                                        className={
                                                            "flex flex-col text-center font-electrohub text-white"
                                                        }
                                                    >
                                                        <span>Двигатель:</span>
                                                        <span
                                                            className={
                                                                "font-semibold"
                                                            }
                                                        >
                                                            {item?.engine}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        "flex flex-col items-center justify-center gap-4 text-xs md:bg-white/30 md:px-5 md:py-7 md:text-base md:backdrop-blur-[10px]"
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            "/mainsection_slider/range.svg"
                                                        }
                                                        alt={"range icon"}
                                                        width={39}
                                                        height={36}
                                                    />
                                                    <div
                                                        className={
                                                            "flex flex-col text-center font-electrohub text-white"
                                                        }
                                                    >
                                                        <span>
                                                            Запас хода:{" "}
                                                        </span>
                                                        <span
                                                            className={
                                                                "font-semibold"
                                                            }
                                                        >
                                                            {
                                                                item?.driving_range
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        "flex flex-col items-center justify-center gap-4 md:mr-2 md:rounded-r-[10px] text-xs md:bg-white/30 md:px-5 md:py-7 md:text-base md:backdrop-blur-[10px]"
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            "/mainsection_slider/acceleration.svg"
                                                        }
                                                        alt={
                                                            "acceleration icon"
                                                        }
                                                        width={36}
                                                        height={36}
                                                    />
                                                    <div
                                                        className={
                                                            "flex flex-col text-center font-electrohub  text-white"
                                                        }
                                                    >
                                                        <span>0-100 км/ч</span>
                                                        <span
                                                            className={
                                                                "font-semibold"
                                                            }
                                                        >
                                                            {item?.acceleration}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="relative h-full">
                                                    <ModalTrigger
                                                        header={"Связь с нами"}
                                                        description={
                                                            "Наш специалист свяжется с Вами и ответит на все интересующие Вас вопросы."
                                                        }
                                                        label={"Консультация"}
                                                        data={{
                                                            type: "feedback",
                                                        }}
                                                        styles="relative hidden w-full h-full border-0 p-5 text-xs md:rounded-[10px] md:bg-white/50 md:text-base md:backdrop-blur-[10px] xl:block"
                                                    />

                                                    <span
                                                        className={
                                                            "absolute top-5 left-5 hidden font-black text-[#1e1e1e] text-xl md:block"
                                                        }
                                                    >
                                                        {item.starting_price}$
                                                    </span>
                                                </div>
                                                {item?.slug ? (
                                                    <Link
                                                        className="relative hidden w-full h-full ml-1 font-semibold border-0 p-2 text-xs md:rounded-[10px] md:bg-white/50 items-center md:text-xl justify-center text-center md:backdrop-blur-[10px] xl:flex"
                                                        href={`/ru/stock/${item.slug}`}
                                                    >
                                                        Узнать подробнее
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        className="relative hidden w-full h-full ml-1 font-semibold border-0 p-2 text-xs md:rounded-[10px] md:bg-white/50 items-center md:text-xl justify-center text-center md:backdrop-blur-[10px] xl:flex"
                                                        href={`/ru/catalog/${item.brands.data.attributes.slug}/all`}
                                                    >
                                                        Узнать подробнее
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                        {/*<div className="flex gap-2">*/}
                                        {/*	<button*/}
                                        {/*		type={"button"}*/}
                                        {/*		className={*/}
                                        {/*			"relative mt-3 hidden flex-col p-5 text-xs md:flex md:rounded-[10px] md:bg-white/60 md:text-base md:backdrop-blur-[10px] xl:hidden"*/}
                                        {/*		}*/}
                                        {/*		key={item.name}*/}
                                        {/*		onClick={() => setOpen(true)}*/}
                                        {/*	>*/}
                                        {/*		<span className={"font-black text-[#1e1e1e] text-sm"}>*/}
                                        {/*			{item.starting_price}$*/}
                                        {/*		</span>*/}
                                        {/*		<span*/}
                                        {/*			className={*/}
                                        {/*				"whitespace-nowrap font-black text-[#1e1e1e]"*/}
                                        {/*			}*/}
                                        {/*		>*/}
                                        {/*			{"Консультация"}*/}
                                        {/*		</span>*/}
                                        {/*	</button>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </SplideSlide>
                        );
                    })}
                </SplideTrack>
                <div className="splide__arrows">
                    <button
                        type={"button"}
                        className="splide__arrow splide__arrow--prev bottom-0"
                    >
                        <Image
                            src={"/left-arrow-slider.svg"}
                            alt={"prev slide"}
                            width={8}
                            height={14}
                        />
                    </button>
                    <button
                        style={{ bottom: 0 }}
                        type={"button"}
                        className="splide__arrow splide__arrow--next"
                    >
                        <Image
                            src={"/right-arrow-slider.svg"}
                            alt={"prev slide"}
                            width={8}
                            height={14}
                        />
                    </button>
                </div>
            </Splide>
            <ModalComponent
                header={"Связь с нами"}
                description={
                    "Наш специалист свяжется с Вами и ответит на все интересующие Вас вопросы."
                }
            />
        </>
    );
}
