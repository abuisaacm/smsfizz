<?php 
defined('BASEPATH') or exit('No direct script access allowed');
class Settings_model extends CI_Model {
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}

	public function addSMSPlan($data)
 	{  
 		return $this->db->insert('sms_plan', $data);
 	}

 	public function getPlans()
    {
    	$this->db->select('*');
        $this->db->from('sms_plan');
        return $this->db->get()->result_array();       
    }

    public function deleteSmsPlan($id)
 	{  
 		$this->db->where('id', $id);
 		return $this->db->delete('sms_plan');
 	}
}