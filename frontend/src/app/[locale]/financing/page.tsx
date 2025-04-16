import FinancingForm from "@/components/Financing/FinancingForm";
import { cn } from "@/lib/utils";
import { getStrapiMedia } from "@/utils/api-helpers";
import { getDataFromAPI } from "@/utils/fetch-api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
    subsets: ["cyrillic-ext"],
});
export async function generateMetadata({ params }: any) {
    const { locale } = params;
    const pageProperties = await getDataFromAPI(
        "pages",
        {
            filters: {
                slug: {
                    $eq: "/financing",
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
            locale: locale,
        },
        locale,
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
export default async function FinancingPage({ params }: any) {
    const pageProperties = await getDataFromAPI("pages", {
        filters: {
            slug: {
                $eq: "/financing",
            },
        },
        populate: {
            sections: {
                fields: ["*"],
                populate: "*",
            },
        },
    });
    const heading = pageProperties?.data[0]?.attributes?.sections?.find(
        (item: any) => item.__component === "heading-for-section.heading",
    );
    const text = pageProperties?.data[0]?.attributes?.sections?.find(
        (item: any) => item.__component === "text.rich-text-component",
    );
    console.log("Financing page", text);

    return (
        <section className={"bg-white text-black"}>
            <div className={"bg-black h-20"} />
            <div
                className={cn(
                    montserrat.className,
                    "container max-w-[1140px] w-full lg:py-16 md:py-14 py-6 sm:pt-10 xl:py-20 bg-white",
                )}
            >
                <h1
                    className={
                        "font-terminatorgen text-3xl sm:text-4xl md:text-[38px] lg:text-[46px] xl:text-[54px] text-black"
                    }
                >
                    {heading?.h1}
                </h1>
                {text && (
                    <div
                        className={cn(
                            montserrat.className,
                            "max-w-5xl font-montserrat mt-6 md:mt-10",
                        )}
                    >
                        <BlocksRenderer content={text.text as any} />
                    </div>
                )}

                <FinancingForm />
            </div>
        </section>
    );
}
