import CatalogCars from "@/components/CatalogCars";
import type { BrandsResponse } from "@/types/brands.types";
import { getStrapiMedia } from "@/utils/api-helpers";
import { getDataFromAPI } from "@/utils/fetch-api";
import { redirect } from "next/navigation";
import React from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function generateMetadata({ params }: any) {
	const { locale, slug } = params;
	const pageProperties = await getDataFromAPI(
		"pages",
		{
			filters: {
				shortName: {
					$eq: "catalog",
				},
			},
			populate: {
				SEO: {
					fields: "*",
					populate: "*",
				},
			},
			locale: locale,
		},
		locale,
	);
	const brands = (await getDataFromAPI(
		"brands",

		{
			filters: {
				slug: {
					$eq: slug,
				},
			},
			sort: {
				name: "ASC",
			},
			populate: {
				name: "*",
				slug: "*",
				image: "*",
			},
			locale: locale,
		},
		locale,
	)) satisfies BrandsResponse;
	// console.dir(brands, { depth: null });
	const brandImage = brands?.data?.[0]?.attributes?.image?.data?.attributes;
	console.log("brand image", brandImage);

	const SEO = pageProperties?.data?.[0]?.attributes?.SEO;
	const additionalOgTags =
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		pageProperties?.data?.[0]?.attributes?.SEO?.MetaTag?.map((tag: any) => {
			if (!tag) return;
			return {
				[tag?.Name]: tag?.Content,
			};
		});
	const other = additionalOgTags ? Object.assign({}, ...additionalOgTags) : {};

	return {
		title: `Electrohub | ${brands?.data?.[0]?.attributes?.name || "Каталог"}`,
		openGraph: {
			title: `Electrohub | ${brands?.data?.[0]?.attributes?.name}`,
			description: SEO?.MetaDescription,
			images: [
				{
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					url: getStrapiMedia(brandImage?.url)!,
					width: brandImage?.width,
					height: brandImage?.height,
				},
			],
		},
		other: other,
	};
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function CatalogPage({ params }: any) {
	const { locale, slug, status } = params;
	if (!slug) {
		redirect("/ru/catalog/all/all");
	}
	const carsInStockData = await getDataFromAPI(
		"cars-in-stocks",
		{
			sort: {
				name: "ASC",
			},
			filters: {
				slug: {
					$containsi: slug === "all" ? "" : slug,
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
				brand: {
					populate: "*",
					fields: ["name", "slug"],
				},
			},
			pagination: {
				page: 1,
				pageSize: 12,
			},
			locale: locale,
		},
		locale,
	);
	const generations = await getDataFromAPI(
		"cars-in-stocks",
		{
			populate: {
				brand: "*",
			},
			fields: ["generation"],
			pagination: {
				pageSize: 1000,
			},
		},
		locale,
	);

	// const pagination = initialData?.meta?.pagination as {
	const pagination = carsInStockData?.meta?.pagination as {
		pageCount: number;
		total: number;
	};
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function groupGenerationsByBrand(data: any[]) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const brandsGenerations: { [key: string]: any[] } = {};

		for (const item of data) {
			const brand = item.attributes.brand.data.attributes.name;
			const generation = item.attributes.generation;

			// Если бренд уже существует в объекте, добавляем поколение
			if (brandsGenerations[brand]) {
				brandsGenerations[brand].push(generation);
			} else {
				// Если бренд еще не существует, создаем новый ключ и добавляем первое поколение
				brandsGenerations[brand] = [generation];
			}
		}

		// Преобразуем объект в массив, сортируем ключи, убираем дубликаты и преобразуем обратно в объект
		const sortedBrandsGenerations = Object.keys(brandsGenerations)
			.sort() // Сортировка по алфавиту
			.reduce((sortedObj: { [key: string]: any[] }, brand) => {
				// Убираем дубликаты из массива поколений для каждого бренда с помощью Set
				sortedObj[brand] = [...new Set(brandsGenerations[brand])]; // Убираем дубликаты
				return sortedObj;
			}, {});

		return sortedBrandsGenerations;
	}

	const groupedGenerations = groupGenerationsByBrand(generations.data);
	console.log("groupedGenerations", groupedGenerations);

	return (
		<section className={"bg-[#92A6AD] pt-20 font-electrohub"}>
			<CatalogCars
				data={carsInStockData}
				locale={locale}
				brands={groupedGenerations}
				slug={slug}
				pageCount={pagination.pageCount}
				total={pagination.total}
				status={status}
				generations={generations}
			/>
		</section>
	);
}
