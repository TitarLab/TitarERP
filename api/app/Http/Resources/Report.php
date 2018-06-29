<?php

namespace App\Http\Resources;



class Report
{
	public $info;
	public $code;
	public $result;

	function __construct($code, $result, $info) {
		$this->info = $info;
		$this->code = $code;
		$this->result = $result;
		return [
			"code" => $code,
			"result" => $result,
			"info" => $info
		];
   }
}
