import Burger from "@/components/navbar/Burger";
import { NavLink } from "@/components/navbar/NavLink";
import { cn } from "@/lib/utils";
import type { BrandsResponse } from "@/types/brands.types";
import type { NavbarResponse } from "@/types/navbar.types";
import Image from "next/image";
import Link from "next/link";
import Logo from "../ui/Logo";

type Props = {
    data: NavbarResponse;
    brands: BrandsResponse;
};
export default function Navbar(props: Props) {
    const { data, brands } = props;
    const logo = data?.data?.[0]?.attributes?.logo?.data?.attributes;
    const main_links = data?.data?.[0]?.attributes?.main_links;
    const contact_number = data?.data?.[0]?.attributes?.contact_number;
    const sub_links = data?.data?.[0]?.attributes?.sub_links;
    const social_links = data?.data?.[0]?.attributes?.social_links;

    return (
        <nav
            className={cn(
                "absolute inset-0 z-[11] h-fit w-full max-h-[86px]  text-white backdrop-blur-[20px]",
            )}
        >
            <div className="container flex w-full 4xl:max-w-[1840px] justify-between gap-2 px-10 py-7">
                <div className="flex gap-20">
                    <Logo data={logo} />

                    <div className="hidden items-center gap-x-12 xl:flex">
                        {main_links?.map((link) => (
                            <NavLink
                                scrollable={link.scrollable}
                                key={link.name}
                                label={link.name}
                                href={link.href}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex h-fit gap-4 md:gap-8">
                    <Link
                        href={
                            "https://www.instagram.com/electrohub.by?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        }
                    >
                        <Image
                            src={"/social_links/instagram.png"}
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
                            src={"/navbar/phone_icon.svg"}
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
                    />
                </div>
            </div>
        </nav>
    );
}
