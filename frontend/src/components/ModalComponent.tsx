import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Montserrat } from "next/font/google";
import Image from "next/image";

type Props = {
    header: string;
    description: string;
    open: boolean;
    setOpen: any;
    data: any;
};
const montserrat = Montserrat({
    subsets: ["cyrillic-ext", "cyrillic"],
});
export default function ModalComponent(props: any) {
    const { header, description, open, setOpen, data } = props;

    const closeDialog = () => setOpen(false);
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent
                className={cn(
                    montserrat.className,
                    " max-w-[90%] overflow-hidden rounded-none border-0 px-0 py-2 pl-7 pt-8 font-electrohub sm:max-w-3xl sm:pl-12 md:pl-16 md:pt-10 lg:max-w-5xl lg:pb-16 lg:pl-24 lg:pt-12",
                )}
            >
                <DialogHeader>
                    <DialogDescription className={"text-black"}>
                        <div className={"relative font-terminatorgen"}>
                            <div
                                className={
                                    "absolute top-0 z-[1] translate-x-[5%] text-[32px] text-[#F2F2F2] lg:text-[54px]"
                                }
                            >
                                {header}
                            </div>
                            <div
                                className={
                                    "absolute left-0 z-[2] translate-y-[60%] text-[32px]  lg:text-[54px]"
                                }
                            >
                                {header}
                            </div>
                        </div>
                    </DialogDescription>
                    <Button
                        variant={"ghost"}
                        id="closeDialog"
                        onClick={() => setOpen(false)}
                        className="absolute -right-1 -top-1 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-ring focus:ring-offset-2  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground md:right-4 md:top-2"
                    >
                        <Cross2Icon className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogHeader>
                <Image
                    className={
                        "absolute -right-1 top-1/2 hidden -translate-y-1/2 lg:block"
                    }
                    src={"/zeekr-modal.png"}
                    alt={"zeekr"}
                    width={499}
                    height={420}
                />
                <div
                    className={
                        "mt-5 lg:mt-12 w-full pr-4 text-sm text-black md:mt-20 md:w-2/3 md:text-base"
                    }
                >
                    Наш специалист скоро свяжется с вами, чтобы ответить на все
                    ваши вопросы и помочь с выбором. Мы здесь, чтобы сделать
                    процесс максимально удобным и понятным для вас!
                </div>

                <div className="mt-12 max-w-md pb-6 pr-7 font-electrohub sm:pr-12 md:mt-20 md:pr-0">
                    <ContactForm botData={data} close={closeDialog} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
