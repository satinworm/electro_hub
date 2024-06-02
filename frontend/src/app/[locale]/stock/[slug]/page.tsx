import { getDataFromAPI } from '@/utils/fetch-api';
import GalleryComponent from '@/components/GalleryComponent';
import type { CarAttributes } from '@/types/carsinstock.type';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import ScrollLink from '@/components/ScrollLink';
import TechnicalSpecifications from '@/components/TechnicalSpecifications';
import React from 'react';
import ModalTrigger from '@/components/ModalTrigger';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
			locale: locale,
		},
		locale,
	);
	console.log("slug kurwa ", slug);
	const item = carsInStockData?.data?.[0]?.attributes as CarAttributes;
	return (
		<section className={"bg-[#1e1e1e]/30 font-electrohub"}>
			<div
				className={
					"mt-24 flex w-full flex-col lg:flex-row md:-space-x-2 bg-white py-4 text-white"
				}
			>
				<div className="wrapper w-full p-3 md:w-[62%]">
					<GalleryComponent
						photos={carsInStockData?.data?.[0]?.attributes?.gallery}
					/>
				</div>
				<div
					className={
						"bg-white px-4 lg:px-10 text-[#1e1e1e] md:w-[38%] md:py-12"
					}
				>
					<h1 className={"md:text-[32px] text-[24px] lg:text-[40px] font-bold"}>
						{item.name}
					</h1>
					<p className={"mt-3 lg:mt-6 text-xl lg:text-[28px] font-bold"}>
						{item.price_usd} $
					</p>
					<p className={" text-[20px] font-bold text-[#3E4247]"}>
						{item.price_byn} BYN
					</p>
					<p className={"mb-10 mt-6 text-[#2E71EF]"}>{item.lising}</p>

					{item?.short_specification && (
						<div className={"text-base lg:text-xl"}>
							<BlocksRenderer content={item.short_specification as any} />
						</div>
					)}
					<p className={"mt-5 text-lg"}>{item.engine}</p>
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
							label={locale === "ru" ? "Написать продавцу" : "Write to seller"}
							styles="mt-10 rounded-[8px] bg-[#1e1e1e] px-10 py-4 text-center text-base font-bold text-white"
							data={{
								type: "stock",
								text: `${process.env.NEXT_PUBLIC_SERVER_URL}/ru/stock/${slug}`,
							}}
						/>
						{/* <button
                            type={'button'}
                            // onClick={() => console.log('')}
                            className={
                                'mt-10 rounded-[8px] bg-[#1e1e1e] px-10 py-4 text-center text-base font-bold text-white'
                            }
                        >
                            {locale === 'ru'
                                ? 'Написать продавцу'
                                : 'Write to seller'}
                        </button> */}
					</div>
				</div>
			</div>
			{item?.specification?.length > 0 && (
				<TechnicalSpecifications data={item?.specification} />
			)}
			{item?.full_description && (
				<div className={" w-full bg-white p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20"}>
					<h1 className="mb-6 text-3xl font-semibold">
						{locale ? "Описание" : "Description"}
					</h1>
					<BlocksRenderer content={item.full_description as any} />
				</div>
			)}
		</section>
	);
}
