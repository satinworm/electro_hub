export function getStrapiURL(path = "") {
	return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
}

export function getStrapiMedia(url: string | null) {
	if (url == null) {
		return null;
	}

	// Return the full URL if the media is hosted on an external provider
	if (url.startsWith("http") || url.startsWith("//")) {
		return url;
	}

	return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return date.toLocaleDateString("en-US", options);
}
