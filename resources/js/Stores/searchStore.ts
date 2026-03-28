import { create } from 'zustand';
import type { SearchFilters } from '@/Types';

interface SearchState {
    filters: SearchFilters;
    isSearching: boolean;
    recentSearches: SearchFilters[];
    setFilters: (filters: Partial<SearchFilters>) => void;
    setIsSearching: (isSearching: boolean) => void;
    addRecentSearch: (search: SearchFilters) => void;
    clearRecentSearches: () => void;
    resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
    origin: '',
    destination: '',
    departure_date: '',
    return_date: '',
    passengers: 1,
    class: 'economy',
    mode: 'flight',
    trip_type: 'one_way',
};

export const useSearchStore = create<SearchState>((set) => ({
    filters: defaultFilters,
    isSearching: false,
    recentSearches: [],
    setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
    setIsSearching: (isSearching) => set({ isSearching }),
    addRecentSearch: (search) =>
        set((state) => ({
            recentSearches: [search, ...state.recentSearches.slice(0, 4)],
        })),
    clearRecentSearches: () => set({ recentSearches: [] }),
    resetFilters: () => set({ filters: defaultFilters }),
}));
