<?php
class HomeController extends BaseController {
	public function index() {

    if(Session::has('operatorId') == false) {
      Session::put('operatorId', 11);
    }

    $operatorId = Session::get('operatorId');
		$items = json_encode(Session::get('items'));

		$operator = Operator::find($operatorId);

		return View::make('template.template')
		->with('operatorConfig', $operator)
		->with('items', $items);
	}
}
