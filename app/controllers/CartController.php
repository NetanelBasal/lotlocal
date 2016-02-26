<?php
class CartController extends \BaseController {

	public function index() {
		$items = Session::get('items');
		return Response::json(array('items' => $items));
	}

	public function store() {
		Session::put('items', Input::get('items'));
		return Input::get('items');
	}

	public function update($id) {

	}

	public function destroy($id) {
		Session::forget('items');
	}

}
