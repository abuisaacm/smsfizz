<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Contacts extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->library('Excel');
		$this->load->model('Contacts_model');
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
		$this->load->view('contacts/new_contact');
		$this->load->view('layout/footer');
	}

	public function create()
	{
$array = array(
	   			'u_id'=>$this->session->userdata['userid'],
	   			'name' => $this->input->post('name'),
	   			'phone' => $this->input->post('phone'),
	   			'email' => $this->input->post('email'),
	   			'additional_info' => $this->input->post('additional_info')

				
	   		);
		$res = $this->Contacts_model->insert_new_contact($array);

			if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">New Contact Added Successfully..</div>');
		    redirect('Contacts/');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not add new contact..Please try again.</div>');
		  	redirect('Contacts/');
		} 
	}

	public function view()
	{
		$uid=$this->session->userdata['userid'];

		 $data['users']=$this->Contacts_model->get_all_users($uid);  
      if($data['users'] != NULL){

      	$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('contacts/all_contact',$data);
		$this->load->view('layout/footer');
     						}
      else{
      $this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not find any contact..Please try again.</div>');
		  	redirect('Contacts/');}

	}
	public function edit($con_id)
	{
	$data['contact'] = $this->Contacts_model->get_contact($con_id);
  	 if($data['contact'] != NULL){

      	$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('contacts/update_contact',$data);
		$this->load->view('layout/footer');
     						}
      else{
      $this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not find any contact..Please try again.</div>');
		  	redirect('Contacts/all');}
	}

	public function update()
	{
		$data = array(
          'id' =>$this->input->post('id'),
          'u_id'=>$this->session->userdata['userid'],
	   			'name' => $this->input->post('name'),
	   			'phone' => $this->input->post('phone'),
	   			'email' => $this->input->post('email'),
	   			'additional_info' => $this->input->post('additional_info')
        );
        $rid=$this->input->post('id');        
        $res=$this->Contacts_model->update_contact($rid, $data);

        		if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center"> Contact Updated Successfully..</div>');
		    redirect('Contacts/view');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not update  contact..Please try again.</div>');
		  	redirect('Contacts/view');
		}
	}

	public function delete($con_id)
	{

  	$res= $this->Contacts_model->delete_contact($con_id);
  		if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center"> Contact deleted Successfully..</div>');
		    redirect('Contacts/view');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not delete  contact..Please try again.</div>');
		  	redirect('Contacts/view');
		}
	}

	public function bulk_insert()
	{
		date_default_timezone_set('Asia/Kolkata'); 
		if(isset($_FILES["file"]["name"]))
	   		{
	   			$path = $_FILES["file"]["tmp_name"];
		  		$object = PHPExcel_IOFactory::load($path);
		  			foreach($object->getWorksheetIterator() as $worksheet)
		    			{
			    			$highestRow = $worksheet->getHighestRow();
		     				$highestColumn = $worksheet->getHighestColumn();
							for($row=1; $row<=$highestRow; $row++)
		     					{
		     						$name = $worksheet->getCellByColumnAndRow(0, $row)->getValue();
		     						$phone = $worksheet->getCellByColumnAndRow(1, $row)->getValue();
		     						$email = $worksheet->getCellByColumnAndRow(2, $row)->getValue();
		     						$additional_info = $worksheet->getCellByColumnAndRow(3, $row)->getValue();
			 						if($phone)
										{ 
		     $data[] = array(
							'u_id'=>$this->session->userdata['userid'],
	   			'name' => $name,
	   			'phone' => $phone,
	   			'email' => $email,
	   			'additional_info' => $additional_info,
											     );
										}
		   						}
						}
		   		$res=$this->Contacts_model->bulk_insert($data);

		   			if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center"> Contact added Successfully..</div>');
		    redirect('Contacts/view');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not add  contact..Please try again.</div>');
		  	redirect('Contacts/view');
		}
	}
	
}
}