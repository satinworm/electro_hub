import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Messages } from "../global";

const locales = ["ru"];
const defaultLocale = "ru";

export default getRequestConfig(async ({ locale }) => {
	if (!locales.includes(locale as any)) notFound();
	return {
		messages: (await import(`../messages/${locale}.json`)).default as Messages,
	};
});
