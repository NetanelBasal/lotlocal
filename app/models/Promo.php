<?php
class Promo extends \Eloquent
{


    public function operator() {
        return $this->belongsTo('Operator');
    }

    public static function getForOperator($operatorId) {
        return Promo::where('operator_id', '=', $operatorId)->get();
    }


    public function getLocOrdAttribute($value)
    {
        return json_decode($value);
    }

    public function loc() {
        return $this->hasMany('PromoLoc');
    }
}
