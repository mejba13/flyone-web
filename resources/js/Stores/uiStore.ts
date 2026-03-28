import { create } from 'zustand';

interface UIState {
    isMobileMenuOpen: boolean;
    isSearchExpanded: boolean;
    theme: 'light' | 'dark';
    toggleMobileMenu: () => void;
    setSearchExpanded: (expanded: boolean) => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    isSearchExpanded: false,
    theme: 'light',
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setSearchExpanded: (expanded) => set({ isSearchExpanded: expanded }),
    setTheme: (theme) => set({ theme }),
}));
