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

const unbounded = Unbounded({ subsets: ['latin', 'cyrillic-ext'] });

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale },
}: Omit<Props, 'children'>): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'Index' });
    const formatter = await getFormatter({ locale });
    const now = await getNow({ locale });
    const timeZone = await getTimeZone({ locale });

    return {
        metadataBase: new URL('http://localhost:3000'),
        title: t('title'),
        description: t('description'),
        other: {
            currentYear: formatter.dateTime(now, { year: 'numeric' }),
            timeZone: timeZone || 'N/A',
        },
    };
}

export default function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={cn(
                    'flex w-full flex-col bg-black',
                    unbounded.className
                )}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='light'
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
