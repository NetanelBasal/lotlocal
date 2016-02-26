<?php

class PromoLoc extends \Eloquent {
    protected $guarded = ['id'];

    public $timestamps = false;

    public function promo() {
        return $this->belongsTo('promo');
    }
}