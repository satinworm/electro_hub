"use client";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useCallback, useState } from "react";

const PLACEHOLDER_SRC =
    "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";

type PropType = {
    imgSrc: string;
    inView: boolean;
    index: number;
    header: string;
    date: string;
    title: string;
    width: any;
    height: any;
    description: string;
    btn: string;
    href: string;
};

export const LazyLoadImage: React.FC<PropType> = (props) => {
    const {
        imgSrc,
        inView,
        index,
        width,
        height,
        header,
        date,
        title,
        description,
        btn,
        href,
    } = props;
    const [hasLoaded, setHasLoaded] = useState(false);

    const setLoaded = useCallback(() => {
        if (inView) setHasLoaded(true);
    }, [inView, setHasLoaded]);
    function formattedDate(date: string) {
        const dateObject = parseISO(date);
        return format(dateObject, "d MMMM yyyy", { locale: ru });
    }

    return (
        <div className="embla__slide flex w-full flex-col gap-2 sm:gap-8 lg:flex-row">
            <div
                className={
                    "flex flex-col gap-2 justify-center font-electrohub sm:gap-4 lg:w-1/2 lg:gap-8 xl:w-[40%]"
                }
            >
                <div className={"flex gap-5"}>
                    <div className={"font-bold text-[#1E1E1E]"}>{header}</div>
                    <div className={"font-bold text-[#808080]"}>
               n         {formattedDate(date)}
                    </div>
                </div>
                <div
                    className={
                        "text-lg font-bold leading-tight text-black sm:text-xl md:text-[24px] lg:text-[32px]"
                    }
                >
                    {title}
                </div>
                <div className={"hidden leading-tight text-[#1E1E1E] lg:block"}>
                    {description}
                </div>
                <Link
                    href={`/news/${href}`}
                    className={
                        "hidden w-fit items-center justify-center gap-2 bg-black px-8 py-3 text-lg font-bold text-white lg:flex"
                    }
                >
                    <div>{btn}</div>
                    <ChevronRight color={"white"} />
                </Link>
            </div>
            <div
                className={"embla__lazy-load flex w-full items-center justify-center bg-bg_new_card bg-cover bg-no-repeat lg:w-[55%]".concat(
                    hasLoaded ? " embla__lazy-load--has-loaded" : "",
                )}
            >
                {!hasLoaded && <span className="embla__lazy-load__spinner" />}
                <Image
                    className="embla__slide__img embla__lazy-load__img"
                    onLoad={setLoaded}
                    src={inView ? imgSrc : PLACEHOLDER_SRC}
                    width={width || 20}
                    height={height || 20}
                    alt="Your alt text"
                    data-src={imgSrc}
                />
            </div>
            <div
                className={
                    "text-sm leading-tight text-[#1E1E1E] sm:text-base md:text-lg lg:hidden"
                }
            >
                {description}
            </div>
            <Link
                href={`/news/${href}`}
                className={
                    "mx-auto flex w-full items-center justify-center gap-2 bg-black px-10 py-2.5 text-sm font-bold text-white md:w-fit md:px-10 md:py-3 md:text-lg lg:hidden"
                }
            >
                <div>{btn}</div>
                <ChevronRight color={"white"} />
            </Link>
        </div>
    );
};
