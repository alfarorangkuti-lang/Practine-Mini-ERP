<?php

namespace App\Http\Controllers\Payment;

use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;


// todo:pindahin ke service
Config::$serverKey = env('MIDTRANS_SERVER_KEY');
Config::$clientKey = env('MIDTRANS_CLIENT_KEY');
Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
Config::$isSanitized = true;
Config::$is3ds = true;

class MidtransController extends Controller
{
    public function GetMidtransToken(){
        $params = [
        'transaction_details' => [
            'order_id' => rand(), // Unique Order ID
            'gross_amount' => 10000, // Amount
        ],
        'customer_details' => [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '08123456789',
        ],
    ];

    try {
        // 2. Get Token
        $snapToken = Snap::getSnapToken($params);
        return response()->json(['snap_token' => $snapToken]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }

    }
}
