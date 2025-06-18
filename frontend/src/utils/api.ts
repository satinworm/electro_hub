import axios from 'axios';

type QueryKeyT = [string, object | undefined];

export const api = axios.create({
	baseURL: "https://strapi.electrohub.by",
	withCredentials: true,
});
export const bot = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BOT_URL,
    withCredentials: false,
});
