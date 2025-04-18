import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import {
	ConstructorStore,
	type ConstructorStoreState,
	SelectedViewConstructoreStore,
} from "@/stores/car-constructor.store";
import type { CarConstructorResponse } from "@/types/zeekr-constructor";
import { getStrapiMedia } from "@/utils/api-helpers";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import OfferModal from "./OfferModal";

type Props = {
	defaultData: CarConstructorResponse;
	form: any;
};
export default function ZeekrConstructorPage(props: Props) {
	const { defaultData, form } = props;
	const { watch } = form;
	//  const [selectedView, setSelectedView] = useState<'body' | 'interior'>(
	//      'body'
	//  );
	const { selectedView, setSelectedView } = SelectedViewConstructoreStore(
		(state) => ({
			selectedView: state.selectedView,
			setSelectedView: state.setSelectedView,
		}),
	);
	const selectedModel = defaultData?.data?.[0]?.attributes?.models?.find(
		(model) => model.name === watch("configuration"),
	);
	const defaultRenderImage =
		defaultData?.data?.[0]?.attributes?.models?.[0]?.default_image?.data
			?.attributes;
	console.log("first", selectedModel);
	// const
	const store = ConstructorStore(
		(state: ConstructorStoreState) => state.constructor,
	);
	const totalPrice = ConstructorStore(
		(state: ConstructorStoreState) => state.calculateTotalPrice,
	);

	console.log("store ", store);
	const setConstructor = ConstructorStore((state: any) => state.setConstructor);
	useEffect(() => {
		setConstructor({
			defaultRenderImage: defaultRenderImage,
			defaultPrice: selectedModel?.default_price,
		});
	}, []);
	// console.log('selectedModel ', selectedModel);

	const parseUrl = (body: string, wheels: string, ) => {
		const imageName = `${body}_${wheels}.png`;
		const renderImage = selectedModel?.render_images?.data?.find(
			(item) => item.attributes.name === imageName,
		);

		return renderImage
			? getStrapiMedia(renderImage.attributes.url)
			: getStrapiMedia(defaultRenderImage?.url);
	};
	useEffect(() => {
		const url = parseUrl(store?.body?.name || "white", store?.wheels?.image || "default");
		if (url) {
			setConstructor({
				...store.constructor,
				renderImage: url,
			});
		}
	}, [store.body, store.wheels]);

	// @ts-ignore
	return (
		<>
			<div
				className={
					" h-[55vh] rounded-b-2xl shadow-2xl sm:h-[50vh] md:min-h-[60vh] md:rounded-none md:shadow-none xl:h-[calc(100vh-92px)]"
				}
			>
				<div className={"relative h-full w-full"}>
					{store.defaultRenderImage?.url !== undefined &&
					store.defaultRenderImage?.width !== undefined &&
					store.defaultRenderImage?.height !== undefined ? (
						<>
							{selectedView === "body" &&
								selectedModel?.render_images?.data?.map((renderImageItem) => {
									const currentItemUrl = getStrapiMedia(
										renderImageItem.attributes.url,
									);

									const isSelected = currentItemUrl === store.renderImage;

									return (
										<motion.div
											key={renderImageItem.id}
											initial={{ opacity: 0 }}
											animate={{
												opacity: isSelected ? 1 : 0,
											}}
											transition={{
												duration: 0.6,
												ease: "easeInOut",
											}}
										>
											<Image
												src={currentItemUrl!}
												className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
												width={renderImageItem.attributes.width}
												height={renderImageItem.attributes.height}
												alt={"car interior"}
											/>
										</motion.div>
									);
								})}
							<div className={"relative h-full w-full"}>
								{selectedView === "interior" &&
									selectedModel?.interior_colors?.map((item) => {
										const isSelected =
											item.render_url === store.interior_colors.image;
										console.log(
											"ITEM EBANY ",
											item.render_image.data.attributes.url,
										);
										return (
											<motion.div
												key={item.id}
												initial={{ opacity: 0 }}
												animate={{
													opacity: isSelected ? 1 : 0,
												}}
												transition={{ duration: 1 }} // Продолжительность анимации
											>
												<Image
													src={
														// biome-ignore lint/style/noNonNullAssertion: <explanation>
														getStrapiMedia(
															item.render_image.data.attributes.url,
														)!
													}
													className="absolute left-0 top-0 h-[90%] max-w-full"
													fill
													alt={"car"}
													objectFit="contain"
												/>
											</motion.div>
										);
									})}
							</div>
							<div className={"absolute left-0 top-0 h-full w-full"}>
								<div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:max-w-[800px] xl:max-w-[800px] 2xl:max-w-[1000px]">
									{selectedView === "virtual_view" && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 1 }}
											className="px-3"
										>
											{/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
											{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
											<iframe
												id="advanced_iframe"
												name="advanced_iframe"
												src={selectedModel?.virtual_view}
												width="100%"
												height="600"
												loading="lazy"
												className="mt-8 h-[280px] w-full rounded-xl sm:h-[400px] md:h-[420px] md:w-full xl:h-[600px] 2xl:h-[650px]"
											/>
										</motion.div>
									)}
								</div>
							</div>
						</>
					) : (
						<Loader
							styles={
								"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
							}
						/>
					)}
					<div className={"absolute bottom-2 left-3 md:bottom-8 md:left-6"}>
						<div
							className={
								"text-lg font-bold uppercase text-black/60 md:text-4xl"
							}
						>
							{selectedModel?.name}
						</div>
						<div className={"flex items-baseline gap-3"}>
							<div className={"text-lg font-bold text-black/80 md:text-2xl"}>
								Итоговая цена:
							</div>
							<div className={"text-lg font-bold md:text-3xl"}>
								{totalPrice(store) ? totalPrice(store) : 0}$
							</div>
						</div>
					</div>
					<div
						className={
							"absolute left-1/2 top-2 grid w-full -translate-x-1/2 grid-cols-2 gap-2 px-4 md:top-8 md:w-auto md:gap-3"
						}
					>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
							onClick={() => setSelectedView("body")}
							className={cn(
								"flex w-full min-w-fit items-center justify-center gap-5 whitespace-nowrap  rounded-none border border-white px-3 py-1.5 font-electrohub  text-xs font-semibold text-black transition-all ease-in-out sm:text-sm md:py-1.5 md:text-base lg:min-w-52 lg:px-8",
								selectedView === "body"
									? "rounded-md bg-white md:bg-white"
									: "border-black bg-white/20 backdrop-blur-md",
							)}
						>
							внешний вид
						</button>
						{selectedModel?.interior_colors &&
							selectedModel?.interior_colors?.length > 0 && (
								// biome-ignore lint/a11y/useButtonType: <explanation>
<button
									onClick={() => setSelectedView("interior")}
									className={cn(
										"flex w-full items-center justify-center gap-5 whitespace-nowrap  rounded-none border border-white px-3 py-1.5 font-electrohub text-base text-xs font-bold text-black transition-all sm:text-sm md:py-1.5 md:text-base lg:min-w-52 lg:px-8",
										selectedView === "interior"
											? "rounded-md bg-white md:bg-white"
											: "border-black bg-white/20 backdrop-blur-md",
									)}
								>
									внутренний вид
								</button>
							)}
						{/* {selectedModel?.virtual_view && (
							<button
								onClick={() => setSelectedView("virtual_view")}
								className={cn(
									"col-span-2 flex w-full items-center justify-center gap-5 whitespace-nowrap  rounded-none border border-white px-3 py-1.5 font-electrohub  text-xs font-semibold text-black transition-all ease-in-out sm:text-sm md:py-1.5 md:text-base lg:min-w-52 lg:px-8",
									selectedView === "virtual_view"
										? "rounded-md bg-white md:bg-white"
										: "border-black bg-white/20 backdrop-blur-md",
								)}
							>
								виртуальный вид
							</button>
						)} */}
					</div>
				</div>
			</div>
			<OfferModal form={form} />
		</>
	);
}
