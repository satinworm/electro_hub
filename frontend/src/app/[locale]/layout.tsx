import type { Metadata } from 'next';
import { Unbounded } from 'next/font/google';
import '../globals.css';
import {
    getFormatter,
    getNow,
    getTimeZone,
    getTranslations,
} from 'next-intl/server';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/footer/Footer';
import { getDataFromAPI } from '@/utils/fetch-api';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import '@splidejs/react-splide/css';

const unbounded = Unbounded({ subsets: ['latin', 'cyrillic-ext'] });

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale },
}: Omit<Props, 'children'>): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'MainSection' });
    const formatter = await getFormatter({ locale });
    const now = await getNow({ locale });
    const timeZone = await getTimeZone({ locale });

    return {
        metadataBase: new URL('https://electrohub.com'),
        title: t('title'),
        description: t('description'),

        other: {
            currentYear: formatter.dateTime(now, { year: 'numeric' }),
            timeZone: timeZone || 'N/A',
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
        'navbars',
        {
            populate: {
                logo: {
                    fields: ['url', 'width', 'height'],
                },
                main_links: '*',
                sub_links: '*',
                social_links: '*',
            },
            locale: locale,
        },
        locale
    );
    const brands = await getDataFromAPI(
        'brands',
        {
            populate: {
                name: '*',
                slug: '*',
            },
            locale: locale,
        },
        locale
    );
    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={cn(
                    'flex w-full flex-col bg-black',
                    unbounded.className
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar data={getNavbarData} brands={brands} />
                    <div id="mainLayout">{children}</div>
                    <Footer locale={locale} />
                </ThemeProvider>
                <Toaster position={'top-right'} />
            </body>
        </html>
    );
}
