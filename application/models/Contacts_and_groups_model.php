<?php 
defined('BASEPATH') or exit('No direct script access allowed');
class Contacts_and_groups_model extends CI_Model {
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}

	public function insert($data)
 	{  
 		return $this->db->insert_batch('contacts_and_groups', $data);
 	}

  public function get_count($grp_id)
  {
        $this->db->from('contacts_and_groups');
       $this->db->where('group_id', $grp_id);
      $query=$this->db->get();
   return $query->num_rows();
  }
  public function get_all_contacts($grp_id)
  {
    $this->db->select ( 'g.*,c.*,g.name as group_name,g.id as grp_id,cg.id as cg_id' );
     $this->db->from ( 'Groups as g' );
       $this->db->join ( 'contacts_and_groups cg', 'cg.group_id = g.id');
        $this->db->join ( 'contacts c', 'c.id = cg.contact_id');
    $query = $this->db->get();
    return $query->result();
  }

  public function delete_from_group($row_id)
  {
        $this->db->where('id', $row_id);
    return  $this->db->delete('contacts_and_groups');
  }


 	}