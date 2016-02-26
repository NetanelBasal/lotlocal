<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOperatorUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('operator_user', function(Blueprint $table)
		{
			$table->increments('id');
			// $table->integer('operator_id')->unsigned()->index();
			// $table->foreign('operator_id')->references('id')->on('operators')->onDelete('cascade');
			// $table->integer('user_id')->unsigned()->index();
			// $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			// $table->nullableTimestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('operator_user');
	}

}
