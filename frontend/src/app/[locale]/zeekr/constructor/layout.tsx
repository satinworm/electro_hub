import ZeekrConstructorPage from "@/app/[locale]/zeekr/constructor/page";
import { getDataFromAPI } from "@/utils/fetch-api";
import type { ReactNode } from "react";

export default async function ZeekrConstructorLayout({
	children,
	params: { locale },
}: {
	children: ReactNode;
	params: { locale: string };
}) {
	const propsForPage = { asd: "asd" };
	// console.log('LOCALE ', locale);
	// return <>{children}</>;
	const ConstructorData = await getDataFromAPI(
		"car-constructors",
		{
			filters: {
				brand: {
					$eq: "zeekr",
				},
			},
			populate: {
				logo: {
					populate: true,
					fields: ["url", "width", "height"],
				},
				models: {
					fields: "*",
					populate: {
						populate: true,
						render_images: {
							fields: ["url", "width", "height", "name"],
						},
						default_image: {
							fields: ["url", "width", "height", "name"],
						},
						body_colors: {
							fields: ["*"],
						},
						wheels: {
							populate: {
								icon: {
									populate: true,
									fields: ["url", "width", "height", "name"],
								},
							},
							fields: ["*"],
						},
						interior_colors: {
							populate: {
								icon: {
									populate: true,
									fields: ["url", "width", "height", "name"],
								},
								render_image: {
									populate: true,
									fields: ["url", "width", "height", "name"],
								},
							},
						},
						additional_options: {
							fields: ["*"],
						},
						commercial_image: {
							populate: true,
						},
					},
				},
			},
		},
		locale,
	);
	return (
		<ZeekrConstructorPage
			params={{
				locale: locale,
			}}
			defaultData={ConstructorData}
			{...propsForPage}
		/>
	);
}
