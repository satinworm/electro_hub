import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Link as LinkType } from '@/types/navbar.types';
import { BrandsResponse } from '@/types/brands.types';

type Props = {
    main_links: LinkType[];
    social_links: LinkType[];
    sub_links: LinkType[];
    brands: BrandsResponse;
};
export default async function Burger(props: Props) {
    const { social_links, sub_links, brands, main_links } = props;
    const locale = useLocale();
    const t = useTranslations('Navbar');
    const links = [
        { label: t('main'), href: '/' },
        { label: t('catalog'), href: '/about' },
        { label: t('car_available'), href: '/services' },
        { label: t('car_order'), href: '/contact' },
    ];
    const links2 = [
        { label: t('news'), href: '/news' },
        { label: t('sales'), href: '/sales' },
        { label: t('test_drive'), href: '/test_drive' },
    ];
    // const t = await getTranslations({ locale, namespace: 'Footer' });

    // console.log('brands links', social_links);

    return (
        <Sheet>
            <SheetTrigger className={'cursor-pointerß'}>
                <Image
                    src={'/navbar/burger_icon.svg'}
                    alt={'burger menu'}
                    width={50}
                    height={14}
                />
            </SheetTrigger>
            <SheetContent
                className={
                    'min-w-[50vw] px-8 py-6 font-electrohub sm:px-10 sm:px-8 md:min-w-[35vw] md:px-12 md:py-10 lg:px-14 xl:px-16 2xl:px-20'
                }
            >
                <SheetHeader>
                    <SheetTitle className={'text-left text-[#808080]'}>
                        {t('menu')}
                    </SheetTitle>
                </SheetHeader>
                <div className={'flex h-full flex-col justify-evenly'}>
                    <div className={'flex flex-col gap-y-3 sm:gap-y-5'}>
                        {main_links &&
                            main_links?.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={
                                        'block text-[18px] font-bold text-[#A4AABD] sm:text-[20px] md:text-[20px] lg:text-[22px] xl:text-[28px]'
                                    }
                                >
                                    {link.name}
                                </Link>
                            ))}
                    </div>

                    <div className={'flex flex-col gap-y-3 sm:gap-y-4'}>
                        {sub_links &&
                            sub_links?.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={
                                        'block font-bold text-[#A4AABD] sm:text-[22px] md:text-base xl:text-[18px]'
                                    }
                                >
                                    {link.name}
                                </Link>
                            ))}
                    </div>
                    <div className={''}>
                        {social_links &&
                            social_links?.map((link: any, index: number) => (
                                <Link
                                    href={link.href}
                                    key={index}
                                    className={
                                        'block text-base font-bold capitalize text-[#A4AABD] sm:text-lg'
                                    }
                                >
                                    {link.name}
                                </Link>
                            ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
