import { cn } from "@/lib/utils";
import { getDataFromAPI } from "@/utils/fetch-api";
import { Mail, Navigation, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ModalTrigger from "../ModalTrigger";
const montserrat = Montserrat({
    subsets: ["cyrillic-ext"],
});

export async function Footer({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "Footer" });
    const pageProperties = await getDataFromAPI("footers", null, locale);

    if (
        !pageProperties ||
        !pageProperties.data ||
        pageProperties.data.length === 0
    ) {
        // Обработка случая, когда данные отсутствуют или невалидны
        return;
    }
    const title = pageProperties?.data?.[0]?.attributes?.title;
    const footer_Links = pageProperties?.data?.[0]?.attributes?.footer_links;
    const brands_links = pageProperties?.data?.[0]?.attributes?.brands_links;
    const social_links = pageProperties?.data?.[0]?.attributes?.social_links;
    const mergedLinks = [...footer_Links, ...brands_links];

    return (
        <footer
            className={cn(
                // montserrat.className,
                " flex w-full flex-col bg-black[#F0 py-7 font-electrohub text-white md:px-3 md:py-8 lg:py-10 xl:py-16",
            )}
        >
            <div className={"container"}>
                <div
                    className={
                        "flex md:flex-wrap md:flex-row flex-col justify-start max-w-[1140px] md:items-start gap-3 md:gap-7 lg:p-5 md:mx-auto border-white md:justify-center w-full"
                    }
                >
                    <Link
                        className={
                            "flex border-b pb-5 border-white md:mx-auto items-center gap-6"
                        }
                        href={"tel:+375447742221"}
                    >
                        <div className={"bg-white flex p-3 rounded-full"}>
                            <Smartphone color={"black"} />
                        </div>
                        <div className={"text-white text-sm flex flex-col"}>
                            <span className={"text-xs"}>Телефон</span>
                            <span>+375 (44) 774-22-21</span>
                        </div>
                    </Link>
                    <Link
                        target={"_blank"}
                        className={
                            "flex md:mx-auto border-b pb-5 border-white items-center gap-6"
                        }
                        href={"https://yandex.by/maps/-/CHbnERpr"}
                    >
                        <div className={"bg-white flex p-3 rounded-full"}>
                            <Navigation color={"black"} />
                        </div>
                        <div className={"text-white text-sm flex flex-col"}>
                            <span className={"text-xs"}>Адрес</span>
                            <span>Гродно, ул. Куйбышева, д. 86</span>
                        </div>
                    </Link>
                    <Link
                        target={"_blank"}
                        className={
                            "flex md:mx-auto border-b pb-5 border-white items-center gap-6"
                        }
                        href={"mailto:electrohub.feedback@gmail.com"}
                    >
                        <div className={"bg-white flex p-3 rounded-full"}>
                            <Mail color={"black"} />
                        </div>
                        <div className={"text-white text-sm flex flex-col"}>
                            <span className={"text-xs"}>Электронная почта</span>
                            <span>electrohub.feedback@gmail.com</span>
                        </div>
                    </Link>
                </div>
                <div
                    className={
                        "w-full grid-cols-4 mt-12 justify-items-stretch sm:grid md:gap-5 lg:grid-cols-6"
                    }
                >
                    <div
                        className={
                            "flex flex-col gap-3 sm:col-span-6 xl:col-span-2"
                        }
                    >
                        <Image
                            src={"/navbar/logo.svg"}
                            width={160}
                            height={30}
                            alt={title}
                        />
                        <div
                            className={
                                "max-w-[576px] mt-3 text-sm font-medium leading-tight text-white"
                            }
                        >
                            <span className={"font-bold"}>Electrohub</span> —
                            широкий выбор электромобилей в наличии и под заказ
                            по всей Беларуси.
                        </div>
                        <ModalTrigger
                            header={"Связь с нами"}
                            description={
                                "Наш специалист свяжется с Вами и ответит на все интересующие Вас вопросы."
                            }
                            label={t("callback")}
                            data={{
                                type: "feedback",
                            }}
                            styles="flex w-full items-center justify-center gap-2 border my-4 border-white bg-black px-8 py-1 text-sm font-bold text-white md:w-fit md:py-2 lg:mt-10"
                        />
                    </div>
                    <div className={""}>
                        <h4
                            className={
                                "text-sm font-bold text-white md:text-base lg:text-lg"
                            }
                        >
                            Полезные ссылки
                        </h4>
                        <div
                            className={
                                "mt-5 grid grid-flow-col grid-rows-6 gap-x-1.5 gap-y-3 sm:col-span-6 sm:grid-rows-8 sm:gap-4 md:col-span-3 md:mt-0"
                            }
                        >
                            {mergedLinks.map((link: any, index: number) => (
                                <Link
                                    href={link.href}
                                    key={index}
                                    className={cn(
                                        "text-xs font-medium w-fit duration-300 ease-linear text-white border-b border-transparent hover:border-white transition sm:text-sm lg:base",
                                        link.name === "Telegram"
                                            ? "col-start-1"
                                            : "",
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4
                            className={
                                "text-sm font-bold text-white md:text-base lg:text-lg"
                            }
                        >
                            Социальные сети
                        </h4>
                        <div
                            className={
                                "mt-3 grid grid-flow-col grid-rows-2 gap-4 sm:col-span-6 md:col-span-1 md:mt-0 md:grid-rows-8"
                            }
                        >
                            {social_links.map((link: any, index: number) => (
                                <Link
                                    href={link.href}
                                    key={index}
                                    className={cn(
                                        'text-xs font-medium w-fit duration-300 ease-linear text-white border-b border-transparent hover:border-white transition sm:text-sm lg:base",',
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className={
                        "mt-6 flex w-full text-sm flex-col items-center justify-between border-t-[3px] border-white pt-6 sm:flex-row"
                    }
                >
                    <div
                        className={
                            "flex flex-col flex-wrap gap-1 text-center leading-tight text-white sm:flex-row"
                        }
                    >
                        <span>Electrohub © 2025</span>
                        <span>{t("rights")}</span>
                    </div>
                    <div className={"flex gap-2"}>
                        <Image
                            src={"/globus.svg"}
                            width={20}
                            height={20}
                            alt={"globus"}
                            className={"hidden sm:block"}
                        />
                        <span className={"flex-wrap font-bold text-white"}>
                            Belarus, Grodno
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
