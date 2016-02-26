<?php
Route::get('/', 'HomeController@index');

Route::resource('operator', 'OperatorController');
Route::resource('cart', 'CartController');
Route::resource('contact', 'ContactController');
Route::post('saveOperatorSettings', 'OperatorController@saveOperatorSettings');

Route::resource('promoLoc', 'PromoLocController');
Route::resource('promo', 'PromoController');

Route::resource('admin', 'adminController');


Route::get('checkIfUserHasPaymentMethod', 'PaymentController@checkIfUserHasPaymentMethod');

/*==========  User Controller  ==========*/

Route::group(array('prefix' => 'api/player/account'), function () {
    Route::post('login', 'UserController@loginUser');
    Route::post('register', 'UserController@createUser');
    Route::post('log-out', 'UserController@logOut');
});
Route::group(array('prefix' => 'api/player/activity'), function () {

    Route::get('transactions', function () {
        return file_get_contents('public/api/transactions.json');
    });
    Route::get('tickets', function () {
        return file_get_contents('public/api/tickets.json');
    });
    Route::get('purchases', function () {
        return file_get_contents('public/api/Purchase.json');
    });
    Route::post('purchase/{id}', function () {
        return file_get_contents('public/api/single_purchase.json');
    });

    Route::resource('payments', 'PaymentController');


    Route::post('personal', 'UserController@getUser');
});

 Route::post('api/player/PaymentMethod/create', 'PaymentController@store');

Route::group(array('prefix' => 'api/player/offer/type'), function () {

    Route::get('draw/product', function () {
        return file_get_contents('public/api/final_drawBasedProducts.json');
    });
});

/*==========  Lot API  ==========*/

Route::group(array('prefix' => 'api'), function () {

    Route::get('user', function () {
        return file_get_contents('public/api/user.json');
    });

    Route::get('latest-results', function () {
        return file_get_contents('public/api/latest-results.json');
    });

    Route::get('group', function () {
        return file_get_contents('public/api/group.json');
    });

    Route::get('latest-results', function () {
        return file_get_contents('public/api/latest-results.json');
    });

    Route::get('lottery-results-details', function () {
        return file_get_contents('public/api/lotteryResultsDetails.json');
    });

    Route::get('lottery-results-details-by-date', function () {
        return file_get_contents('public/api/lotteryResultsByDate.json');
    });
});

/*==========  languages files  ==========*/

Route::group(array('prefix' => 'languages'), function () {
    Route::get('en', function() {
        return file_get_contents('public/languages/en.json');
    });

    Route::get('fra', function() {
        return file_get_contents('public/languages/fra.json');
    });

    //  Route::get('Русский', function () {
    //     return file_get_contents('languages/Русский.json');
    // });

    Route::get('Deutsch', function() {
        return file_get_contents('public/languages/Deutsch.json');
    });
});

/*==========  Countries and States  ==========*/

Route::group(array('prefix' => 'countries'), function () {
    Route::get('names', function () {
        return Country::all();
    });

    Route::get('states', function () {
        return State::all();
    });
});

Route::get('paging', function () {
    return Promo::paginate(1);
});

Route::post('updateLocation', 'promoController@updateLocation');

Route::group(array('prefix' => 'info'), function () {
    Route::get('terms', function () {
        return file_get_contents('public/info/terms.json');
    });
    Route::get('policy', function () {
        return file_get_contents('public/info/policy.json');
    });
    Route::get('faq', function () {
        return file_get_contents('public/info/faq.json');
    });
});
