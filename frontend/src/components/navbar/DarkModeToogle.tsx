'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Switch } from '../ui/switch';

export function DarkModeToogle() {
    const { theme, setTheme } = useTheme();
    return (
        <div className='flex items-center gap-2'>
            {theme === 'dark' ? (
                <Image
                    src={`/navbar/sun-dark.svg`}
                    alt='Sun'
                    width={22}
                    height={22}
                />
            ) : (
                <Image
                    src={`/navbar/sun-light.svg`}
                    alt='Sun'
                    width={22}
                    height={22}
                />
            )}
            <Switch
                checked={theme === 'dark'}
                onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
                id='airplane-mode'
            />
            {theme === 'dark' ? (
                <Image
                    src={`/navbar/moon-dark.svg`}
                    alt='Sun'
                    width={22}
                    height={22}
                />
            ) : (
                <Image
                    src={`/navbar/moon-light.svg`}
                    alt='Sun'
                    width={22}
                    height={22}
                />
            )}
        </div>
    );
}
