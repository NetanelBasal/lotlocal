<?php
class PaymentController extends \BaseController {

	public function __construct() {
		$this->beforeFilter('auth', array('except' => array('checkIfUserHasPaymentMethod')));
	}

	public function index() {
		return Payment::where('user_id', '=', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
	}



	public function store() {

		if (Input::get('defaultP') == true) {
			Payment::where('isDefault', '=', 1)->Where('user_id', '=', Auth::user()->id)->update(array('isDefault' => 0));
		}

		$paymentId = DB::table('payments')->insertGetId(array('type' => Input::get('type'), 'expiration' => Input::get('expiration'), 'cvv' => Input::get('cvv'), 'holderName' => Input::get('holderName'), 'isDefault' => Input::get('defaultP'), 'user_id' => Auth::user()->id, 'number' => 'xxxxxxxxx7232', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()));

		return Response::json(array('saved' => true, 'payment' => Payment::find($paymentId)));
	}

	public function update($id) {
		if (Input::get('defaultP') == true) {
			Payment::where('isDefault', '=', 1)->update(array('isDefault' => 0));
		}

		$payment             = Payment::find($id);
		// $payment->type       = Input::get('type');
		// $payment->expiration = Input::get('expiration');
		// $payment->cvv        = Input::get('cvv');
		// $payment->number     = Input::get('number');
		// $payment->holderName = Input::get('holderName');
		$payment->isDefault  = Input::get('defaultP');
		// $payment->user_id    = Auth::user()->id;
		$payment->save();


		return Response::json(array('update' => true, 'payment' => $payment));
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /payments/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id) {
		$payment = Payment::find($id);
		if ($payment->delete()) {
			return Response::json(array('delete' => true));
		}
	}

	public function checkIfUserHasPaymentMethod() {
		if (Auth::user()) {
			$payment = Payment::where('user_id', '=', Auth::user()->id)->get();

			if (count($payment) > 0) {
				return Response::json(array('hasPayment' => true));
			} else {
				return Response::json(array('hasPayment' => false));
			}
		}
	}
}
