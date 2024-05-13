'use client';
import { cn } from '@/lib/utils';

export default function ScrollLink({
    label,
    id,
    styles,
}: {
    label: string;
    id: string;
    styles?: string;
}) {
    return (
        <button
            className={cn(
                'border-b border-transparent font-electrohub text-lg transition hover:border-white ',
                styles
            )}
            onClick={() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }}
        >
            {label}
        </button>
    );
}
