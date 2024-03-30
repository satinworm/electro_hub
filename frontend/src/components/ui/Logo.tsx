'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link
            href={'/'}
            className='relative h-[24px] w-[110px] md:h-[30px] md:w-[160px]'
        >
            <Image src='/navbar/logo.svg' priority={true} alt='Logo' fill />
        </Link>
    );
}
