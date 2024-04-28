import Link from 'next/link';

export const NavLink = ({ label, href }: { label: string; href: string }) => {
    return (
        <Link
            href={href}
            className={
                'border-b border-transparent font-electrohub text-sm transition  hover:border-white sm:text-base md:text-lg'
            }
        >
            <span>{label}</span>
        </Link>
    );
};
