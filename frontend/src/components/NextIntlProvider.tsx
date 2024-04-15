'use client';

import { ReactNode } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

type Props = {
    messages: AbstractIntlMessages;
    locale: string;
    children: ReactNode;
    now: Date;
    timeZone: string;
};

export default function NextIntlProvider({
    locale,
    children,
    now,
    timeZone,
}: Props) {
    return (
        <NextIntlClientProvider
            locale={locale}
            defaultTranslationValues={{
                i: (text) => <i>{text}</i>,
            }}
            now={now}
            timeZone={timeZone}
        >
            {children}
        </NextIntlClientProvider>
    );
}
