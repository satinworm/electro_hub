import Link from 'next/link';
import Image from 'next/image';

const links = [
    // {
    //     href: '#',
    //     icon: '/social_links/whatsapp.png',
    //     label: 'whatsapp',
    //     width: 30,
    //     height: 24,
    // },
    {
        href: 'https://www.instagram.com/electrohub.by?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        icon: '/social_links/instagram.png',
        label: 'instagram',
        width: 24,
        height: 24,
    },
    // {
    //     href: '#',
    //     icon: '/social_links/telegram.png',
    //     label: 'telegram',
    //     width: 24,
    //     height: 20,
    // },
];
export default function SocialLinks() {
    return (
        <div className='absolute right-8 top-24 flex flex-col gap-8 '>
            {links.map((link) => (
                <Link href={link.href} key={link.label} className={''}>
                    <Image
                        src={link.icon}
                        alt={link.label}
                        width={link.width}
                        height={link.height}
                    />
                </Link>
            ))}
        </div>
    );
}
