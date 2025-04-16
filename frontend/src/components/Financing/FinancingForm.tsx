"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api, bot } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function FinancingForm() {
    const FormSchema = z.object({
        name: z.string().min(1, "Обязательное поле"),
        phone: z.string().min(1, "Обязательное поле"),
        message: z.string().optional(),
    });
    const defaultValues = {
        name: "",
        phone: "",
        message: "",
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
                    type: "feedback",
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
            <form
                className={"max-w-md ml-auto space-y-4"}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className={cn("")}>
                            <FormControl>
                                <Input
                                    className={
                                        "bg-gray-100 py-6 rounded font-electrohub ring-0 placeholder:text-[12px] text-[12px] placeholder:text-black/60"
                                    }
                                    placeholder={"Имя*"}
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
                        <FormItem className={cn("")}>
                            <FormControl>
                                <Input
                                    className={
                                        "bg-gray-100 py-6 rounded font-electrohub ring-0 placeholder:text-[12px] text-[12px] placeholder:text-black/60"
                                    }
                                    placeholder={"Телефон*"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className={cn("")}>
                            <FormControl>
                                <Textarea
                                    className={
                                        "bg-gray-100 py-6 rounded font-electrohub ring-0 placeholder:text-[12px] text-[12px] placeholder:text-black/60"
                                    }
                                    placeholder={"Сообщение*"}
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
                        "mt-6 flex ml-auto w-fit px-5 rounded border border-black py-1.5 text-center font-electrohub text-sm font-semibold capitalize sm:text-sm md:mt-8 md:py-2.5"
                    }
                >
                    отправить
                </button>
            </form>
        </Form>
    );
}
