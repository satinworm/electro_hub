import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "../globals.css";
import { Footer } from "@/components/footer/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { getDataFromAPI } from "@/utils/fetch-api";
import {
    getFormatter,
    getNow,
    getTimeZone,
    getTranslations,
} from "next-intl/server";
import type { ReactNode } from "react";
import "@splidejs/react-splide/css";
import DynamicNavbar from "@/components/navbar/DynamicNavbar";
import Navbar from "@/components/navbar/Navbar";

const unbounded = Unbounded({ subsets: ["latin", "cyrillic-ext"] });

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: "MainSection" });
    const formatter = await getFormatter({ locale });
    const now = await getNow({ locale });
    const timeZone = await getTimeZone({ locale });

    return {
        metadataBase: new URL("https://electrohub.by"),
        title: t("title"),
        description: t("description"),

        other: {
            currentYear: formatter.dateTime(now, { year: "numeric" }),
            timeZone: timeZone || "N/A",
        },
    };
}
export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: ReactNode;
    params: { locale: string };
}) {
    const getNavbarData = await getDataFromAPI(
        "navbars",
        {
            populate: {
                logo: {
                    fields: ["url", "width", "height"],
                },
                main_links: "*",
                sub_links: "*",
                social_links: "*",
            },
            locale: locale,
        },
        locale,
    );
    const brands = await getDataFromAPI(
        "brands",
        {
            populate: {
                name: "*",
                slug: "*",
            },
            locale: locale,
        },
        locale,
    );
    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={cn(
                    "flex w-full flex-col bg-black",
                    unbounded.className,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <DynamicNavbar data={getNavbarData} brands={brands} />
                    <Navbar data={getNavbarData} brands={brands} />
                    <div id="mainLayout">{children}</div>
                    <Footer locale={locale} />
                </ThemeProvider>
                <Toaster position={"top-right"} />
            </body>
        </html>
    );
}
