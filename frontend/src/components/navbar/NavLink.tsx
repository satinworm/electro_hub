import Link from 'next/link';

export const NavLink = ({ label, href }: { label: string; href: string }) => {
    return (
        <Link
            href={href}
            className={
                'border-b border-transparent font-electrohub text-lg text-white transition hover:border-white'
            }
        >
            <span>{label}</span>
        </Link>
    );
};
