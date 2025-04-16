import ScrollLink from "@/components/ScrollLink";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const NavLink = ({
    label,
    href,
    scrollable,
    dynamic,
}: {
    label: string;
    href: string;
    scrollable: boolean;
    dynamic?: boolean;
}) => {
    return (
        <>
            {!scrollable ? (
                <Link
                    href={href}
                    className={cn(
                        `border-b border-transparent font-electrohub text-sm transition  hover:border-${dynamic ? "black" : "white"} sm:text-base md:base`,
                    )}
                >
                    <span>{label}</span>
                </Link>
            ) : (
                <ScrollLink id={href} label={label} />
            )}
        </>
    );
};
