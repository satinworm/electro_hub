"use client";
import Burger from "@/components/navbar/Burger";
import { NavLink } from "@/components/navbar/NavLink";
import { cn } from "@/lib/utils";
import type { BrandsResponse } from "@/types/brands.types";
import type { NavbarResponse } from "@/types/navbar.types";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";

type Props = {
    data: NavbarResponse;
    brands: BrandsResponse;
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

export default function DynamicNavbar(props: Props) {
    const { data, brands } = props;
    const logo = data?.data?.[0]?.attributes?.logo?.data?.attributes;
    const main_links = data?.data?.[0]?.attributes?.main_links;
    const contact_number = data?.data?.[0]?.attributes?.contact_number;
    const sub_links = data?.data?.[0]?.attributes?.sub_links;
    const social_links = data?.data?.[0]?.attributes?.social_links;

    // Используем useScroll из Motion One для отслеживания позиции скролла
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    // Подписываемся на изменения scrollY и обновляем видимость хедера
    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsVisible(latest > 100);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <motion.nav
            // Анимируем параметры opacity и y (смещение по вертикали)
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : -20,
            }}
            transition={{ duration: 0.3, easing: "ease-out" }}
            className={cn(
                "fixed left-0 top-0 bg-white z-[11] shadow-2xl h-fit w-full text-black",
            )}
        >
            <div className="container flex w-full items-center 4xl:max-w-[1840px] justify-between gap-2 px-10 py-3 md:py-3 lg:py-3">
                <div className="flex gap-20">
                    {/*<Logo data={logo} />*/}
                    <Link href={"/"} className="flex items-center">
                        <Image
                            src={"/logo-black.svg"}
                            alt={"black-logo"}
                            width={160}
                            height={30}
                        />
                    </Link>

                    <div className="hidden items-center gap-x-8 xl:gap-x-12 lg:flex">
                        {main_links?.map((link) => (
                            <NavLink
                                scrollable={link.scrollable}
                                key={link.name}
                                label={link.name}
                                href={link.href}
                                dynamic={true}
                            />
                        ))}
                        <HoverCard openDelay={100}>
                            <HoverCardTrigger asChild>
                                <Button
                                    className="border-none p-0 sm:p-0 md:p-0 lg:p-0 xl:p-0 hover:border-white border-transparent font-electrohub text-sm transition  sm:text-base md:base"
                                    variant="link"
                                >
                                    Покупателям
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex flex-col space-y-1">
                                    {buyersLinks.map((item) => (
                                        <NavLink
                                            scrollable={item.scrollable}
                                            key={item.label}
                                            label={item.label}
                                            href={item.href}
                                        />
                                    ))}
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                <div className="flex h-fit gap-4 md:gap-8">
                    <Link href="https://www.instagram.com/electrohub.by?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                        <Image
                            src={"/navbar/instagram_icon-black.svg"}
                            alt={"instagram"}
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link
                        href={`tel:${contact_number?.replace(/[)(]/g, "")}`}
                        className="flex items-center gap-5"
                    >
                        <Image
                            src={"/navbar/phone_icon-black.svg"}
                            alt={"phone"}
                            width={17}
                            height={24}
                        />
                        <span className="hidden font-bold font-electrohub xl:block">
                            {contact_number}
                        </span>
                    </Link>
                    <Burger
                        main_links={main_links}
                        brands={brands}
                        sub_links={sub_links}
                        social_links={social_links}
                        dynamic={true}
                    />
                </div>
            </div>
        </motion.nav>
    );
}
