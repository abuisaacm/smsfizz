<?php 
defined('BASEPATH') or exit('No direct script access allowed');
class Sms_model extends CI_Model {
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}

	/*public function insertMessage($data)
 	{  
 		$this->db->insert('sms', $data);
 		return $this->db->insert_id();
 	}*/

	public function getSuperadminDetails()
 	{
 		$this->db->select('phone, email');
 		$this->db->from('users');
 		$this->db->where('user_id', '1');
 		$query = $this->db->get()->row();
 		return $query;
 	}

	function insertNumbers($data)
 	{  
 		return $this->db->insert_batch('sms_new', $data);
 	}

 	public function insertSingleNumber($data)
 	{  
 		return $this->db->insert('sms_new', $data);
 	}

 	public function getTotalPurchase($user_id)
 	{
 		$this->db->select('SUM(a.no_of_sms) as total_purchase, max(a.purchased_date) as last_date');
 		$this->db->from('top_up a');
 		$this->db->where('a.user_id', $user_id);
 		$query = $this->db->get()->result_array();
 		return $query;
 	}

 	public function getTotalSend($user_id)
 	{
 		$this->db->select('a.*, COUNT(a.number) as total_send');
 		$this->db->from('sms_new a');
 		$this->db->where('a.user_id', $user_id);
 		$this->db->where('a.status', '1');
 		$query = $this->db->get()->result_array();
 		return $query;
 	}

 	public function getSenderId($user_id)
 	{
 		$this->db->select('*');
 		$this->db->from('senderid');
 		$this->db->where('user_id', $user_id);
 		$query = $this->db->get()->result_array();
 		return $query;
 	}

 	public function getActiveSenderId($user_id)
 	{
 		$this->db->select('*');
 		$this->db->from('senderid');
 		$this->db->where('user_id', $user_id);
 		$this->db->where('status', 'Active');
 		$query = $this->db->get()->result_array();
 		return $query;
 	}

 	public function getInactiveSenderId()
 	{
 		$this->db->select('a.*, b.*');
 		$this->db->from('senderid a');
 		$this->db->join('users b','b.user_id = a.user_id', 'INNER');
 		$this->db->where('a.status', 'Inactive');
 		$query = $this->db->get()->result_array();
 		return $query;
 	}

 	public function addSenderId($data)
 	{  
 		return $this->db->insert('senderid', $data);
 	}

 	public function deleteSenderId($id)
 	{  
 		$this->db->where('id', $id);
 		return $this->db->delete('senderid');
 	}

 	public function activateSenderId($id, $data)
 	{  
 		$this->db->where('id', $id);
 		return $this->db->update('senderid', $data);
 	}
}

