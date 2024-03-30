import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['ru', 'en'];
const defaultLocale = 'ru';

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as any)) notFound();
    return {
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
