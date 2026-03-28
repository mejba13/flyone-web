export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    preferences?: Record<string, any>;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    points_balance: number;
    roles: string[];
    email_verified_at?: string;
    two_factor_confirmed_at?: string;
}

export interface Traveler {
    id: number;
    user_id: number;
    full_name: string;
    date_of_birth: string;
    nationality: string;
    passport_number?: string;
    passport_expiry?: string;
    gender?: 'male' | 'female' | 'other';
    phone?: string;
    email?: string;
    is_primary: boolean;
}

export interface Provider {
    id: number;
    name: string;
    slug: string;
    type: 'airline' | 'railway' | 'bus' | 'ferry';
    logo_url?: string;
    rating: number;
    review_count: number;
    status: 'active' | 'inactive' | 'pending';
}

export interface Route {
    id: number;
    provider_id: number;
    provider?: Provider;
    route_number?: string;
    origin_code: string;
    origin_name: string;
    destination_code: string;
    destination_name: string;
    departure_at: string;
    arrival_at: string;
    duration_minutes: number;
    mode: 'flight' | 'train' | 'bus' | 'ferry';
    class: 'economy' | 'premium_economy' | 'business' | 'first';
    base_price: number;
    currency: string;
    available_seats: number;
    total_seats: number;
    stops: number;
    amenities?: string[];
}

export interface Booking {
    id: number;
    user_id: number;
    booking_ref: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
    subtotal: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
    currency: string;
    booked_at?: string;
    segments: BookingSegment[];
    tickets: Ticket[];
    contact_email: string;
    contact_phone?: string;
}

export interface BookingSegment {
    id: number;
    booking_id: number;
    route_id: number;
    route?: Route;
    segment_order: number;
    origin_code: string;
    origin_name: string;
    destination_code: string;
    destination_name: string;
    departure_at: string;
    arrival_at: string;
    carrier_name?: string;
    carrier_logo?: string;
    vehicle_number?: string;
    class: string;
    status: string;
}

export interface Ticket {
    id: number;
    booking_id: number;
    traveler_id: number;
    traveler?: Traveler;
    ticket_number: string;
    qr_code_data?: string;
    seat_number?: string;
    gate?: string;
    terminal?: string;
    status: 'issued' | 'checked_in' | 'boarded' | 'completed' | 'cancelled' | 'refunded';
    baggage?: Record<string, any>;
    meal_preference?: Record<string, any>;
    addons?: Record<string, any>;
    segment?: BookingSegment;
}

export interface Transaction {
    id: number;
    booking_id: number;
    amount: number;
    currency: string;
    method: 'card' | 'wallet' | 'bank_transfer' | 'bnpl';
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
    gateway_ref?: string;
}

export interface LoyaltyPoint {
    id: number;
    user_id: number;
    points: number;
    type: 'earned' | 'redeemed' | 'expired' | 'bonus' | 'referral';
    source?: string;
    description?: string;
    expires_at?: string;
    created_at: string;
}

export interface PromoCode {
    id: number;
    code: string;
    name: string;
    type: 'percentage' | 'fixed';
    value: number;
    min_order: number;
    max_discount?: number;
    valid_from: string;
    valid_until: string;
}

export interface Destination {
    id: number;
    name: string;
    slug: string;
    code: string;
    country: string;
    country_code: string;
    image_url?: string;
    description?: string;
    weather?: Record<string, any>;
    highlights?: string[];
    travel_tips?: string[];
    avg_price?: number;
    is_popular: boolean;
    is_featured: boolean;
    latitude?: number;
    longitude?: number;
    timezone?: string;
}

export interface Notification {
    id: string;
    type: string;
    title: string;
    body?: string;
    data?: Record<string, any>;
    channel: string;
    category: 'booking' | 'payment' | 'promotion' | 'loyalty' | 'system' | 'travel';
    read_at?: string;
    created_at: string;
}

export interface ChatConversation {
    id: number;
    title?: string;
    messages: ChatMessage[];
    created_at: string;
    updated_at: string;
}

export interface ChatMessage {
    id: number;
    conversation_id: number;
    role: 'user' | 'assistant';
    content: string;
    metadata?: Record<string, any>;
    created_at: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    category?: string;
    tags?: string[];
    status: 'draft' | 'published' | 'archived';
    published_at?: string;
    author: { name: string; avatar?: string };
    view_count: number;
}

export interface Review {
    id: number;
    user_id: number;
    user?: { name: string; avatar?: string };
    provider_id: number;
    rating: number;
    title?: string;
    body?: string;
    is_verified: boolean;
    created_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev?: string;
        next?: string;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface PageProps {
    [key: string]: unknown;
    auth: {
        user: User | null;
    };
    flash: {
        success?: string;
        error?: string;
    };
    app: {
        name: string;
    };
}

export interface SearchFilters {
    origin: string;
    destination: string;
    departure_date: string;
    return_date?: string;
    passengers: number;
    class: string;
    mode: string;
    trip_type: 'one_way' | 'round_trip' | 'multi_city';
}
