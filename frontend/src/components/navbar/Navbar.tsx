import { useTranslations } from 'next-intl';
import Logo from '../ui/Logo';
import { LocaleToogle } from '@/components/navbar/LocaleToogle';
import { NavLink } from '@/components/navbar/NavLink';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const links = [
        { label: t('catalog'), href: '/about' },
        { label: t('car_available'), href: '/services' },
        { label: t('car_order'), href: '/contact' },
    ];
    return (
        <nav className={'absolute inset-0 z-10 h-fit w-full'}>
            <div className='4xl:max-w-[1840px] container flex w-full justify-between gap-2 px-10 py-7'>
                <div className='flex gap-20'>
                    <Logo />

                    <div className='hidden gap-x-12 md:flex'>
                        {links.map((link) => (
                            <NavLink
                                key={link.label}
                                label={link.label}
                                href={link.href}
                            />
                        ))}
                    </div>
                </div>
                <div className='flex h-fit gap-8'>
                    <LocaleToogle />
                    <Link
                        href={'tel:+375445758062'}
                        className='flex items-center gap-5 text-white'
                    >
                        <Image
                            src={'/navbar/phone_icon.svg'}
                            alt={'phone'}
                            width={17}
                            height={24}
                        />
                        <span className='hidden font-electrohub font-bold md:block'>
                            +375(44)5758062
                        </span>
                    </Link>
                    <Image
                        src={'/navbar/burger_icon.svg'}
                        alt={'burger menu'}
                        width={50}
                        height={14}
                    />
                </div>
            </div>
        </nav>
    );
}
