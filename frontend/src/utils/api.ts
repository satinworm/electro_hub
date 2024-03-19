import axios, { AxiosError, AxiosResponse } from 'axios';
import {
    QueryFunctionContext,
    useMutation,
    useQueries,
    useQuery,
    useQueryClient,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query';

export const getAccessToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken') || null;
};

// const getAuthorizationHeader = () => {
//     const accessToken = getAccessToken();
//     return accessToken ? `Bearer ${accessToken}` : '';
// };

type QueryKeyT = [string, object | undefined];

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: false,
});

// api.interceptors.request.use((request: { headers: any }) => {
//     request.headers!.Authorization = getAuthorizationHeader();

//     return request;
// });

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401) {
//             if (originalRequest.url === apiRoutes.auth.refresh) {
//                 clearTokens();
//                 window.location.href = '/login';
//                 return Promise.reject(error);
//             }

//             if (!originalRequest._retry) {
//                 originalRequest._retry = true;
//                 const accessToken = await refreshAccessToken();
//                 if (accessToken) {
//                     originalRequest.headers['Authorization'] =
//                         `Bearer ${accessToken}`;
//                     return api(originalRequest);
//                 }
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export const fetcher = <T,>({
//     queryKey,
//     pageParam,
// }: QueryFunctionContext<QueryKeyT>): Promise<T> => {
//     const [url, params] = queryKey;
//     return api
//         .get<{ data: T }>(url, { params: { ...params, pageParam } })
//         .then((res: AxiosResponse) => res.data);
// };

// export const useFetch = <T,>(
//     url: string | null,
//     params?: object,
//     config?: UseQueryOptions<T, Error, T, QueryKeyT>
// ) => {
//     return useQuery<T, Error, T, QueryKeyT>(
//         [url!, params],
//         ({ queryKey, meta }) => fetcher({ queryKey, meta }),
//         {
//             enabled: !!url,
//             ...config,
//         }
//     );
// };
// export const useFetch = <T>(
//     url: string | null,
//     params: object = {},
//     config?: UseQueryOptions<T, Error, T, QueryKeyT>
// ) => {
//     // Дополнительная проверка: если URL не задан, не используйте useQuery
//     if (!url) {
//         return {
//             data: null,
//             isLoading: false,
//             isError: false
//         }
//     }
//
//     return useQuery<T, Error, T, QueryKeyT>(
//         [url, params],
//         ({ queryKey, meta }) => fetcher({ queryKey, meta }),
//         {
//             enabled: !!url,
//             ...config
//         }
//     )
// }
// export const useFetchMany = <T,>(
//     urls: string[],
//     params?: object,
//     config?: UseQueryOptions<T, Error, T, QueryKeyT>
// ) => {
//     const queries = useQueries<Array<UseQueryResult<T, Error>>>({
//         queries: urls.map((url) => ({
//             queryKey: [url!, params],

//             //@ts-ignore
//             queryFn: ({ queryKey, meta }) => fetcher({ queryKey, meta }),
//         })),
//     });

//     const isLoading = queries.every((query) => query.isLoading);
//     const data = queries.map((query) => query.data);

//     return { data, isLoading };
// };

// const useGenericMutation = <T, S>(
//     func: (data: T | S) => Promise<AxiosResponse<S>>,
//     url: string,
//     params?: object,
//     updater?: ((oldData: T, newData: S) => T) | undefined
// ) => {
//     const queryClient = useQueryClient();

//     return useMutation<AxiosResponse, AxiosError, T | S>(func, {
//         onMutate: async (data: any) => {
//             await queryClient.cancelQueries([url!, params]);

//             const previousData = queryClient.getQueryData([url!, params]);

//             queryClient.setQueryData<T>([url!, params], (oldData) => {
//                 return updater ? updater(oldData!, data as S) : (data as T);
//             });

//             return previousData;
//         },
//         onError: (err, _, context) => {
//             queryClient.setQueryData([url!, params], context);
//         },
//         onSettled: async () => {
//             await queryClient.invalidateQueries([url!, params]);
//         },
//     });
// };

// export const useDelete = <T,>(
//     url: string,
//     params?: object,
//     updater?: (oldData: T, id: string | number) => T
// ) => {
//     return useGenericMutation<T, string | number>(
//         (id) => api.delete(`${url}/${id}`),
//         url,
//         params,
//         updater
//     );
// };

// export const usePost = <T, S>(
//     url: string,
//     params?: object,
//     updater?: (oldData: T, newData: S) => T
// ) => {
//     return useGenericMutation<T, S>(
//         (data) => api.post<S>(url, data),
//         url,
//         params,
//         updater
//     );
// };

// export const useUpdate = <T, S>(
//     url: string,
//     params?: object,
//     updater?: (oldData: T, newData: S) => T
// ) => {
//     return useGenericMutation<T, S>(
//         (data) => api.patch<S>(url, data),
//         url,
//         params,
//         updater
//     );
// };
// export const usePut = <T, S>(
//     url: string,
//     params?: object,
//     updater?: (oldData: T, newData: S) => T
// ) => {
//     return useGenericMutation<T, S>(
//         (data) => api.put<S>(url, data),
//         url,
//         params,
//         updater
//     );
// };
