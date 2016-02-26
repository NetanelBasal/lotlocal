<?php
class adminController extends \BaseController
{

    public function __construct() {
        $this->beforeFilter('admin');
    }

    public function index() {

        return Operator::all();
    }

    public function store() {

        $operator = Input::get('operator');

        $deafultOperator = Operator::find(11);

        $operatorId = DB::table('operators')->insertGetId(array('name' => $operator['operator']['name'], 'domain' => $operator['operator']['domain'], 'config' => json_encode($deafultOperator->config) ,'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()));

        if (count($operator['users'] > 0)) {
            for ($i = 0; $i < count($operator['users']); $i++) {
                $user = new User;
                $user->firstname = $operator['users'][$i]['firstname'];
                $user->lastname = $operator['users'][$i]['lastname'];
                $user->email = $operator['users'][$i]['email'];
                $user->password = Hash::make($operator['users'][$i]['password']);
                $user->type = 'operator';
                $user->save();
                Operator::find($operatorId)->users()->save($user);
            }
        }

        //$currentOperator = Operator::find($operatorId);
        // if (count($operator['promos'] > 0)) {
        // 	for ($i = 0; $i < count($operator['promos']); $i++) {
        // 		$promo              = new Promo;
        // 		$promo->Operator_id = $operatorId;
        // 		$promo->img         = $operator['promos'][$i]['img'];
        // 		$promo->url         = $operator['promos'][$i]['url'];
        // 		$promo->save();
        // 	}
        // }

    }

    public function show($id) {

        return Operator::with('promos')->where('id', '=', $id)->get();
    }

    public function update($id) {

        $operator = Input::get('operator');

        $currentOperator = Operator::find($id);

        $currentOperator->name = $operator['name'];
        $currentOperator->domain = $operator['domain'];
        $currentOperator->save();

        // for ($i = 0; $i < count($operator['promos']); $i++) {
        // 	$promo      = Promo::find($operator['promos'][$i]['id']);
        // 	$promo->img = $operator['promos'][$i]['img'];
        // 	$promo->url = $operator['promos'][$i]['url'];
        // 	$promo->save();
        // }


    }

    public function destroy($id) {
        $operator = Operator::find($id);
        if ($operator->delete()) {
            return Response::json(array('delete' => true));
        }
    }
}
