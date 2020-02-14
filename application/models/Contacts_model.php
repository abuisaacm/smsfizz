<?php 
defined('BASEPATH') or exit('No direct script access allowed');
class Contacts_model extends CI_Model {
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}

	public function insert_new_contact($data)
 	{  
 		return $this->db->insert('contacts', $data);
 	}


 	public function get_all_users($user_id){
 		$this->db->from('contacts');
       $this->db->where('u_id', $user_id);
      $query=$this->db->get();  
       return $query->result_array(); 
   }

   public function get_contact($con_id){
   	$this->db->from('contacts');
       $this->db->where('id', $con_id);
       return $this->db->get()->row();

   }
      public function update_contact($r_id, $data){      
     $this->db->where('id', $r_id);
       return $this->db->update('contacts', $data);
          }
   public function delete_contact($con_id){
   	$this->db->where('id', $con_id);
    return	$this->db->delete('contacts');
    }


  public function bulk_insert($data)
  {  
    return $this->db->insert_batch('contacts', $data);
  }

}