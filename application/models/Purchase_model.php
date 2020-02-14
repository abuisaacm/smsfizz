<?php 
defined('BASEPATH') or exit('No direct script access allowed');
class Purchase_model extends CI_Model {
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}

	public function addNew($data)
 	{  
 		return $this->db->insert('purchase', $data);
 	}

 	public function addTopUp($data)
 	{  
 		return $this->db->insert('top_up', $data);
 	}
}