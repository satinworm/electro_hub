import create from 'zustand';

// Определяем типы для операторов фильтрации
type FilterOperator =
    | '$eq'
    | '$eqi'
    | '$ne'
    | '$nei'
    | '$lt'
    | '$lte'
    | '$gt'
    | '$gte'
    | '$in'
    | '$notIn'
    | '$contains'
    | '$notContains'
    | '$containsi'
    | '$notContainsi'
    | '$null'
    | '$notNull'
    | '$between'
    | '$startsWith'
    | '$startsWithi'
    | '$endsWith'
    | '$endsWithi'
    | '$or'
    | '$and'
    | '$not';

// Определяем типы для структуры фильтров
interface Filter {
    [key: string]:
        | {
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              [operator in FilterOperator]?: any;
          }// biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation> // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        | Filter;
}

// Определяем состояние Zustand
interface StoreState {
    filters: Filter;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    setFilter: (path: string, operator: FilterOperator, value: any) => void;
    resetFilter: () => void;
}

// Создаем Zustand store
const useCatalogFilter = create<StoreState>((set) => ({
    filters: {
        name: { $containsi: '' },
    },
    setFilter: (path, operator, value) =>
        set((state) => {
            const newFilters = { ...state.filters };
            const keys = path.split('.');

            let current = newFilters;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (i === keys.length - 1) {
                    current[key] = { [operator]: value };
                } else {
                    if (!current[key]) current[key] = {};
                    current = current[key];
                }
            }

            return { filters: newFilters };
        }),
    resetFilter: () =>
        set({
            filters: {
                name: { $containsi: '' },
            },
        }),
}));

export default useCatalogFilter;
