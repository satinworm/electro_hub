'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Switch } from '../ui/switch';
import Link from 'next/link';
import { useState } from 'react';

import { useLocale } from 'next-intl';

import { useRouter, usePathname } from '@/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export function LocaleToogle() {
    const locale = useLocale();
    const pathName = usePathname();
    const router = useRouter();
    const changeLang = (lang: string) => {
        router.push(pathName, { locale: lang });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className='group gap-2 border-primary dark:border-white'
                    variant='outline'
                    size={'sm'}
                >
                    <span className='select-none text-sm uppercase'>
                        {locale}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-16'>
                <DropdownMenuGroup>
                    <div
                        className='flex w-full cursor-pointer justify-center'
                        onClick={() => changeLang('ru')}
                    >
                        <DropdownMenuItem className={'cursor-pointer'}>
                            RU
                        </DropdownMenuItem>
                    </div>
                    <div
                        onClick={() => changeLang('en')}
                        className='flex w-full cursor-pointer justify-center'
                    >
                        <DropdownMenuItem className={'cursor-pointer'}>
                            EN
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
