'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';

export default function LoginBtn({ label }: { label: string }) {
    const { theme } = useTheme();
    return (
        <Button
            variant={'link'}
            className="flex items-center gap-4 transition-all duration-200 ease-in-out hover:scale-95 active:translate-y-1"
        >
            <span>{label}</span>
            {theme === 'dark' ? (
                <Image
                    src={`/navbar/login-dark.svg`}
                    alt={label}
                    width={14}
                    height={16}
                />
            ) : (
                <Image
                    src={`/navbar/login-light.svg`}
                    alt={label}
                    width={14}
                    height={16}
                />
            )}
        </Button>
    );
}
