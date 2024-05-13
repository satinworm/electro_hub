'use client';
import React, { useState } from 'react';
import { DialogStore } from '@/stores/dialog.store';
import ModalComponent from '@/components/ModalComponent';
import { cn } from '@/lib/utils';

type Props = {
    header: string;
    description: string;
    label: string;
    data?: any;
    styles?: string;
    cart?: boolean;
};

export default function ModalTrigger(props: Props) {
    const { header, description, data, label, cart, styles } = props;
    //  const { setOpen } = DialogStore();
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                className={cn(
                    !cart &&
                        'flex w-full items-center justify-center gap-5 rounded-none border border-white bg-transparent px-12 py-3 font-electrohub text-lg font-bold text-white',
                    styles
                )}
                key={'consultation'}
                onClick={() => setOpen(true)}
            >
                <span className={'whitespace-nowrap'}>{label}</span>
            </button>
            <ModalComponent
                header={header}
                description={description}
                data={data}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
}
