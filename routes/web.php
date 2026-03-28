<?php

use App\Modules\Search\Http\Controllers\HomeController;
use App\Modules\Search\Http\Controllers\SearchController;
use App\Modules\Search\Http\Controllers\DestinationController;
use App\Modules\Booking\Http\Controllers\BookingController;
use App\Modules\Payment\Http\Controllers\PaymentController;
use App\Modules\User\Http\Controllers\AuthController;
use App\Modules\User\Http\Controllers\SocialAuthController;
use App\Modules\User\Http\Controllers\DashboardController;
use App\Modules\User\Http\Controllers\TripController;
use App\Modules\User\Http\Controllers\TicketController;
use App\Modules\User\Http\Controllers\ProfileController;
use App\Modules\User\Http\Controllers\NotificationController;
use App\Modules\Loyalty\Http\Controllers\LoyaltyController;
use App\Modules\AI\Http\Controllers\ChatController;
use App\Modules\Admin\Http\Controllers\BlogController;
use App\Modules\Admin\Http\Controllers\AdminDashboardController;
use App\Modules\Provider\Http\Controllers\ProviderDashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', HomeController::class)->name('home');

// Search
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/search/results', [SearchController::class, 'results'])->name('search.results');
Route::get('/api/autocomplete', [SearchController::class, 'autocomplete'])->name('search.autocomplete');

// Destinations
Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations');
Route::get('/destinations/{slug}', [DestinationController::class, 'show'])->name('destinations.show');

// Blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    // Social Auth
    Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])->name('social.redirect');
    Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'callback'])->name('social.callback');
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/trips', [TripController::class, 'index'])->name('trips');
    Route::get('/dashboard/tickets', [TicketController::class, 'show'])->name('tickets.show');

    // Profile & Travelers
    Route::get('/dashboard/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/dashboard/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/dashboard/profile/travelers', [ProfileController::class, 'storeTraveler'])->name('profile.travelers.store');
    Route::put('/dashboard/profile/travelers/{traveler}', [ProfileController::class, 'updateTraveler'])->name('profile.travelers.update');
    Route::delete('/dashboard/profile/travelers/{traveler}', [ProfileController::class, 'destroyTraveler'])->name('profile.travelers.destroy');

    // Loyalty
    Route::get('/dashboard/loyalty', [LoyaltyController::class, 'index'])->name('loyalty');
    Route::post('/api/promo/apply', [LoyaltyController::class, 'applyPromo'])->name('promo.apply');

    // Notifications
    Route::get('/dashboard/notifications', [NotificationController::class, 'index'])->name('notifications');
    Route::post('/dashboard/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/dashboard/notifications/mark-all-read', [NotificationController::class, 'markAllRead'])->name('notifications.mark-all-read');

    // Booking Flow
    Route::get('/booking/passengers', [BookingController::class, 'passengers'])->name('booking.passengers');
    Route::get('/booking/seats', [BookingController::class, 'seats'])->name('booking.seats');
    Route::get('/booking/addons', [BookingController::class, 'addons'])->name('booking.addons');
    Route::get('/booking/review', [BookingController::class, 'review'])->name('booking.review');
    Route::get('/booking/payment', [BookingController::class, 'payment'])->name('booking.payment');
    Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/booking/confirmation/{bookingRef}', [BookingController::class, 'confirmation'])->name('booking.confirmation');
    Route::post('/booking/{booking}/cancel', [BookingController::class, 'cancel'])->name('booking.cancel');

    // Payment
    Route::post('/payments/process', [PaymentController::class, 'process'])->name('payment.process');
    Route::get('/api/payments/setup-intent', [PaymentController::class, 'setupIntent'])->name('payment.setup-intent');

    // Tickets
    Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name('ticket.show');
    Route::get('/tickets/{ticket}/download', [TicketController::class, 'download'])->name('ticket.download');

    // AI Chat
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::post('/chat', [ChatController::class, 'store'])->name('chat.store');
    Route::get('/chat/{conversation}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chat/{conversation}/message', [ChatController::class, 'sendMessage'])->name('chat.message');
    Route::delete('/chat/{conversation}', [ChatController::class, 'destroy'])->name('chat.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin|super_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
});

/*
|--------------------------------------------------------------------------
| Provider Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:provider'])->prefix('provider')->name('provider.')->group(function () {
    Route::get('/', [ProviderDashboardController::class, 'index'])->name('dashboard');
});
