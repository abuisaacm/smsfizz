<?php 
defined('BASEPATH') or exit('No direct script access allowed');
class Sms_model extends CI_Model {
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}

	public function insertMessage($data)
 	{  
 		$this->db->insert('sms', $data);
 		return $this->db->insert_id();
 	}

	function insertNumbers($data)
 	{  //var_dump($data);die();
 		return $this->db->insert_batch('numbers', $data);
 	}
}