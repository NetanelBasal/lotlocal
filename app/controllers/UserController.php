<?php
class UserController extends BaseController {

	public function loginUser() {
		if (Auth::attempt(array('email' => Input::get('email'), 'password' => Input::get('password')))) {

			if (Auth::user()->type === 'operator') {
				$user        = Auth::user();
				$operator_id = $user->operator[0]['pivot']['operator_id'];
				Session::put('operatorId', $operator_id);
			}

			return Response::json(array("data"=> array("userName" => Auth::user()->userName)), 200);
		}

		return Response::json(array('auth' => false), 401);
	}

	public function createUser() {
		$user_id = DB::table('users')->insertGetId(array('userName' => Input::get('firstname'), 'lastname' => Input::get('firstname'), 'email' => Input::get('email'), 'password' => Hash::make(Input::get('password')), 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()));
	}

	public function logOut() {
		Session::forget('items');
		Auth::logout();
	}

	public function getUser() {
		if(Auth::check()) {
			return Response::json( Auth::user() );
		}
	}
}
