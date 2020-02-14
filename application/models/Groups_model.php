<?php 
defined('BASEPATH') or exit('No direct script access allowed');
class Groups_model extends CI_Model {
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}

	public function insert_new_group($data)
 	{  
 		return $this->db->insert('groups', $data);
 	}


 	public function get_all_groups($user_id){
 		$this->db->from('groups');
       $this->db->where('user_id', $user_id);
      $query=$this->db->get();  
       return $query->result_array(); 
   }

   public function get_group($con_id){
   	$this->db->from('groups');
       $this->db->where('id', $con_id);
       return $this->db->get()->row();

   }
      public function update_group($r_id, $data){      
     $this->db->where('id', $r_id);
       return $this->db->update('groups', $data);
          }
   public function delete_group($con_id){
   	$this->db->where('id', $con_id);
    return	$this->db->delete('groups');
    }


  public function bulk_insert($data)
  {  
    return $this->db->insert_batch('groups', $data);
  }

}