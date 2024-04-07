'use client';
import StickyBox from 'react-sticky-box';
import { CarConstructorResponse } from '@/types/zeekr-constructor';
import ConfigurationForm from '@/components/Zeekr/ConfigurationForm';

type Props = {
    defaultData: CarConstructorResponse;
};
const ZeekrConstructor = (props: Props) => {
    const { defaultData } = props;

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <StickyBox className={'w-3/4'}>Sidebar</StickyBox>
            <div className={'h-[3000px] w-1/4 bg-white'}>
                <ConfigurationForm defaultData={defaultData} />
            </div>
        </div>
    );
};
export default ZeekrConstructor;
