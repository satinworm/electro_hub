import { ReactNode } from 'react';
import ZeekrConstructorPage from '@/app/[locale]/zeekr/constructor/page';

export default async function ZeekrConstructorLayout({
    children,
    params: { locale },
}: {
    children: ReactNode;
    params: { locale: string };
}) {
    console.log('ZeekrConstructorLayout ', arr == arr2);
    const propsForPage = { asd: 'asd' };

    // return <>{children}</>;
    return (
        <ZeekrConstructorPage
            params={{
                locale: locale,
                ...propsForPage,
            }}
        />
    );
}
