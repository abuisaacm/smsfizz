<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Groups extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->library('Excel');
		$this->load->model('Contacts_model');
		$this->load->model('Groups_model');
	    $this->load->model('Contacts_and_groups_model');

				
		@date_default_timezone_set('Asia/Kolkata');
		if(!isset($this->session->userdata['userid'])){
			redirect('Auth/login');
		}
	}

	public function index()
	{
		$this->load->helper(array('form', 'url'));
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('groups/new_group');
		$this->load->view('layout/footer');
	}

	public function create()
	{
$array = array(
	   			'user_id'=>$this->session->userdata['userid'],
	   			'name' => $this->input->post('name'),
	   			'description' => $this->input->post('description'),	

				
	   		);
		$res = $this->Groups_model->insert_new_group($array);

			if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">New Group Added Successfully..</div>');
		    redirect('Groups/');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not add new group..Please try again.</div>');
		  	redirect('Groups/');
		} 
	}

	public function view($grp_id=null)
	{
		if($grp_id==null)
		{
		$uid=$this->session->userdata['userid'];

		 $data['groups']=$this->Groups_model->get_all_groups($uid);  
      if($data['groups'] != NULL){

      	$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('Groups/all_group',$data);
		$this->load->view('layout/footer');
     						}
      else{
      $this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not find any group..Please try again.</div>');
		  	redirect('Groups/');}
		  }else
		  {
$data['group'] = $this->Groups_model->get_group($grp_id);
$uid=$this->session->userdata['userid'];
         $data['group_id']=$grp_id;
$data['contacts_count']=$this->Contacts_and_groups_model->get_count($grp_id);

		 $data['contacts']=$this->Contacts_model->get_all_users($uid);  
  	 if($data['group'] != NULL){


      	$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('groups/add_group_contacts',$data);
		$this->load->view('layout/footer');
     						}
      else{
      $this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not find any group..Please try again.</div>');
		  	redirect('Groups/all');}

		  }

	}

	public function edit($grp_id)
	{
	$data['group'] = $this->Groups_model->get_group($grp_id);
  	 if($data['group'] != NULL){

      	$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('groups/update_group',$data);
		$this->load->view('layout/footer');
     						}
      else{
      $this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not find any group..Please try again.</div>');
		  	redirect('Groups/all');}

	}
	public function update()
	{
		

        $data = array(
        	 'id' =>$this->input->post('id'),
	   			'user_id'=>$this->session->userdata['userid'],
	   			'name' => $this->input->post('name'),
	   			'description' => $this->input->post('description'),				
	   		);
        $rid=$this->input->post('id');        
        $res=$this->Groups_model->update_group($rid,$data);

        		if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center"> Group Updated Successfully..</div>');
		    redirect('Groups/view');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not update group..Please try again.</div>');
		  	redirect('Groups/view');
		}
	}

	public function delete($grp_id)
	{

  	$res= $this->Groups_model->delete_group($grp_id);
  		if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center"> group deleted Successfully..</div>');
		    redirect('Groups/view');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not delete  group..Please try again.</div>');
		  	redirect('Groups/view');
		}
	}

	public function add_contacts()
	{
             $cid=$this->input->post('contact_id'); 
             $gid=$this->input->post('id'); 
             

             foreach ($cid as $key => $value) {
             	$data[]=array('contact_id'=>$value,
             		'group_id'=>$gid,
             	);
             }

             	$res=$this->Contacts_and_groups_model->insert($data);
             	 		if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center"> Contact added Successfully..</div>');
		    redirect('Groups/view/'.$gid.'');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not update group..Please try again.</div>');
		  	redirect('Groups/view'.$gid.'');
		}

	}
	public function all($grp_id)
	{
$data['contacts']=$this->Contacts_and_groups_model->get_all_contacts($grp_id);
$res = $this->Groups_model->get_group($grp_id);
$data['group_name']=$res->name; 
		 if($data['contacts'] != NULL){

      	$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('groups/all_contacts',$data);
		$this->load->view('layout/footer');
     						}
      else{
      $this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not find any contacts..Please try again.</div>');
		  	redirect('Groups/view'.$grp_id.'');}
	}

	public function delete_from_group($row_id,$grp_id)
	{
	$res= $this->Contacts_and_groups_model->delete_from_group($row_id);
  		if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center"> contact within group deleted Successfully..</div>');
		   redirect('groups/all/'.$grp_id);
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not delete contact..Please try again.</div>');
		  	redirect('groups/all/'.$grp_id);
		}

	}



}