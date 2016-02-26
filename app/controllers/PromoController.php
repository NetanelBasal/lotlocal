<?php
class PromoController extends \BaseController
{

    public function index() {

        $operator_id = Session::get('operatorId', 11);

        return Operator::with('promos')->where('id', '=', $operator_id)->get();
    }

    public function store() {

        $newPromo = Input::get('promo');
        $operatorId = Session::get('operatorId');
        // $rand_name = Str::random() . '.jpg';

        // $basic_path = public_path() . '/operators/' . $operatorId . '/';

        // $full_path = $basic_path . $rand_name;

        // $db_path = $operatorId . '/' . $rand_name;
        // $img = Image::make($_FILES['file0']['tmp_name']);

        //$img->fit(300, 200);

        // if (File::isDirectory($basic_path) === false) {
        //     File::makeDirectory( $basic_path );
        // }



        // $img->save( $full_path );

        $promo              = new Promo;
        $promo->Operator_id = $operatorId;
        $promo->name        = Input::get('name');
        $promo->img         = Input::get('img');
        $promo->url         = Input::get('url');
        $promo->save();

        return $promo;


    }

    public function show($id) {

        return Operator::with('promos')->where('id', '=', $id)->get();
    }

    public function update($id) {

        $promo = Promo::find($id);
        $updatedPromo = Input::get('promo');

        $promo->img = $updatedPromo['img'];
        $promo->url = $updatedPromo['url'];
        $promo->name = $updatedPromo['name'];
        $promo->save();

        return $updatedPromo;
    }

    public function destroy($id) {
        $promo = Promo::find($id);

        DB::delete("DELETE FROM promo_locs
                WHERE promo_id= ?
                ", array($id));

        if ($promo->delete()) {
            return Response::json(array('delete' => true));
        }
    }
}
