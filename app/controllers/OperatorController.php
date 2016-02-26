<?php
class OperatorController extends \BaseController {

	public function index() {

		$operator_id = Session::get('operatorId');

		return Operator::with('promos')->where('id', '=', $operator_id)->get();
	}

	public function store() {

		$operator   = Input::get('operator');
		$operatorId = Session::get('operatorId');

		if (count($operator['user'] == 4)) {
			$user = new User(array('firstname' => $operator['user']['firstname'], 'lastname' => $operator['user']['lastname'], 'email' => $operator['user']['email'], 'password' => Hash::make($operator['user']['password']), 'type' => 'operator', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()));
			Operator::find($operatorId)->users()->save($user);
		}

		if (count($operator['promos'] > 0)) {
			for ($i = 0; $i < count($operator['promos']); $i++) {
				$promo              = new Promo;
				$promo->Operator_id = $operatorId;
				$promo->img         = $operator['promos'][$i]['img'];
				$promo->url         = $operator['promos'][$i]['url'];
				$promo->save();
			}
		}
	}

	public function show($id) {

		return Operator::with('promos')->where('id', '=', $id)->get();
	}

	public function update($id) {

		$operator = Input::get('operator');

		$currentOperator = Operator::find($id);

		$currentOperator->name   = $operator['name'];
		$currentOperator->domain = $operator['domain'];

		for ($i = 0; $i < count($operator['promos']); $i++) {
			$promo      = Promo::find($operator['promos'][$i]['id']);
			$promo->img = $operator['promos'][$i]['img'];
			$promo->url = $operator['promos'][$i]['url'];
			$promo->loc = $operator['promos'][$i]['loc'];
			$promo->save();
		}

		$currentOperator->save();
		return $currentOperator;
	}

	public function destroy($id) {
		$promo = Promo::find($id);
		if ($promo->delete()) {return Response::json(array('delete' => true));
		}
	}

	public function saveOperatorSettings() {

		$operatorId = Session::get('operatorId');
		$operator   = Operator::find($operatorId);

		$operator->config = Input::get('operatorConfig');
		$operator->save();
		return $operatorId;
	}
}
