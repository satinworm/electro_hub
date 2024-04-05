'use client';
import StickyBox from 'react-sticky-box';
const ZeekrConstructor = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <StickyBox className={'w-3/4'}>Sidebar</StickyBox>
            <div className={'h-[3000px] w-1/4 bg-white'}>Main Content</div>
        </div>
    );
};
export default ZeekrConstructor;
