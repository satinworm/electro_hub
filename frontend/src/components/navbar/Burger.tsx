"use client";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { BrandsResponse } from "@/types/brands.types";
import type { Link as LinkType } from "@/types/navbar.types";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
    main_links: LinkType[];
    social_links: LinkType[];
    sub_links: LinkType[];
    brands: BrandsResponse;
    dynamic?: boolean | undefined;
};

const buyersLinks = [
    {
        scrollable: false,
        label: "Финансирование",
        href: "/financing",
    },
    {
        scrollable: false,
        label: "Гарантия",
        href: "/guarantee",
    },
    {
        scrollable: false,
        label: "Сервисное обслуживание",
        href: "/service",
    },
];
export default function Burger(props: Props) {
    const { social_links, sub_links, brands, main_links, dynamic } = props;
    const [open, setOpen] = useState(false);
    const locale = useLocale();

    // const t = await getTranslations({ locale, namespace: 'Footer' });

    // console.log('brands links', social_links);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={"cursor-pointer"}>
                <Image
                    src={`/navbar/burger_icon${dynamic ? "-black" : ""}.svg`}
                    alt={"burger menu"}
                    width={50}
                    height={14}
                />
            </SheetTrigger>
            <SheetContent
                className={
                    "min-w-[50vw] px-8 py-6 font-electrohub sm:px-10 sm:px-8 md:min-w-[35vw] md:px-12 md:py-10 lg:px-14 xl:px-16 2xl:px-20"
                }
            >
                <SheetHeader>
                    <SheetTitle className={"text-left text-[#808080]"}>
                        Меню
                    </SheetTitle>
                </SheetHeader>
                <div className={"flex h-full flex-col justify-evenly"}>
                    <div className={"flex flex-col gap-y-3 sm:gap-y-5"}>
                        {main_links?.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={
                                    "block font-bold text-[#A4AABD] text-base sm:text-[20px] md:text-[20px] lg:text-[22px]"
                                }
                            >
                                {link.name}
                            </Link>
                        ))}
                        {buyersLinks?.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={
                                    "block font-bold text-[#A4AABD] text-base sm:text-[20px] md:text-[20px] lg:text-[22px]"
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className={"flex flex-col gap-y-3 sm:gap-y-4"}>
                        {sub_links?.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={
                                    "block font-bold text-[#A4AABD] sm:text-[22px] md:text-base xl:text-[18px]"
                                }
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className={""}>
                        {social_links?.map((link: any, index: number) => (
                            <Link
                                href={link.href}
                                key={index}
                                onClick={() => setOpen(false)}
                                className={
                                    "block font-bold text-[#A4AABD] text-base capitalize sm:text-lg"
                                }
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
