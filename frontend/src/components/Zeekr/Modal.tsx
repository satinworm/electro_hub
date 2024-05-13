import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DialogStore, ZeekrModalStore } from '@/stores/dialog.store';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';

export default function ZeekrModal(props: any) {
    const { header, description } = props;

    const { open, setOpen } = ZeekrModalStore();
    const closeDialog = () => setOpen(false);
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className='max-w-[90%] overflow-hidden rounded-[10px] border-r-0 px-0 py-2 pl-7 pt-8 font-electrohub sm:max-w-3xl sm:pl-12 md:pl-16 md:pt-10 lg:max-w-5xl lg:pb-16 lg:pl-24 lg:pt-12'>
                <DialogHeader>
                    <DialogDescription className={'text-black'}>
                        <div className={'relative'}>
                            <div
                                className={
                                    'absolute top-0 z-[1] translate-x-[5%] text-[32px] text-[#F2F2F2] lg:text-[54px]'
                                }
                            >
                                Связь с нами
                            </div>
                            <div
                                className={
                                    'absolute left-0 z-[2] translate-y-[90%] text-[32px]  lg:text-[54px]'
                                }
                            >
                                Связь с нами
                            </div>
                        </div>
                    </DialogDescription>
                    <Button
                        variant={'ghost'}
                        id='closeDialog'
                        onClick={() => setOpen(false)}
                        className='absolute -right-1 -top-1 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-ring focus:ring-offset-2  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground md:right-4 md:top-2'
                    >
                        <Cross2Icon className='h-5 w-5 md:h-6 md:w-6' />
                        <span className='sr-only'>Close</span>
                    </Button>
                </DialogHeader>
                <Image
                    className={
                        'absolute -right-1 top-1/2 hidden -translate-y-1/2 lg:block'
                    }
                    src={'/Zeekr-modal.png'}
                    alt={'zeekr'}
                    width={499}
                    height={420}
                />
                <div
                    className={
                        'mt-12 w-full pr-4 text-sm text-black md:mt-20 md:w-2/3 md:text-base'
                    }
                >
                    {description}
                </div>

                <div className='mt-12 max-w-md pb-6 pr-7 font-electrohub sm:pr-12 md:mt-20 md:pr-0'>
                    <ContactForm close={closeDialog} botData={undefined} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
