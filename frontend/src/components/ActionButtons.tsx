'use client';
import Link from 'next/link';
import React from 'react';
import { DialogStore } from '@/stores/dialog.store';
import ModalComponent from '@/components/ModalComponent';

type BaseAction = {
    styles?: string;
    actionOnClick?: () => void;
};

type LinkOrButtonAction = BaseAction & {
    actionType: 'link' | 'button';
    actionUrl?: string;
};

type ModalAction = BaseAction & {
    actionType: 'modal';
    modal_header: string;
    modal_description: string;
};

export type ButtonFromProps = {
    name: string;
    action: LinkOrButtonAction | ModalAction;
    children?: React.ReactNode;
};
type Props = {
    buttons: ButtonFromProps[];
    containerStyles: string;
};

export default function ActionButtons(props: Props) {
    const { buttons, containerStyles } = props;
    const { setOpen } = DialogStore();
    return (
        <>
            <div className={containerStyles}>
                {buttons?.map((item: ButtonFromProps, index: number) => {
                    if (item.action.actionType === 'link') {
                    } else if (item.action.actionType === 'modal') {
                        return (
                            <>
                                <button
                                    className={item.action.styles}
                                    key={item.name}
                                    onClick={() => setOpen(true)}
                                >
                                    <span className={'whitespace-nowrap'}>
                                        {item.name}
                                    </span>
                                    {item.children}
                                </button>
                                <ModalComponent
                                    header={item.action.modal_header}
                                    description={item.action.modal_description}
                                />
                            </>
                        );
                    }
                    return (
                        <>
                            <Link
                                className={item.action.styles}
                                key={item.name}
                                href={item?.action?.actionUrl || '/'}
                            >
                                <span className={'whitespace-nowrap'}>
                                    {item.name}
                                </span>
                                {item.children}
                            </Link>
                        </>
                    );
                })}
            </div>
        </>
    );
}
