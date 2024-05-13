import Link from 'next/link';
import ScrollLink from '@/components/ScrollLink';

export const NavLink = ({
    label,
    href,
    scrollable,
}: {
    label: string;
    href: string;
    scrollable: boolean;
}) => {
    return (
        <>
            {!scrollable ? (
                <Link
                    href={href}
                    className={
                        'border-b border-transparent font-electrohub text-sm transition  hover:border-white sm:text-base md:text-lg'
                    }
                >
                    <span>{label}</span>
                </Link>
            ) : (
                <ScrollLink id={href} label={label} />
            )}
        </>
    );
};
