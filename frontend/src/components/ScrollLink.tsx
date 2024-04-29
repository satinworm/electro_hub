'use client';
import { cn } from '@/lib/utils';

export default function ScrollLink({
    label,
    href,
    styles,
}: {
    label: string;
    href: string;
    styles?: string;
}) {
    return (
        <button
            className={cn(
                'border-b border-transparent font-electrohub text-lg transition hover:border-white ',
                styles
            )}
            onClick={() => {
                const el = document.getElementById(href);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }}
        >
            {label}
        </button>
    );
}
