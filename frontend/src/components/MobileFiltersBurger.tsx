import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
	Check,
	ChevronsUpDown,
	SlidersHorizontal,
	Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const statusOptions = [
	{ value: "все", label: "Все", slug: "all" },
	{ value: "в пути", label: "В пути", slug: "in-transit" },
	{ value: "в наличии", label: "В наличии", slug: "in-stock" },
	{ value: "зарезервирован", label: "Зарезервирован", slug: "reserved" },
];
export default function MobileFiltersBurger({
	setFilter,
	filters,
	form,
	defaultValues,
	setValue,
	brands,
	generations,
	bodyOption,
	privodOption,
	handleBrandSelect,
	handleGenerationSelect,
	handlePriceChange,
	resetFilter,
	brandListOpen,
	setBrandListOpen,
	generationListOpen,
	setGenerationListOpen,
	bodyListOpen,
	setBodyListOpen,
	privodListOpen,
	setPrivodListOpen,
	engineListOpen,
	setEngineListOpen,
	engine_type,
	setPage,
	statusListOpen,
	setStatusListOpen,
	status,
	slug,
	openBurger,
	setOpenBurger,
}: any) {
	const [windowWidth, setWindowWidth] = useState<number>(0);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth);
			window.addEventListener("resize", () => {
				setWindowWidth(window.innerWidth);
			});
		}
		return () => {
			window.removeEventListener("resize", () => {
				setWindowWidth(window.innerWidth);
			});
		};
	}, []);
	const { push } = useRouter();
	// @ts-ignore
	const uniqueGenerations = [...new Set(generations)];
	return (
		<>
			{windowWidth < 768 && (
				<Sheet open={openBurger} onOpenChange={setOpenBurger}>
					<div className={"flex gap-1.5"}>
						<FormField
							control={form.control}
							name="brand"
							render={({ field }) => (
								<FormItem className="relative flex flex-col gap-1.5">
									{/*<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-xs">*/}
									{/*    Марка*/}
									{/*</FormLabel>*/}
									<Popover
										open={brandListOpen}
										onOpenChange={setBrandListOpen}
										modal
									>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												role="combobox"
												className="h-9 w-52 justify-between rounded-md border border-[#1E1E1E] px-3 py-2 text-xs sm:text-sm"
											>
												{field.value
													? brands.find(
															// biome-ignore lint/suspicious/noExplicitAny: <explanation>
															(brand: any) =>
																brand.attributes.name === field.value,
														)?.attributes.name
													: "марка автомобиля"}

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
													{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
													{brands?.map((brand: any) => (
														<CommandItem
															key={brand.id}
															value={brand.attributes.name}
															onSelect={async () => {
																await handleBrandSelect(brand.attributes.name);
																setValue("generation", "");
																push(
																	`${
																		process.env.NEXT_PUBLIC_PUBLIC_URL
																	}/ru/catalog/${brand.attributes.slug.toLowerCase()}/${
																		status ? status : form.watch("status")
																	}`,
																);
																setPage(1);
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	field.value === brand.attributes.name
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
															<span
																className={
																	"test-sm font-electrohub font-normal"
																}
															>
																{brand.attributes.name}
															</span>
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<SheetTrigger
							className={
								"cursor-pointer w-fit rounded-md border border-black bg-white px-2 py-1 text-center font-electrohub font-medium text-black text-sm transition hover:bg-[#1e1e1e] hover:text-white"
							}
						>
							<SlidersHorizontal />
						</SheetTrigger>
						{Object.keys(filters).length > 1 && (
							<Button
								type={"button"}
								className={"mt-auto w-fit flex"}
								size={"sm"}
								onClick={() => {
									resetFilter();
									form.reset(defaultValues);
									setOpenBurger(false);
								}}
							>
								<span className={"hidden md:block"}>Сбросить фильтры</span>
								<Trash2Icon className={"block md:hidden"} />
							</Button>
						)}
					</div>

					<SheetContent
						side={"bottom"}
						className={
							" rounded-t-xl px-8 py-6 font-electrohub sm:px-10 sm:px-8 md:px-12 md:py-10 lg:px-10"
						}
					>
						<SheetHeader>
							<SheetTitle className={"text-left text-[#808080]"}>
								Настройка фильтров
							</SheetTitle>
						</SheetHeader>

						<div
							className={
								"mt-2 flex flex-col items-baseline gap-2 bg-[#FFFFFF] py-4"
							}
						>
							<FormField
								control={form.control}
								name="generation"
								render={({ field }) => (
									<FormItem className="relative flex min-w-[300px] flex-col gap-1.5">
										<FormLabel className="whitespace-nowrap font-electrohub font-medium text-xs">
											Модель
										</FormLabel>
										<Popover
											open={generationListOpen}
											onOpenChange={setGenerationListOpen}
											modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													disabled={!form.watch("brand")}
													className="h-8 w-full justify-between rounded-md border border-[#1E1E1E] py-2 text-xs sm:text-sm"
												>
													{field.value ? field.value : "Выберите модель"}

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
														{uniqueGenerations?.map((generation: any) => (
															<CommandItem
																key={generation}
																value={generation}
																onSelect={() => {
																	handleGenerationSelect(generation);
																	setPage(1);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		field.value === generation
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
																<span
																	className={
																		"test-sm font-electrohub font-normal"
																	}
																>
																	{generation}
																</span>
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="body"
								render={({ field }) => (
									<FormItem className="relative flex min-w-[300px] flex-col gap-1.5">
										<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-xs">
											Кузов
										</FormLabel>
										<Popover
											open={bodyListOpen}
											onOpenChange={setBodyListOpen}
											modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													className="h-8 w-[300px] w-full justify-between rounded-md border border-[#1E1E1E] py-2 text-xs sm:text-sm"
												>
													{field.value
														? bodyOption.find(
																(brand: any) => brand.id === field.value,
															)?.name
														: "Выберите кузов"}

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
														{bodyOption?.map((brand: any) => (
															<CommandItem
																key={brand.id}
																value={brand.id}
																onSelect={async () => {
																	setFilter("body", "$eq", brand.id);
																	setBodyListOpen(false);
																	setValue("body", brand.id);
																	setPage(1);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		field.value === brand.id
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
																<span
																	className={
																		"test-sm font-electrohub font-normal"
																	}
																>
																	{brand.name}
																</span>
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="privod"
								render={({ field }) => (
									<FormItem className="relative flex min-w-[300px] flex-col gap-1.5">
										<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-xs">
											Привод
										</FormLabel>
										<Popover
											open={privodListOpen}
											onOpenChange={setPrivodListOpen}
											modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													className="h-8 w-full justify-between rounded-md border border-[#1E1E1E] py-2 text-xs sm:text-sm"
												>
													{field.value
														? privodOption.find(
																(brand: any) => brand.id === field.value,
															)?.name
														: "Выберите привод"}

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
														{privodOption?.map((brand: any) => (
															<CommandItem
																key={brand.id}
																value={brand.id}
																onSelect={async () => {
																	setFilter("privod", "$eq", brand.id);
																	setPrivodListOpen(false);
																	setValue("privod", brand.id);
																	setPage(1);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		field.value === brand.id
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
																<span
																	className={
																		"test-sm font-electrohub font-normal"
																	}
																>
																	{brand.name}
																</span>
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="engine_type"
								render={({ field }) => (
									<FormItem className="relative flex min-w-[300px] flex-col gap-1.5">
										<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-xs">
											Тип двигателя
										</FormLabel>
										<Popover
											open={engineListOpen}
											onOpenChange={setEngineListOpen}
											// modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													className="h-8 w-[300px] w-full justify-between rounded-md border border-[#1E1E1E] py-2 text-xs sm:text-sm"
												>
													{field.value
														? engine_type.find(
																(brand: any) => brand.id === field.value,
															)?.name
														: "Выберите тип двигателя"}

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
														{engine_type?.map((brand: any) => (
															<CommandItem
																key={brand.id}
																value={brand.id}
																onSelect={async () => {
																	setFilter("engine_type", "$eq", brand.id);
																	setPrivodListOpen(false);
																	setValue("engine_type", brand.id);
																	setPage(1);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		field.value === brand.id
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
																<span
																	className={
																		"test-sm font-electrohub font-normal"
																	}
																>
																	{brand.name}
																</span>
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem className="relative flex min-w-[300px] flex-col gap-1.5">
										<FormLabel className="whitespace-nowrap font-electrohub font-medium text-xs">
											Статус
										</FormLabel>
										<Popover
											open={statusListOpen}
											onOpenChange={setStatusListOpen}
											// modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													className="h-8 w-full justify-between rounded-md border border-[#1E1E1E] py-2 text-xs sm:text-sm"
												>
													{field.value
														? statusOptions.find(
																// biome-ignore lint/suspicious/noExplicitAny: <explanation>
																(brand: any) => brand.slug === field.value,
															)?.label
														: "Выберите статус"}

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
														{statusOptions?.map(
															// biome-ignore lint/suspicious/noExplicitAny: <explanation>
															(brand: any) => (
																<CommandItem
																	key={brand.id}
																	value={brand.slug}
																	onSelect={async () => {
																		console.log("status ", brand);
																		if (brand.value === "все") {
																			setFilter("status", "$ne", "null");
																		} else {
																			setFilter("status", "$eq", brand.value);
																		}
																		setPage(1);
																		setValue("generation", "");
																		setValue("status", brand.slug);
																		push(
																			`${
																				process.env.NEXT_PUBLIC_PUBLIC_URL
																			}/ru/catalog/${
																				slug ? slug : form.watch("brand")
																			}/${brand.slug}`,
																		);
																	}}
																>
																	<Check
																		className={cn(
																			"mr-2 h-4 w-4",
																			field.value === brand.slug
																				? "opacity-100"
																				: "opacity-0",
																		)}
																	/>
																	<span
																		className={
																			"test-sm font-electrohub font-normal"
																		}
																	>
																		{brand.label}
																	</span>
																</CommandItem>
															),
														)}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className={"flex flex-col items-baseline gap-2"}>
								<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-xs sm:text-sm">
									Цена
								</FormLabel>
								<div className={"flex gap-1"}>
									<FormField
										control={form.control}
										name="price_start"
										render={({ field }) => (
											<FormItem>
												{/*<FormControl>*/}
												<Input
													className={
														"h-8 w-32 rounded-l-md border border-[#1E1E1E] text-sm"
													}
													placeholder={"от"}
													{...field}
													onChange={(e) => {
														field.onChange(e);
														handlePriceChange(e, "start");
														setPage(1);
													}}
												/>
												{/*</FormControl>*/}
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="price_end"
										render={({ field }) => (
											<FormItem>
												{/*<FormControl>*/}
												<Input
													className={
														"h-8 w-32 rounded-r-md border border-[#1E1E1E] text-sm"
													}
													placeholder={"до"}
													{...field}
													onChange={(e) => {
														field.onChange(e);
														handlePriceChange(e, "end");
														setPage(1);
													}}
												/>
												{/*</FormControl>*/}
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div className={"mt-3 flex gap-2"}>
								<Button
									type={"button"}
									size={"sm"}
									onClick={() => {
										setOpenBurger(false);
									}}
									className={"border border-black bg-white text-black text-xs"}
								>
									Перейти
								</Button>
								<Button
									type={"button"}
									className={"mt-auto"}
									size={"sm"}
									onClick={() => {
										resetFilter();
										form.reset(defaultValues);
										setOpenBurger(false);
									}}
								>
									<span className={"hidden md:block"}>Сбросить фильтры</span>
									<Trash2Icon className={"block md:hidden"} />
								</Button>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			)}
		</>
	);
}
