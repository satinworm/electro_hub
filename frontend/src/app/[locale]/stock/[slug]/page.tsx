import GalleryComponent from "@/components/GalleryComponent";
import ModalTrigger from "@/components/ModalTrigger";
import ScrollLink from "@/components/ScrollLink";
import TechnicalSpecifications from "@/components/TechnicalSpecifications";
import type { CarAttributes } from "@/types/carsinstock.type";
import { getStrapiMedia } from "@/utils/api-helpers";
import { getDataFromAPI } from "@/utils/fetch-api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({
    params,
}: { params: { slug: string } }) {
    const locale = "ru";
    const { slug } = params;
    const carsInStockData = await getDataFromAPI(
        "cars-in-stocks",
        {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
            populate: {
                preview_image: {
                    populate: "*",
                    fields: ["url", "width", "height"],
                },
                specification: {
                    fields: ["*"],
                    populate: "*",
                },
                gallery: {
                    populate: "*",
                    fields: ["url", "width", "height"],
                },
            },
            pagination: {
                page: 1,
                pageSize: 12,
            },
            locale: locale,
        },
        locale,
    );

    return {
        title: `Electrohub | ${carsInStockData?.data?.[0]?.attributes?.name}`,
        openGraph: {
            title: `Electrohub | ${carsInStockData?.data?.[0]?.attributes?.name}`,
            description:
                carsInStockData?.data?.[0]?.attributes?.ogDescription ||
                "Современный автомобиль для ваших приключений: стильный дизайн, передовые технологии и комфорт в каждой детали. Готов к любой дороге — узнайте больше!",
            images: [
                {
                    url: getStrapiMedia(
                        carsInStockData?.data?.[0]?.attributes?.preview_image
                            ?.data?.attributes.url,
                    )!,
                    width: carsInStockData?.data?.[0]?.attributes?.preview_image
                        ?.data?.attributes?.width,
                    height: carsInStockData?.data?.[0]?.attributes
                        ?.preview_image?.data?.attributes.width,
                },
            ],
        },
    };
}
export default async function StockCarFullPage({ params }: any) {
    const { slug, locale } = params;
    const modal = await getTranslations("ContactModal");
    const carsInStockData = await getDataFromAPI(
        "cars-in-stocks",
        {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
            populate: {
                preview_image: {
                    populate: "*",
                    fields: ["url", "width", "height"],
                },
                specification: {
                    fields: ["*"],
                    populate: "*",
                },
                gallery: {
                    populate: "*",
                    fields: ["url", "width", "height"],
                },
            },
            pagination: {
                page: 1,
                pageSize: 12,
            },
            locale: locale,
        },
        locale,
    );
    console.log("slug kurwa ", slug);
    const item = carsInStockData?.data?.[0]?.attributes as CarAttributes;
    return (
        <section className={"bg-[#1e1e1e]/30 font-electrohub"}>
            <div className="w-full grid grid-cols-1 px-4 gap-3 bg-white drop-shadow-2xl border-t border-black col-span-2 fixed z-50 bottom-0 py-2 left-0">
                <ModalTrigger
                    header={modal("header")}
                    description={modal("description")}
                    label={
                        locale === "ru"
                            ? "Написать продавцу"
                            : "Write to seller"
                    }
                    styles="rounded-[8px]  bg-[#1e1e1e] px-6 py-2 text-center text-base font-bold text-white"
                    data={{
                        type: "stock",
                        text: `${process.env.NEXT_PUBLIC_SERVER_URL}/ru/stock/${slug}`,
                    }}
                />
            </div>
            <div
                className={
                    "md:-space-x-2 mt-20 flex w-full flex-col bg-white py-4 text-white lg:flex-row"
                }
            >
                <div className="wrapper w-full p-3 md:w-[62%]">
                    <GalleryComponent
                        photos={carsInStockData?.data?.[0]?.attributes?.gallery}
                    />
                </div>
                <div
                    className={
                        "bg-white px-4 text-[#1e1e1e] md:w-[38%] md:py-12 lg:px-10"
                    }
                >
                    <h1
                        className={
                            "font-bold text-[24px] md:text-[32px] lg:text-[40px]"
                        }
                    >
                        {item?.name}
                    </h1>
                    <p
                        className={
                            "mt-3 font-bold text-xl lg:mt-6 lg:text-[28px]"
                        }
                    >
                        {item?.price} $
                    </p>

                    {item?.lising && (
                        <p className={"mt-6 mb-10 text-[#2E71EF]"}>
                            {item.lising}
                        </p>
                    )}

                    {item?.short_specification && (
                        <div className={"text-base lg:text-xl"}>
                            <BlocksRenderer
                                content={item.short_specification as any}
                            />
                        </div>
                    )}
                    <ScrollLink
                        styles={
                            "font-bold text-[#2E71EF] border-b-transparent hover:border-[#2E71EF] text-sm mt-5"
                        }
                        label={"Все параметры"}
                        id={"specification"}
                    />
                    <div>
                        <ModalTrigger
                            header={modal("header")}
                            description={modal("description")}
                            label={
                                locale === "ru"
                                    ? "Написать продавцу"
                                    : "Write to seller"
                            }
                            styles="mt-10 rounded-[8px] bg-[#1e1e1e] px-10 py-4 text-center text-base font-bold text-white"
                            data={{
                                type: "stock",
                                text: `${process.env.NEXT_PUBLIC_SERVER_URL}/ru/stock/${slug}`,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                className={
                    "grid w-full grid-cols-2 flex-wrap items-center gap-2 gap-y-5 bg-white py-8 md:flex md:flex-row md:justify-evenly"
                }
            >
                {item?.rear_tires && item?.front_tires && (
                    <div
                        className={
                            "flex min-h-[40px] flex-col items-center gap-2.5 font-bold text-sm"
                        }
                    >
                        <div className={"text-center"}>
                            <div className={"text-gray-500"}>Передние шины</div>
                            <div className={"text-lg md:text-xl"}>
                                {item.front_tires}
                            </div>
                        </div>
                        <div className={"text-center"}>
                            <div className={"text-gray-500"}>Задние шины</div>
                            <div className={"text-lg md:text-xl"}>
                                {item.rear_tires}
                            </div>
                        </div>
                    </div>
                )}
                {item?.battery_capacity && (
                    <div
                        className={
                            "flex min-h-[40px] flex-col items-center gap-2.5 font-bold text-sm"
                        }
                    >
                        <Image
                            src={"/carstoorder/battery.svg"}
                            alt={"Battery"}
                            width={60}
                            height={40}
                        />
                        <div className={"text-center"}>
                            <div className={"text-gray-500"}>Емкость</div>
                            <div className={"text-lg md:text-xl"}>
                                {item.battery_capacity} кВ*ч
                            </div>
                        </div>
                    </div>
                )}

                {item?.engine_type && (
                    <div
                        className={
                            "flex min-h-[40px] flex-col items-center gap-2.5 font-bold text-sm"
                        }
                    >
                        <Image
                            src={"/carstoorder/fuel_type.png"}
                            alt={"Battery"}
                            width={60}
                            height={40}
                        />
                        <div className={"text-center"}>
                            <div className={"text-gray-500"}>Тип топлива</div>
                            <div className={"text-lg md:text-xl"}>
                                {/*{item.engine_type}*/}
                                {item.engine_type ===
                                    "Гибрид(параллельный)" && (
                                    <>
                                        <div>Гибрид</div>
                                        <div className={"text-xs"}>
                                            (параллельный)
                                        </div>
                                    </>
                                )}
                                {item.engine_type ===
                                    "Гибрид(последовательный)" && (
                                    <>
                                        <div>Гибрид</div>
                                        <div className={"text-xs"}>
                                            (последовательный)
                                        </div>
                                    </>
                                )}
                                {item.engine_type !==
                                    "Гибрид(последовательный)" &&
                                    item.engine_type !==
                                        "Гибрид(параллельный)" && (
                                        <p>{item.engine_type}</p>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
                {(item?.transmission || item?.privod) && (
                    <div
                        className={
                            "flex min-h-[40px] flex-col items-center gap-2.5 font-bold text-sm"
                        }
                    >
                        {item?.transmission && (
                            <div className={"text-center"}>
                                <div className={"text-gray-500"}>
                                    Трансмиссия
                                </div>
                                <div className={"text-lg md:text-xl"}>
                                    {item.transmission}
                                </div>
                            </div>
                        )}
                        {item?.privod && (
                            <div className={"text-center"}>
                                <div className={"text-gray-500"}>Привод</div>
                                <div
                                    className={
                                        "text-center text-lg capitalize md:text-xl"
                                    }
                                >
                                    {item.privod}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {item?.hourse_power && (
                    <div
                        className={
                            "flex flex-col items-center gap-2.5 font-bold text-sm"
                        }
                    >
                        <div className={"h-[62px]"}>
                            <Image
                                src={"/carstoorder/hourse_power.png"}
                                alt={"Battery"}
                                width={60}
                                height={60}
                            />
                        </div>
                        <span className={"text-xl"}>
                            {item?.hourse_power}{" "}
                            {locale === "ru" ? "л/c" : "h/p"}
                        </span>
                    </div>
                )}

                {/* <div
                    className={
                        "flex min-h-[40px] flex-col items-center gap-2.5 font-bold text-sm"
                    }
                >
                    <Image
                        src={"/carstoorder/car.svg"}
                        alt={"seats"}
                        width={100}
                        height={40}
                    />
                    <div className={"text-center"}>
                        <div className={"text-gray-500"}>Клиренс</div>
                        <div className={"text-lg md:text-xl"}>
                            {item.clearance}
                        </div>
                    </div>
                    <div className={"text-center"}>
                        <div className={"text-gray-500"}>Объем багажника</div>
                        <div className={"text-lg md:text-xl"}>
                            {item.trunk_capacity}
                        </div>
                    </div> */}
                {/* </div> */}
            </div>

            {item?.specification?.length > 0 && (
                <TechnicalSpecifications data={item?.specification} />
            )}
            {item?.full_description && (
                <div
                    className={
                        " w-full bg-white p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20"
                    }
                >
                    <h1 className="mb-6 font-semibold text-3xl">
                        {locale ? "Описание" : "Description"}
                    </h1>
                    <BlocksRenderer content={item.full_description as any} />
                </div>
            )}
        </section>
    );
}
