'use client';
import Image from 'next/image';

export default function Logo() {
    return (
        <Image
            src='/navbar/logo.svg'
            priority={true}
            alt='Logo'
            width={160}
            height={30}
        />
    );
}
