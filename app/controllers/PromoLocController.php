<?php
class PromoLocController extends \BaseController {

	public function index() {

		$loc = Input::get('loc');
		return DB::table('promo_locs')
		->join('promos', 'promos.id', '=', 'promo_locs.promo_id')
		->where('loc', '=', $loc)
		->where('promos.operator_id', '=', Session::get('operatorId'))
		->orderBy('promo_locs.ord')
		->get();
	}

	public function store() {

		$loc        = (string) Input::get('loc');
		$operatorId = Session::get('operatorId');

		DB::delete("DELETE FROM promo_locs
                WHERE loc= ?
                AND promo_id
                in
                (select id from promos where operator_id=?)
                ", array($loc, $operatorId));

		$promosIds = Input::get('promos');

		foreach ($promosIds as $key => $value) {
			$promoLoc           = new PromoLoc;
			$promoLoc->promo_id = $value;
			$promoLoc->ord      = $key;
			$promoLoc->loc      = $loc;
			$promoLoc->save();
		}
	}

	public function destroy($id) {

	}
}
