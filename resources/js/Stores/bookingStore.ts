import { create } from 'zustand';
import type { Route, Traveler } from '@/Types';

interface BookingState {
    selectedRoute: Route | null;
    returnRoute: Route | null;
    travelers: Traveler[];
    seatSelections: Record<number, string>;
    addons: {
        baggage: Record<number, string>;
        meals: Record<number, string>;
        insurance: boolean;
        lounge: boolean;
    };
    promoCode: string;
    discount: number;
    currentStep: number;
    setSelectedRoute: (route: Route | null) => void;
    setReturnRoute: (route: Route | null) => void;
    setTravelers: (travelers: Traveler[]) => void;
    setSeatSelection: (travelerId: number, seat: string) => void;
    setAddons: (addons: Partial<BookingState['addons']>) => void;
    setPromoCode: (code: string) => void;
    setDiscount: (discount: number) => void;
    setCurrentStep: (step: number) => void;
    reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    selectedRoute: null,
    returnRoute: null,
    travelers: [],
    seatSelections: {},
    addons: {
        baggage: {},
        meals: {},
        insurance: false,
        lounge: false,
    },
    promoCode: '',
    discount: 0,
    currentStep: 1,
    setSelectedRoute: (route) => set({ selectedRoute: route }),
    setReturnRoute: (route) => set({ returnRoute: route }),
    setTravelers: (travelers) => set({ travelers }),
    setSeatSelection: (travelerId, seat) =>
        set((state) => ({
            seatSelections: { ...state.seatSelections, [travelerId]: seat },
        })),
    setAddons: (addons) =>
        set((state) => ({
            addons: { ...state.addons, ...addons },
        })),
    setPromoCode: (promoCode) => set({ promoCode }),
    setDiscount: (discount) => set({ discount }),
    setCurrentStep: (step) => set({ currentStep: step }),
    reset: () =>
        set({
            selectedRoute: null,
            returnRoute: null,
            travelers: [],
            seatSelections: {},
            addons: { baggage: {}, meals: {}, insurance: false, lounge: false },
            promoCode: '',
            discount: 0,
            currentStep: 1,
        }),
}));
