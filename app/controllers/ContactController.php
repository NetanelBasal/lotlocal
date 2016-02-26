<?php
class ContactController extends \BaseController {

	public function index() {
		return Contact::all();
	}

	public function store() {
		Contact::create(Input::all());
	}

	public function destroy($id) {
		$contact = Contact::find($id);
		if ($contact->delete()) {
			return Response::json(array('delete' => true));
		}
	}
}
