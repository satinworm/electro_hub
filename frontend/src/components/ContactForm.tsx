import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api, bot } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ContactForm({
    close,
    botData,
}: {
    close: () => void;
    botData: any;
}) {
    const FormSchema = z.object({
        name: z.string().min(1, "Обязательное поле"),
        phone: z.string().min(1, "Обязательное поле"),
    });
    const defaultValues = {
        name: "",
        phone: "",
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues,
    });
    // const { watch } = form;

    function formatDate(date: Date) {
        return format(date, "dd.MM.yyyy в HH:mm");
    }

    async function onSubmit(data: any) {
        const dateNow = new Date();
        console.log("SUBMITTED DATA", botData);
        try {
            const response = await api.post<AxiosResponse>("/api/feedbacks", {
                data: {
                    ...data,
                    processed: false,
                    date: formatDate(dateNow),
                    dateUTC: dateNow.toISOString(),
                },
            });

            const botResponse = await bot.post<AxiosResponse>("/applications", {
                data: {
                    ...botData,
                    name: data.name,
                    number: data.phone,
                },
            });
            console.log("botResponse", botResponse.status);
            if (botResponse.status === 201 && response.status === 200) {
                toast.success("Данные отправлены ✅", {
                    duration: 6000,
                });
                close();
                form.reset();
            } else {
                toast.error("Ошибка отправки данных ❌");
            }
        } catch (e: any) {
            throw new Error(e);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className={cn("")}>
                            <FormControl>
                                <Input
                                    className={
                                        "bg-white-100 py-6 font-electrohub border-black border ring-0 placeholder:text-[12px] text-[12px] placeholder:text-black/60"
                                    }
                                    placeholder={"ФИО"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="mt-4 flex flex-col items-start">
                            <FormControl className="w-full">
                                <Input
                                    className={
                                        "bg-white-100 py-6 font-electrohub border-black border ring-0 placeholder:text-[12px] text-[12px] placeholder:text-black/60"
                                    }
                                    placeholder={"Телефон"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <button
                    type={"submit"}
                    className={
                        "mt-6 w-full border bg-black text-white border-black py-1.5 text-center text-sm font-semibold capitalize sm:text-sm md:mt-5 md:py-2"
                    }
                >
                    отправить
                </button>
            </form>
        </Form>
    );
}
