<?php
class Operator extends \Eloquent
{
    protected $guarded = array('id');

    public function promos() {
        return $this->hasMany('Promo');
    }
    public function users() {
        return $this->belongsToMany('User');
    }

    public function getConfigAttribute($value) {
        return json_decode($value);
    }
    public function setConfigAttribute($value) {

        $this->attributes['config'] = json_encode($value);
    }
}
