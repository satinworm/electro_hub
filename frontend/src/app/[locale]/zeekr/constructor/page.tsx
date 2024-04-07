// 'use client';
import ZeekrConstructor from '@/components/Zeekr/Constructor';
import { CarConstructorResponse } from '@/types/zeekr-constructor';

type Props = {
    defaultData: CarConstructorResponse;
    params: { locale: string };
};
export default function ZeekrConstructorPage(props: any) {
    const { defaultData } = props;
    console.log('default data for constructors ', defaultData);

    return (
        <>
            <div
                className={
                    'hideScrollbar min-h-[100vh] w-full bg-zeekr_constructor bg-cover bg-fixed bg-no-repeat'
                }
            >
                <div className={'h-[100px] bg-[#1e1e1e]/20'} />
                {defaultData?.meta?.pagination?.total &&
                    defaultData?.meta?.pagination?.total > 0 && (
                        <ZeekrConstructor defaultData={defaultData} />
                    )}
            </div>
        </>
    );
}
