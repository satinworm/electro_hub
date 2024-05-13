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
import { ConstructorStore } from '@/stores/car-constructor.store';
import OfferFormModal from './OfferFormModal';

export default function OfferModal(props: any) {
    const { open, setOpen } = ZeekrModalStore();
    const closeDialog = () => setOpen(false);
    const { offer, updateOffer, constructor, calculateTotalPrice } =
        ConstructorStore((state: any) => ({
            offer: state.offer,
            updateOffer: state.updateOffer,
            constructor: state.constructor,
            calculateTotalPrice: state.calculateTotalPrice,
        }));
    //  const store = ConstructorStore(
    //       (state: ConstructorStoreState) => state.constructor
    //   );
    //   const totalPrice = ConstructorStore(
    //       (state: ConstructorStoreState) => state.calculateTotalPrice
    //   );
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className='max-h-[80vh] max-w-[90%] overflow-y-auto overflow-x-hidden rounded-[10px] border-r-0 p-5 font-electrohub sm:max-w-3xl sm:p-6 md:p-8 lg:max-w-5xl lg:p-10 xl:p-12'>
                <DialogHeader>
                    <DialogDescription className={'text-black'}>
                        <h1
                            className={
                                'text-center text-[26px] font-medium md:text-[28px]'
                            }
                        >
                            {offer.model?.name}
                        </h1>
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
                <div className='mt-10 flex flex-col gap-3'>
                    <div className='flex w-full justify-between'>
                        <div className='flex flex-col'>
                            <div className='text-sm text-[#808080]'>
                                Комлпектация
                            </div>
                            <div className='text-base font-bold text-[#000000]'>
                                {offer.model?.name}
                            </div>
                        </div>
                        <div className='font-semibold text-[#1e1e1e]'>
                            {offer.model.price} $
                        </div>
                    </div>
                    {offer.body && offer.body && (
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col'>
                                <div className='text-sm text-[#808080]'>
                                    Цвет кузова
                                </div>
                                <div className='text-base font-bold text-[#000000]'>
                                    {offer?.body?.name}
                                </div>
                            </div>
                            <div className='font-semibold text-[#1e1e1e]'>
                                {offer?.body?.price || 0} $
                            </div>
                        </div>
                    )}
                    {offer.interior_color && offer.interior_color.name && (
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col'>
                                <div className='text-sm text-[#808080]'>
                                    Цвет салона
                                </div>
                                <div className='text-base font-bold text-[#000000]'>
                                    {offer?.interior_color?.name}
                                </div>
                            </div>
                            <div className='font-semibold text-[#1e1e1e]'>
                                {offer?.interior_color?.price || 0} $
                            </div>
                        </div>
                    )}
                    {offer.wheels && offer.wheels.name && (
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col'>
                                <div className='text-sm text-[#808080]'>
                                    Диски
                                </div>
                                <div className='text-base font-bold text-[#000000]'>
                                    {offer?.wheels?.name}
                                </div>
                            </div>
                            <div className='font-semibold text-[#1e1e1e]'>
                                {offer?.wheels?.price || 0} $
                            </div>
                        </div>
                    )}
                    <div className=''>
                        {offer?.additional_options && (
                            <div className='mb-1.5 mt-3 text-center md:mb-3'>
                                Дополнительные опции:
                            </div>
                        )}
                        {offer?.additional_options &&
                            Object.entries(offer.additional_options).map(
                                ([key, value]) => {
                                    if (
                                        typeof value === 'object' &&
                                        value !== null &&
                                        'name' in value &&
                                        'price' in value
                                    ) {
                                        return (
                                            <div
                                                className='flex w-full justify-between'
                                                key={key}
                                            >
                                                <div className='flex flex-col'>
                                                    <div className='text-sm font-bold text-[#000000] md:text-base'>
                                                        {value.name as any}
                                                    </div>
                                                </div>
                                                <div className='text-sm text-[#1e1e1e] sm:text-base md:text-lg'>
                                                    {(value.price as any) || 0}{' '}
                                                    $
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }
                            )}
                    </div>
                    <div className='mx-auto my-4 h-[2px] w-3/4 rounded-full bg-[#EFEFEF]' />
                    <div className='flex w-full justify-between'>
                        <div className='flex flex-col'>
                            <div className='text-sm font-bold text-[#000000] sm:text-base md:text-lg'>
                                Итого:
                            </div>
                        </div>
                        <div className='font-semibold text-[#1e1e1e]'>
                            {calculateTotalPrice(constructor) || 0} $
                        </div>
                    </div>
                </div>
                <div className='font-electrohub md:mt-5'>
                    <div className='mb-3 text-center text-base text-[#1E1E1E] md:text-[20px]'>
                        Ваши контактные данные:
                    </div>
                    <OfferFormModal close={closeDialog} botData={undefined} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
