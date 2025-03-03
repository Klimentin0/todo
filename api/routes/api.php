<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::apiResource('tasks', TaskController::class)->names([
    'index' => 'tasks.index',
    'store' => 'tasks.store',
    'update' => 'tasks.update',
    'destroy' => 'tasks.destroy'
]);
