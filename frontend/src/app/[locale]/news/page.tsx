import BreadCrumbComponent from "@/components/Breadcrumb";
import { cn } from "@/lib/utils";
import { getStrapiMedia } from "@/utils/api-helpers";
import { getDataFromAPI } from "@/utils/fetch-api";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Link as LinkIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const montserrat = Montserrat({
    subsets: ["cyrillic-ext", "cyrillic"],
});
export async function generateMetadata() {
    const pageProperties = await getDataFromAPI(
        "pages",
        {
            filters: {
                slug: {
                    $eq: "/news",
                },
            },
            populate: {
                sections: {
                    fields: ["*"],
                    populate: "*",
                },
                SEO: {
                    fields: "*",
                    populate: "*",
                },
            },
            locale: "ru",
        },
        "ru",
    );
    const SEO = pageProperties?.data?.[0]?.attributes?.SEO;
    const additionalOgTags =
        pageProperties?.data?.[0]?.attributes?.SEO?.MetaTag?.map((tag: any) => {
            return {
                [tag?.Name]: tag?.Content,
            };
        });
    const other = Object.assign({}, ...additionalOgTags);

    return {
        openGraph: {
            title: SEO?.MetaTitle,
            description: SEO?.MetaDescription,
            images: [
                {
                    url: getStrapiMedia(SEO?.ogImage?.data?.attributes?.url)!,
                    width: SEO?.ogImage?.data?.attributes?.width,
                    height: SEO?.ogImage?.data?.attributes?.width,
                },
            ],
        },
        other: other,
    };
}
export default async function NewsPage({ params }: any) {
    function formattedDate(date: string) {
        const dateObject = parseISO(date);
        return format(dateObject, "d MMMM yyyy", { locale: ru });
    }
    const initData = await getDataFromAPI("news", {
        sort: ["date:desc"],
        populate: ["", "image"],
        pagination: {
            pageSize: 10,
        },
    });
    const data = initData?.data;
    return (
        <section className={"bg-white text-black"}>
            <div className={"bg-black h-20"} />
            <BreadCrumbComponent />
            <div
                className={cn(
                    // montserrat.className,
                    "container w-full lg:py-10 md:py-14 pb-6 sm:pt-10 xl:py-10 bg-white",
                )}
            >
                <h1
                    className={
                        "font-terminatorgen text-3xl sm:text-4xl text-center md:text-[38px] lg:text-[46px] xl:text-[54px] text-black"
                    }
                >
                    Новости
                </h1>

                <div
                    className={
                        "flex xl:mt-12 flex-col lg:mt-10 md:mt-8 mt-5 gap-y-5 md:gap-y-16 xl:gap-y-20"
                    }
                >
                    {data?.map((i: any) => {
                        const item = i?.attributes;
                        const image =
                            item?.image?.data?.attributes?.formats?.medium;
                        return (
                            <div
                                key={item.title}
                                className={
                                    "flex md:flex-row gap-3 flex-col xl:px-6 group xl:py-6 xl:gap-x-16 "
                                }
                            >
                                <div
                                    className={
                                        "lg:h-[300px] max-w-[540px] relative ease-linear items-center justify-center transition duration-300 w-full relative h-[250] sm:h-[280px] flex h-[200px] xl:h-[350px]"
                                    }
                                >
                                    <Image
                                        src={"/navbar/logo.svg"}
                                        alt={"logo"}
                                        width={100}
                                        height={25}
                                        className={
                                            "absolute right-[5%] mx-auto bottom-[5%]"
                                        }
                                    />
                                    <Image
                                        src={getStrapiMedia(image.url)!}
                                        alt={""}
                                        className={
                                            "w-full max-w-[540px] h-full"
                                        }
                                        width={450}
                                        height={300}
                                        objectFit={"cover"}
                                    />
                                </div>
                                <div
                                    className={
                                        "flex border p-2 xl:p-4 group-hover:shadow-2xl border-black md:border-transparent  hover:border-black transition duration-300 ease-in-out text-black gap-1.5 md:gap-2 xl:gap-3 w-full flex-col"
                                    }
                                >
                                    <div
                                        className={
                                            "bg-black text-white px-4 py-1.5 ml-auto text-sm flex w-fit"
                                        }
                                    >
                                        {formattedDate(item.date)}
                                    </div>
                                    <h4
                                        className={
                                            "md:text-center leading-tight font-semibold md:text-xl text-base lg:text-2xl"
                                        }
                                    >
                                        {item.title}
                                    </h4>
                                    <p
                                        className={
                                            "text-xs sm:text-sm md:text-base"
                                        }
                                    >
                                        {item.description}
                                    </p>
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_PUBLIC_URL}/ru/news/${item.href}`}
                                        className={
                                            "bg-black z-10 flex gap-2 text-white px-4 py-1.5 text-sm flex w-fit text-xs sm:text-sm md:text-base border border-white hover:bg-white hover:border-black hover:text-black transition duration-300 ease-in-out"
                                        }
                                    >
                                        <span>Узнать подробнее</span>
                                        <LinkIcon className={"h-6 w-6"} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
            </div>
        </section>
    );
}
