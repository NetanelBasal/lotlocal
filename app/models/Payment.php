<?php

class Payment extends \Eloquent {
	protected $guarded = ['id'];

    public function user() {
        return $this->belongsTo('user');
    }
}