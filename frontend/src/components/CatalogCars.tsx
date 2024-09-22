"use client";
import FiltersBurger from "@/components/FiltersBurger";
import type { BrandData } from "@/types/brands.types";
import type { CarsInStockBackendResponse } from "@/types/carsinstock.type";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
	data: CarsInStockBackendResponse;
	initialData: CarsInStockBackendResponse;
	locale: string;
	brands: BrandData[];
	slug: string;
	pageCount: number;
	total: number;
};

const CatalogCars = memo(
	({
		data,
		locale,
		brands,
		slug,
		initialData: templateData,
		pageCount: initPageCount,
		total,
	}: Props) => {
		const [initialData, setInitialData] =
			useState<CarsInStockBackendResponse>(data);
		const [page, setPage] = useState(1);
		const [pageCount, setPageCount] = useState(initPageCount);
		const [isLoading, setIsLoading] = useState(false);
		const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({}); // Track image loading state

		const { push } = useRouter();

		useEffect(() => {
			setIsLoading(true);
			const timer = setTimeout(() => {
				setIsLoading(false);
			}, 500); // Adjust this delay as needed

			return () => clearTimeout(timer);
		}, [initialData]);

		const handleImageLoad = (slug: string) => {
			setImageLoaded((prev) => ({ ...prev, [slug]: true }));
		};

		return (
			<div className={"bg-white py-6 md:py-10 lg:py-16 xl:py-20"}>
				<div className={"container"}>
					<div className="relative text-black md:mt-10">
						<div className="mt-2 flex items-center justify-between md:mt-5">
							<span
								className={
									"font-bold text-[#1e1e1e] text-xl leading-tight sm:text-2xl lg:max-w-[720px] lg:text-[32px]"
								}
							>
								{locale === "ru"
									? "Поиск по параметрам"
									: "Search by parameters"}
							</span>
						</div>
					</div>
					<FiltersBurger
						initialData={initialData}
						setInitialData={setInitialData}
						locale={locale}
						brands={brands}
						slug={slug}
						page={page}
						setPage={setPage}
						setPageCount={setPageCount}
						templateData={templateData}
					/>

					<div className="z-[1] mt-4 w-full ">
						<div
							className={
								"relative grid grid-cols-1 gap-3 py-5 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:gap-5 2xl:gap-6"
							}
						>
							{initialData?.data?.length === 0 ? (
								<div>Извините, еще не добавили)</div>
							) : (
								initialData?.data?.map((item) => (
									<div key={item.attributes.slug}>
										<Link
											href={`/stock/${item.attributes.slug}`}
											className={
												"mx-auto flex flex-col items-center justify-center overflow-hidden rounded-[20px] p-3 shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]"
											}
										>
											<div
												className={
													"relative w-full h-[200px] flex items-center justify-center"
												}
											>
												{!imageLoaded[item.attributes.slug] && (
													<div className="bg-gray-200 absolute left-0 top-0 animate-pulse rounded-[10px] w-full h-full" />
												)}
												<Image
													className={`max-h-[200px] rounded-[10px] object-contain transition-opacity duration-500 ease-in-out ${
														imageLoaded[item.attributes.slug]
															? "opacity-100"
															: "opacity-0"
													}`}
													src={
														getStrapiMedia(
															item?.attributes?.preview_image?.data?.attributes
																?.url,
														)!
													}
													alt={item.attributes?.name}
													width={
														item?.attributes?.preview_image?.data?.attributes
															?.width
													}
													height={200}
													onLoadingComplete={() =>
														handleImageLoad(item.attributes.slug)
													}
												/>
											</div>
											<div
												className={
													"mt-6 w-full text-left font-bold text-[20px]"
												}
											>
												{item.attributes?.name}
											</div>
											<div
												className={
													"my-3 flex w-full items-center justify-start gap-1 font-bold text-[#808080] capitalize"
												}
											>
												<div className={"text-xs"}>
													{item.attributes?.gearbox}
												</div>
												<div className={"text-xs"}>●</div>
												<div className={"text-xs"}>{item.attributes?.body}</div>
												<div className={"text-xs"}>●</div>
												<div className={"text-xs"}>
													{item.attributes?.engine_type}
												</div>
											</div>
											<div className={"mt-5 grid w-full grid-cols-2 gap-y-4"}>
												<div
													className={
														"flex min-h-[40px] items-center gap-2.5 font-bold text-sm"
													}
												>
													<Image
														src={"/carstoorder/battery.svg"}
														alt={"Battery"}
														width={30}
														height={20}
													/>
													<span>
														{item.attributes?.battery_capacity}{" "}
														{locale === "ru" ? "кВт/ч" : "kW/h"}
													</span>
												</div>
												<div
													className={
														"flex items-center gap-2.5 font-bold text-sm"
													}
												>
													<Image
														src={"/carstoorder/hourse_power.png"}
														alt={"Battery"}
														width={30}
														height={20}
													/>
													<span>
														{item.attributes?.hourse_power}{" "}
														{locale === "ru" ? "л/c" : "h/p"}
													</span>
												</div>
												<div
													className={
														"flex items-center gap-2.5 font-bold text-sm"
													}
												>
													<Image
														src={"/carstoorder/range.svg"}
														alt={"Battery"}
														width={22}
														height={20}
													/>
													<span>
														{item.attributes?.vehicle_range}{" "}
														{locale === "ru" ? "км" : "km"}
													</span>
												</div>
												<div
													className={
														"flex items-center gap-2.5 font-bold text-sm"
													}
												>
													<Image
														src={"/carstoorder/privod.svg"}
														alt={"Battery"}
														width={22}
														height={20}
													/>
													<span>{item.attributes?.privod}</span>
												</div>
											</div>

											<div
												className={
													"mt-4 flex w-full items-center justify-between"
												}
											>
												<div className={"font-bold text-[24px] text-black"}>
													${item?.attributes?.price}
												</div>
												<button
													type={"button"}
													onClick={() => push(`/stock/${item.attributes.slug}`)}
													className={
														"rounded-[10px] bg-[#1e1e1e] px-4 py-3 text-center font-bold text-white text-xs"
													}
												>
													{locale === "ru" ? "Подробнее" : "More details"}
												</button>
											</div>
										</Link>
									</div>
								))
							)}
						</div>
					</div>
					{pageCount > 1 && (
						<div className="flex mx-auto w-fit">
							<Button
								type="button"
								onClick={async () => {
									setPage((prev: number) => prev - 1);
									window.scrollTo({
										top: 0,
										behavior: "smooth",
									});
								}}
								disabled={page === 1}
								className="px-4 py-2 bg-white border hover:bg-slate-50 border-black font-montserrat disabled:bg-gray-400 text-black rounded disabled:opacity-80"
							>
								Назад
							</Button>
							<div className="px-4 text-black text-center font-montserrat py-2">
								<span className="text-primary font-medium text-lg">{page}</span>
								<span className="text-lg mx-1">/</span>
								<span className="text-lg">{pageCount}</span>
							</div>
							<Button
								type="button"
								onClick={() => {
									setPage((prev: number) => prev + 1);
									window.scrollTo({
										top: 0,
										behavior: "smooth",
									});
								}}
								disabled={page === pageCount}
								className="px-4 py-2 bg-white hover:bg-slate-50 border border-black font-montserrat text-black rounded disabled:opacity-80"
							>
								Вперед
							</Button>
						</div>
					)}
				</div>
			</div>
		);
	},
);

export default CatalogCars;
