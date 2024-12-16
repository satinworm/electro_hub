"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
	ConstructorStore,
	type ConstructorStoreState,
	SelectedViewConstructoreStore,
} from "@/stores/car-constructor.store";
import { ZeekrModalStore } from "@/stores/dialog.store";
import type { CarConstructorResponse, Model } from "@/types/zeekr-constructor";
import { getStrapiMedia } from "@/utils/api-helpers";
import { set } from "lodash";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import ModalTrigger from "../ModalTrigger";

export default function ConfigurationForm({
	defaultData,
	form,
}: {
	defaultData: CarConstructorResponse;
	form: any;
}) {
	const { open, setOpen } = ZeekrModalStore();
	const logo = defaultData?.data?.[0]?.attributes?.logo;
	const models = defaultData?.data?.[0]?.attributes?.models;
	const selectedModelObject = models?.find(
		(model: Model) => model.name === form.watch("configuration"),
	);
	const [modelsListOpen, setModelsListOpen] = useState(false);

	const store = ConstructorStore((state: any) => state.constructor);
	const setConstructor = ConstructorStore((state: any) => state.setConstructor);
	const updatePrice = ConstructorStore(
		(state: ConstructorStoreState) => state.updatePrice,
	);
	const { selectedView, setSelectedView } = SelectedViewConstructoreStore(
		(state) => ({
			selectedView: state.selectedView,
			setSelectedView: state.setSelectedView,
		}),
	);
	const { watch } = form;
	const { offer, updateOffer } = ConstructorStore((state: any) => ({
		offer: state.offer,
		updateOffer: state.updateOffer,
	}));
	console.log("OFFER ", offer);
	useEffect(() => {
		if (selectedModelObject) {
			setConstructor({
				...store.constructor,
				body: selectedModelObject.body_colors[0].render_url,
			});
			updateOffer({
				model: {
					name: selectedModelObject.name,
					price: selectedModelObject.default_price,
				},
			});
			// updatePrice({
			//     body: selectedModelObject.incremental_price,
			// });
		}
	}, [selectedModelObject]);

	return (
		<div className={"mt-6 px-3 py-5 md:mt-0 md:px-6 lg:p-10"}>
			{logo && (
				<Image
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					src={getStrapiMedia(logo?.data.attributes?.url)!}
					alt={"Zeekr Logo"}
					width={logo?.data.attributes?.width}
					height={logo?.data.attributes?.height}
				/>
			)}
			{models && (
				<div
					className={
						"mt-12 flex w-full flex-col gap-y-10 font-electrohub md:gap-y-15"
					}
				>
					<FormField
						control={form.control}
						name="configuration"
						render={({ field }) => (
							<FormItem className="relative w-full">
								<FormLabel className="whitespace-nowrap font-bold font-electrohub text-sm">
									Модель
								</FormLabel>
								<Popover
									open={modelsListOpen}
									onOpenChange={setModelsListOpen}
									modal
								>
									<PopoverTrigger asChild>
										<Button
											variant={"constructor"}
											role="combobox"
											className="w-full justify-between rounded-none text-sm"
										>
											{field.value
												? models?.find(
														(model: Model) => model.name === field.value,
													)?.name
												: "Выберете модель"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</PopoverTrigger>

									<PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
										<Command>
											<CommandInput
												className={"font-electrohub"}
												placeholder="Поиск..."
											/>
											<CommandEmpty>не найдено</CommandEmpty>
											<CommandGroup className="max-h-[200px] overflow-y-auto bg-white">
												{models?.map((model: Model) => {
													return (
														<CommandItem
															key={model.name}
															value={model.name}
															onSelect={() => {
																updateOffer({
																	...offer,
																	model: {
																		name: model.name,
																		price: model.default_price,
																	},
																});
																form.setValue("configuration", model.name);
																console.log("first ", model);
																setSelectedView("body");
																setConstructor({
																	defaultRenderImage:
																		model.default_image.data.attributes,
																	configuration: model.name,
																	defaultPrice: model.default_price,
																	renderImage:
																		model.default_image.data.attributes.url,
																	body: model.body_colors[0].name,
																});
																setModelsListOpen(false);
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	field.value === model.name
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
															<span
																className={
																	"test-sm font-electrohub font-normal"
																}
															>
																{model.name}
															</span>
														</CommandItem>
													);
												})}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					{selectedModelObject?.default_price && (
						<div className={"flex items-baseline gap-2"}>
							<span>Стартовая цена:</span>
							<span className={"font-bold text-lg"}>
								{selectedModelObject?.default_price}$
							</span>
						</div>
					)}

					{selectedModelObject?.body_colors &&
						selectedModelObject?.body_colors?.length > 0 && (
							<FormField
								control={form.control}
								name="color"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel className="font-bold text-sm">
												Выбрать цвет кузова:
											</FormLabel>
										</div>
										<div
											className={
												"grid grid-cols-4 gap-x-5 gap-y-3 sm:grid-cols-6 xl:grid-cols-4"
											}
										>
											{selectedModelObject?.body_colors.map((item) => {
												return (
													<FormField
														key={item.render_url}
														control={form.control}
														name="color"
														render={({ field }) => {
															return (
																<FormItem key={item.id} className="flex">
																	<FormControl>
																		<FormLabel
																			className={cn(
																				"h-[70px] w-[70px] rounded-sm bg-white transition-all",
																				watch("color") === item.render_url
																					? "border-[2px] border-black p-1.5"
																					: "border-[#808080] border-[1px] p-1",
																			)}
																		>
																			<div
																				style={{
																					background: item.btn_bg,
																				}}
																				className={"h-full w-full"}
																			>
																				<Checkbox
																					checked={field.value?.includes(
																						item.render_url,
																					)}
																					className={"h-full w-full opacity-0"}
																					onCheckedChange={(checked) => {
																						updateOffer({
																							...offer,
																							body: {
																								name: item.name,
																								price:
																									item.incremental_price || 0,
																							},
																						});
																						setSelectedView("body");
																						setConstructor({
																							...store.constructor,
																							body: item.render_url,
																						});
																						updatePrice({
																							body: item.incremental_price,
																						});
																						form.setValue(
																							"color",
																							item.render_url,
																						);
																						return (
																							checked &&
																							field.onChange(item.render_url)
																						);
																					}}
																				/>
																			</div>
																		</FormLabel>
																	</FormControl>
																</FormItem>
															);
														}}
													/>
												);
											})}
										</div>

										<div className={""}>
											{selectedModelObject?.body_colors &&
												(() => {
													const selectedColor =
														selectedModelObject.body_colors.find(
															(item) => form.watch("color") === item.render_url,
														);

													return (
														<>
															<div
																className={cn(
																	"font-electrohub text-sm transition-all",
																	"mt-8 space-y-4 opacity-100",
																)}
															>
																<div
																	className={cn(
																		"gap-1.5 text-lg",
																		selectedColor?.incremental_price === 0
																			? "hidden"
																			: "flex",
																	)}
																>
																	<span>
																		{selectedColor?.incremental_price || 0}
																	</span>
																	<span className={"font-bold"}>$</span>
																</div>
																<div
																	className={cn(
																		"leading-tight transition-all",

																		selectedColor?.additional_description ===
																			null
																			? "h-0 min-h-o"
																			: "min-h-14",
																	)}
																>
																	{selectedColor?.additional_description}
																</div>
															</div>
														</>
													);
												})()}
										</div>

										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					{selectedModelObject?.interior_colors &&
						selectedModelObject?.interior_colors?.length > 0 && (
							<FormField
								control={form.control}
								name="interior_colors"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel className="font-bold text-sm">
												Выбрать салон:
											</FormLabel>
										</div>
										<div className={"grid grid-cols-4 gap-x-5 gap-y-3"}>
											{selectedModelObject?.interior_colors?.map((item) => {
												return (
													<FormField
														key={item.render_url}
														control={form.control}
														name="interior_colors"
														render={({ field }) => {
															return (
																<FormItem key={item.id} className="flex">
																	<FormControl>
																		<FormLabel
																			className={cn(
																				"relative h-[70px] w-[70px] rounded-sm bg-white transition-all duration-200",
																				watch("interior_colors") ===
																					item.render_url
																					? "border-[1px] border-black p-0"
																					: "border-[#808080] border-[1px] p-1",
																			)}
																		>
																			<Image
																				src={
																					// biome-ignore lint/style/noNonNullAssertion: <explanation>
																					getStrapiMedia(
																						item.icon.data.attributes.url,
																					)!
																				}
																				fill
																				className={cn(
																					"h-full w-full transition-all duration-200",
																					item.render_url ===
																						watch("interior_colors")
																						? "scale-100"
																						: "scale-75",
																				)}
																				alt={"asd"}
																			/>
																			<Checkbox
																				checked={field.value?.includes(
																					item.render_url,
																				)}
																				className={"h-full w-full opacity-0"}
																				onCheckedChange={(checked) => {
																					updateOffer({
																						...offer,
																						interior_color: {
																							name: item.name,
																							price:
																								item.incremental_price || 0,
																						},
																					});

																					setSelectedView("interior");
																					setConstructor({
																						...store.constructor,
																						interior_colors: {
																							name: item.name,
																							price: item.incremental_price,
																							image: item.render_url,
																							renderImage: getStrapiMedia(
																								item.render_image.data
																									.attributes.url,
																							),
																						},
																					});
																					updatePrice({
																						interior_colors:
																							item.incremental_price,
																					});
																					return (
																						checked &&
																						field.onChange(item.render_url)
																					);
																				}}
																			/>
																		</FormLabel>
																	</FormControl>
																</FormItem>
															);
														}}
													/>
												);
											})}
										</div>

										<div className={""}>
											{selectedModelObject?.interior_colors &&
												(() => {
													const selectedWheels =
														selectedModelObject.interior_colors.find(
															(item) =>
																form.watch("interior_colors") ===
																item.render_url,
														);
													if (selectedWheels?.incremental_price === 0)
														return null;

													return (
														<div
															className={
																"mt-8 space-y-4 font-electrohub text-sm"
															}
														>
															<div className={"flex gap-1.5 text-lg"}>
																<span>
																	{selectedWheels?.incremental_price || 0}
																</span>
																<span className={"font-bold"}>$</span>
															</div>
															<div className={"leading-tight"}>
																{selectedWheels?.additional_description || " "}
															</div>
														</div>
													);
												})()}
										</div>

										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					{selectedModelObject?.wheels &&
						selectedModelObject?.wheels?.length > 0 && (
							<FormField
								control={form.control}
								name="wheels"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel className="font-bold text-sm">
												Выбрать диски:
											</FormLabel>
										</div>
										<div className={"grid grid-cols-5 gap-x-5 gap-y-3"}>
											{selectedModelObject?.wheels?.map((item) => {
												return (
													<FormField
														key={item.render_url}
														control={form.control}
														name="wheels"
														render={({ field }) => {
															return (
																<FormItem key={item.id} className="flex">
																	<FormControl>
																		<FormLabel
																			className={cn(
																				"relative h-[58px] w-[58px] rounded-sm bg-white transition-all",
																				watch("wheels") === item.render_url
																					? "border-[2px] border-black p-1.5"
																					: "border-[#808080] border-[1px] p-1",
																			)}
																		>
																			<Image
																				src={
																					getStrapiMedia(
																						item.icon.data.attributes.url,
																					)!
																				}
																				fill
																				className={"h-full w-full"}
																				alt={item.name}
																			/>
																			<Checkbox
																				checked={field.value?.includes(
																					item.render_url,
																				)}
																				className={"h-full w-full opacity-0"}
																				onCheckedChange={(checked) => {
																					updateOffer({
																						...offer,
																						wheels: {
																							name: item.name,
																							price: item.incremental_price,
																						},
																					});
																					setSelectedView("body");
																					setConstructor({
																						...store.constructor,
																						wheels: {
																							btnUrl: getStrapiMedia(
																								item.icon.data.attributes.url,
																							),
																							image: item.render_url,
																							name: item.name,
																							price: item.incremental_price,
																						},
																					});
																					updatePrice({
																						wheels: item.incremental_price,
																					});
																					return (
																						checked &&
																						field.onChange(item.render_url)
																					);
																				}}
																			/>
																		</FormLabel>
																	</FormControl>
																</FormItem>
															);
														}}
													/>
												);
											})}
										</div>

										<div className={""}>
											{selectedModelObject?.wheels &&
												(() => {
													const selectedWheels =
														selectedModelObject.wheels.find(
															(item) =>
																form.watch("wheels") === item.render_url,
														);
													if (selectedWheels?.incremental_price === 0)
														return null;

													return (
														<div
															className={
																"mt-8 space-y-4 font-electrohub text-sm"
															}
														>
															<div className={"flex gap-1.5 text-lg"}>
																<span>
																	{selectedWheels?.incremental_price || 0}
																</span>
																<span className={"font-bold"}>$</span>
															</div>
															<div className={"leading-tight"}>
																{selectedWheels?.additional_description || " "}
															</div>
														</div>
													);
												})()}
										</div>

										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					{selectedModelObject?.additional_options &&
						selectedModelObject?.additional_options.length > 0 && (
							<div className={"flex flex-col gap-x-5 gap-y-3"}>
								<div className={"font-bold text-lg"}>Дополнительные опции:</div>
								{selectedModelObject?.additional_options?.map((item) => {
									return (
										<FormField
											control={form.control}
											key={item.name}
											name={item.name}
											render={({ field }) => (
												<FormItem
													className={cn(
														"flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow",
														field.value
															? "border-black bg-white"
															: " bg-white/20",
													)}
												>
													<FormControl>
														<Checkbox
															checked={field.value}
															onCheckedChange={(checked) => {
																console.log("chechekd", checked);
																setSelectedView("body");

																checked
																	? updateOffer({
																			...offer,
																			additional_options: {
																				...offer.additional_options,
																				[item.name]: {
																					name: item.title,
																					price: item.incremental_price,
																				},
																			},
																		})
																	: updateOffer({
																			...offer,
																			additional_options: {
																				...offer.additional_options,
																				[item.name]: {
																					name: item.title,
																					price: 0,
																				},
																			},
																		});
																updatePrice({
																	[item.name]: checked
																		? item.incremental_price
																		: 0,
																});
																field.onChange(checked ? item.name : false);
															}}
														/>
													</FormControl>
													<div className="space-y-1">
														<FormLabel className={"flex flex-col gap-2"}>
															<div>{item.title}</div>
															<div className={"font-bold"}>
																{item.incremental_price} $
															</div>
														</FormLabel>
													</div>
												</FormItem>
											)}
										/>
									);
								})}
							</div>
						)}
				</div>
			)}
			<div className="mt-7 flex w-full flex-col gap-2">
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="w-full cursor-pointer rounded-md bg-[#1E1E1E] py-3 text-sm text-white"
				>
					Оставить заявку
				</button>
				<Link
					href="/commercial-offer"
					type="button"
					onClick={() => {
						localStorage.setItem("offer", JSON.stringify(offer));
						localStorage.setItem("constructor", JSON.stringify(store));
					}}
					className="w-full cursor-pointer text-center rounded-md border border-[#1E1E1E] py-3 text-sm text-black"
				>
					Сформировать ком. предложение
				</Link>
				{/* <ModalTrigger
					header={"Связь с нами"}
					description={
						"Оставьте свои контактные данные и мы свяжемся с вами в ближайшее время"
					}
					label={"Консультация"}
					styles="w-full cursor-pointer rounded-md border border-[#1e1e1e] bg-white py-3 text-sm text-black"
				/> */}
				{/* <button
                    type='button'
                    className='w-full cursor-pointer rounded-md border border-[#1e1e1e] bg-white py-3 text-sm text-black'
                >
                    Консультация
                </button> */}
			</div>
		</div>
	);
}
