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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DesktopFiltersBurger({
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
}: any) {
	const [windowWidth, setWindowWidth] = useState<number>(0);
	useEffect(() => {
		setWindowWidth(window.innerWidth);
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});
	}, []);
	const { push } = useRouter();
	// @ts-ignore
	const uniqueGenerations = [...new Set(generations)];
	return (
		<>
			{windowWidth >= 768 && (
				<div className={"hidden font-electrohub md:block"}>
					<div
						className={
							"hideScrollbar top-10 z-10 mt-2 flex flex-col items-baseline gap-3 bg-[#FFFFFF] py-4"
						}
					>
						<div className={"flex flex-wrap gap-3"}>
							<FormField
								control={form.control}
								name="brand"
								render={({ field }) => (
									<FormItem className="relative flex min-w-[300px] flex-col gap-3">
										<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
											Марка
										</FormLabel>
										<Popover
											open={brandListOpen}
											onOpenChange={setBrandListOpen}
											// modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													className="w-[300px] w-full justify-between rounded-md border border-[#1E1E1E] text-sm"
												>
													{field.value
														? brands.find(
																(brand: any) =>
																	brand.attributes.name === field.value,
															)?.attributes.name
														: "Выберите марку автомобиля"}

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
														{brands?.map(
															// biome-ignore lint/suspicious/noExplicitAny: <explanation>
															(brand: any) => (
																<CommandItem
																	key={brand.id}
																	value={brand.attributes.name}
																	onSelect={async () => {
																		await handleBrandSelect(
																			brand.attributes.name,
																		);
																		setPage(1);
																		setValue("generation", "");
																		push(
																			`${
																				process.env.NEXT_PUBLIC_PUBLIC_URL
																			}/ru/catalog/${brand.attributes.slug.toLowerCase()}`,
																		);
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

							<FormField
								control={form.control}
								name="generation"
								render={({ field }) => (
									<FormItem className="relative flex min-w-[200px] flex-col gap-3">
										<FormLabel className="whitespace-nowrap font-electrohub font-medium text-sm">
											Модель
										</FormLabel>
										<Popover
											open={generationListOpen}
											onOpenChange={setGenerationListOpen}
											// modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													disabled={!form.watch("brand")}
													className={cn(
														"w-[200px] w-full justify-between rounded-md border border-[#1E1E1E] text-sm",
														!form.watch("brand") ? "cursor-not-allowed" : "",
													)}
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
														{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
														{uniqueGenerations?.map((generation: any) => (
															<CommandItem
																key={generation}
																value={generation}
																onSelect={async () => {
																	await handleGenerationSelect(generation);
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
									<FormItem className="relative flex min-w-[200px] flex-col gap-3">
										<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
											Кузов
										</FormLabel>
										<Popover
											open={bodyListOpen}
											onOpenChange={setBodyListOpen}
											// modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													className="w-[300px] w-full justify-between rounded-md border border-[#1E1E1E] text-sm"
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
									<FormItem className="relative flex min-w-[200px] flex-col gap-3">
										<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
											Привод
										</FormLabel>
										<Popover
											open={privodListOpen}
											onOpenChange={setPrivodListOpen}
											// modal
										>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													role="combobox"
													className="w-[200px] w-full justify-between rounded-md border border-[#1E1E1E] text-sm"
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
									<FormItem className="relative flex min-w-[300px] flex-col gap-3">
										<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
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
													className="w-full justify-between rounded-md border border-[#1E1E1E] text-sm"
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
						</div>
						<div className={"flex flex-col items-baseline gap-2"}>
							<FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
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
													"w-32 rounded-l-md border border-[#1E1E1E] text-sm"
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
													"w-32 rounded-r-md border border-[#1E1E1E] text-sm"
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
					</div>
				</div>
			)}
		</>
	);
}
