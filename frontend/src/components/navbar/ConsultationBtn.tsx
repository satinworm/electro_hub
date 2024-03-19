'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';

export default function ConsultationBtn({ label }: { label: string }) {
    const { theme } = useTheme();
    const locale = useLocale();
    // const t = useTranslations('Navbar')
    return (
        <Button
            variant={'link'}
            className='flex items-center gap-4 transition-all duration-200 ease-in-out hover:scale-95 active:translate-y-1'
        >
            <span>{label}</span>
            {theme === 'dark' ? (
                <Image
                    src={`/navbar/consultation-dark.svg`}
                    alt={label}
                    width={16}
                    height={16}
                />
            ) : (
                <Image
                    src={`/navbar/consultation-light.svg`}
                    alt={label}
                    width={16}
                    height={16}
                />
            )}
        </Button>
    );
}
