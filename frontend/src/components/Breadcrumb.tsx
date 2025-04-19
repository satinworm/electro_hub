"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface Translations {
    [key: string]: {
        en?: string;
        ru: string;
    };
}

interface BreadCrumbComponentProps {
    translations?: Translations;
}
export default function BreadCrumbComponent({
    translations,
}: BreadCrumbComponentProps) {
    const pathname = usePathname();
    const locale = useLocale() as "ru" | "en";

    // Default translations, which can be extended dynamically
    const defaultTranslations: Translations = {
        main: {
            en: "Main",
            ru: "Главная",
        },
        news: {
            en: "News",
            ru: "Новости",
        },
        financing: {
            en: "Financing",
            ru: "Финансирование",
        },
        about: {
            en: "About",
            ru: "О компании",
        },
    };

    // Merge default translations with the dynamic ones
    const translatedPath = { ...defaultTranslations, ...translations };

    // Remove language segments and empty strings from the path
    const segments = pathname
        .split("/")
        .filter((seg) => seg && seg !== "ru" && seg !== "en");

    return (
        <div className={"container md:py-4 py-3 lg:py-6 xl:py-10"}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            {/* biome-ignore lint/complexity/useLiteralKeys: <explanation> */}
                            {translatedPath["main"][locale]}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {segments.map((segment, index) => {
                        // Find a translation or use the segment as is
                        const displayText = translatedPath[segment]
                            ? translatedPath[segment][locale]
                            : segment;

                        return (
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            <Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {index === segments.length - 1 ? (
                                        <BreadcrumbPage>
                                            {displayText}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            href={`/${segments.slice(0, index + 1).join("/")}`}
                                        >
                                            {displayText}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
