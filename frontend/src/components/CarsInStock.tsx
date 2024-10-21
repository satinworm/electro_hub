"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { DialogStore } from "@/stores/dialog.store";
import type { CarEntity } from "@/types/carsinstock.type";
import { getStrapiMedia } from "@/utils/api-helpers";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
	data: {
		data: CarEntity[];
	};
};

export default function CarsInStock({ data }: Props) {
	const { setOpen } = DialogStore();
	const { push } = useRouter();
	// console.log('Cars in stock ', data);
	const locale = useLocale();
	console.log("opa data ", data?.data);
	return (
		<section
			id={"cars-in-stock"}
			className="flex w-full flex-col bg-white py-4 font-electrohub text-black xl:py-10"
		>
			<div className="md:-mt-[48px] z-[1] mt-[-38px] h-[38px] w-full bg-cover bg-rectangle_main_mobile bg-no-repeat md:h-[48px] md:bg-rectangle_main" />
			<div className="container mt-10 text-black">
				<h3 className="font-black text-[#1e1e1e] text-sm md:text-base">
					{locale === "ru" ? "АВТОМОБИЛИ В НАЛИЧИИ" : "CARS IN STOCK"}
				</h3>

				<div className="mt-2 flex items-center justify-between md:mt-5">
					<span
						className={
							"font-bold text-[#1e1e1e] text-xl leading-tight sm:text-2xl lg:max-w-[720px] lg:text-[32px]"
						}
					>
						{locale === "ru" ? "Выбeрите свой автомобиль" : "Choose your car"}
					</span>
				</div>
			</div>
			<div className="container mt-6 w-full px-3 md:mt-10 lg:mt-12 xl:mt-16 ">
				<div
					className={
						"relative grid grid-cols-4 px-3 py-5 lg:gap-5 xl:gap-5 2xl:gap-6"
					}
				>
					{data?.data?.map((item, index) => {
						return (
							<div
								key={item.attributes.slug}
								// shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]
								className="md:basis-1/2 lg:basis-1/4"
							>
								<Link
									href={`/stock/${item.attributes.slug}`}
									className={
										"mx-auto flex relative flex-col items-center justify-center rounded-[20px] p-3 shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)]"
									}
								>
									<div
										className={cn(
											item?.attributes?.status ? "block" : "hidden",
											"text-sm rounded-lg px-3 py-1 font-medium shadow-sm ml-auto mb-2",
											item?.attributes?.status === "в пути" && "bg-orange-500",
											item?.attributes?.status === "в наличии" &&
												"bg-green-400",
											item?.attributes?.status === "зарезервирован" &&
												"bg-slate-400",
										)}
									>
										{item?.attributes?.status}
									</div>
									<div className={"relative"}>
										<div className={"relative"}>
											<Image
												className={"h-[200px] object-contain rounded-[10px]"}
												src={
													// biome-ignore lint/style/noNonNullAssertion: <explanation>
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
												height={
													item?.attributes?.preview_image?.data?.attributes
														?.height
												}
											/>
										</div>
									</div>
									<div
										className={"mt-6 w-full text-left font-bold text-[20px]"}
									>
										{item.attributes?.name}
									</div>
									<div
										className={
											"my-3 flex w-full items-center justify-start gap-1 font-bold text-[#808080] capitalize"
										}
									>
										<div className={"text-xs"}>{item.attributes?.gearbox}</div>
										<div className={"text-xs"}>●</div>
										<div className={"text-xs"}>{item.attributes?.body}</div>
										<div className={"text-xs"}>●</div>
										<div className={"text-xs truncate"}>
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
											className={"flex items-center gap-2.5 font-bold text-sm"}
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
											className={"flex items-center gap-2.5 font-bold text-sm"}
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
											className={"flex items-center gap-2.5 font-bold text-sm"}
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
										className={"mt-4 flex w-full items-center justify-between"}
									>
										<div className={"font-bold text-[24px] text-black"}>
											${item?.attributes?.price}
										</div>
										<button
											type={"button"}
											// onClick={() =>
											//     push(
											//         `/stock/${item.attributes.slug}`
											//     )
											// }
											className={
												"rounded-[10px] bg-[#1e1e1e] px-4 py-3 text-center font-bold text-white text-xs"
											}
										>
											{locale === "ru" ? "Подробнее" : "More details"}
										</button>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
				<Link
					href={"/catalog/all/all"}
					className={
						"rounded-[10px] bg-[#1e1e1e] px-4 py-3 mx-auto flex w-fit text-center font-bold text-white"
					}
				>
					{locale === "ru" ? "Посмотреть еще" : "View more"}
				</Link>
			</div>
		</section>
	);
}
