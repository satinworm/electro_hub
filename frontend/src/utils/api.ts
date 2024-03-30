import axios, { AxiosError, AxiosResponse } from 'axios';

type QueryKeyT = [string, object | undefined];

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: false,
});
