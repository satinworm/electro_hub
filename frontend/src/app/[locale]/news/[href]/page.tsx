import GalleryComponent from "@/components/GalleryComponent";
import ModalTrigger from "@/components/ModalTrigger";
import ScrollLink from "@/components/ScrollLink";
import Test from "@/components/Test";
import { getDataFromAPI } from "@/utils/fetch-api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getTranslations } from "next-intl/server";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function NewsFullPage({ params }: any) {
	const { href, locale } = params;
	const modal = await getTranslations("ContactModal");
	const newData = await getDataFromAPI(
		"news",
		{
			filters: {
				href: {
					$eq: href,
				},
			},
			populate: {
				header: "*",
				image: {
					fields: ["url", "width", "height"],
				},
				gallery: {
					populate: "*",
					fields: ["url", "width", "height"],
				},
				full_description: "*",
			},
			locale: locale,
		},
		locale,
	);
	const item = newData?.data?.[0]?.attributes;

	return (
		<section className={"bg-[#1e1e1e]/30 font-electrohub"}>
			<div
				className={
					"mt-24 flex w-full flex-col lg:flex-row md:-space-x-2 bg-white py-4 text-white"
				}
			>
				<div className="wrapper w-full p-3 md:w-[62%]">
					<GalleryComponent photos={item.gallery} />
				</div>
				<div
					className={
						"bg-white flex px-4 lg:px-10 text-[#1e1e1e] md:w-[38%] md:py-12"
					}
				>
					<h1 className={"md:text-[28px] my-auto text-[20px] lg:text-[32px] font-bold"}>
						{item.title}
					</h1>

				
				</div>
			</div>
			{/* {item?.specification?.length > 0 && (
				<TechnicalSpecifications data={item?.specification} />
			)} */}
			{item?.full_description && (
				<div className={"w-full bg-white p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 sm:pt-4 md:pt-6 lg:pt-10 xl:pt-16"}>
					<h1 className="mb-6 text-3xl font-semibold">
						{locale ? "Подробнее" : "Description"}
					</h1>
					<BlocksRenderer content={item.full_description as any} />
				</div>
			)}
		</section>
	);
}
