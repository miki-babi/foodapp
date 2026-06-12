<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'index')->name('home');
Route::inertia('/onboarding', 'onboarding')->name('onboarding');
Route::inertia('/notifications', 'notifications')->name('notifications');
Route::inertia('/add', 'add')->name('add');
Route::inertia('/events', 'events')->name('events');
Route::inertia('/chats', 'chats')->name('chats');
Route::inertia('/lists', 'lists')->name('lists');
Route::get('/chat/{id}', function ($id) {
    return inertia('chat', ['id' => $id]);
})->name('chat.show');
Route::get('/list/{id}', function ($id) {
    return inertia('list', ['id' => $id]);
})->name('list.show');
Route::get('/place/{id}', function ($id) {
    return inertia('place', ['id' => $id]);
})->name('place.show');
Route::get('/me', function () {
    return inertia('me');
})->name('me');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
