<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{Authcontroller,Notecontroller,Maincontroller};


Route::controller(Authcontroller::class)->group(function (){
    Route::post('/register','register');
    Route::post('/login','login');
    Route::post('/logout','logout')->middleware('jwt.verify');
    Route::post('/profile','me')->middleware('jwt.verify');
});

Route::prefix('/home')->group(function (){
    Route::middleware('jwt.verify')->group(function (){
        Route::controller(Notecontroller::class)->group(function (){
            Route::post('/ajouter','AddNote')->name('ajoute');
            Route::post('/editnote/{id}','EditNote')->name('editer');
            Route::post('/isfavorite/{id}','Favorite')->name('favorite');
            Route::post('/istrash/{id}','Trash')->name('trash');
            Route::delete('/delete/{id}','Delete')->name('delete');

        });
    });
});

Route::middleware('jwt.verify')->group(function (){
    Route::controller(Maincontroller::class)->group(function (){
        Route::post('/home','main')->name('home');
        Route::post('/favorite','favorite')->name('favorite');
        Route::post('/trash','trash')->name('trash');
    });
});