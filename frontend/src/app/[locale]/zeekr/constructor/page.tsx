'use client';
import ZeekrConstructor from '@/components/Zeekr/Constructor';

export default function ZeekrConstructorPage() {
    return (
        <>
            <div
                className={
                    'min-h-[100vh] w-full bg-zeekr_constructor bg-cover bg-fixed bg-no-repeat'
                }
            >
                <div className={'h-[100px] bg-[#1e1e1e]/20'} />
                <ZeekrConstructor />
            </div>
        </>
    );
}
