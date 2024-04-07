'use client';
import clsx from 'clsx';
import { Bars } from 'react-loader-spinner';

export const Loader = ({ styles }: { styles: string }) => {
    return (
        <div
            className={clsx(
                'my-auto flex items-center justify-center ',
                styles
            )}
        >
            <Bars
                height='300'
                width='300'
                color='#1e1e1e'
                ariaLabel='bars-loading'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
            />
        </div>
    );
};
