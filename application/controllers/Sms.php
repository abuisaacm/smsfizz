<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sms extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->library('Excel');
		$this->load->model('Sms_model');
		@date_default_timezone_set('Asia/Kolkata');
		if(!isset($this->session->userdata['userid'])){
			redirect('Auth/login');
		}
	}

	public function index()
	{
		$this->load->helper(array('form', 'url'));
	}

	public function bulk_sms()
	{
		if($_SESSION['name'] == 'Superadmin'){
			$user_id = '2';
		}else{
			$user_id = $_SESSION['userid'];
		}
		$data['senderid'] = $this->Sms_model->getActiveSenderId($user_id);
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('sms/sms_bulk', $data);
		$this->load->view('layout/footer');
	}

	public function insert_data()
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
		     						$mobile_number = $worksheet->getCellByColumnAndRow(0, $row)->getValue();
			 						if($mobile_number)
										{ 
		     								$data[] = array(
											      'sms_type' 	   => 'Bulk',
						   						  'message'  	   => $this->input->post('message'),
						   						  'scheduled_time' => date('Y-m-d H:i:s'),
						   						  'sms_route' 	   => 'TA',
						   						  'sender_id' 	   => $this->input->post('senderid'),
						   						  'user_id' 	   => $this->session->userid,
						   						  'created_at' 	   => date('Y-m-d H:i:s'),
											      'number'   	   => $mobile_number,
											      'status'    	   => 0,
											      'send_status'    => 0,
											      'processed_at'   => date('Y-m-d H:i:s')
											     );
										}
		   						}
						}
		   			$this->Sms_model->insertNumbers($data);
		   			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">SMS sending in progress..</div>');
		   			redirect('Sms/bulk_sms');
	  		}else{
	  			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Something went wrong..Please Try again..</div>');
	  			redirect('Sms/bulk_sms');
	  		}
	}

	public function single_sms()
	{
		if($_SESSION['name'] == 'Superadmin'){
			$user_id = '2';
		}else{
			$user_id = $_SESSION['userid'];
		}
		$data['senderid'] = $this->Sms_model->getActiveSenderId($user_id);
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('sms/single_sms', $data);
		$this->load->view('layout/footer');
	}

	public function send_sms_single()
	{
		$array = array(
	   			'sms_type' 		 => 'Single',
	   			'message'  	   	 => $this->input->post('msg'),
				'scheduled_time' => date('Y-m-d H:i:s'),
				'sms_route' 	 => 'TA',
				'sender_id' 	 => $this->input->post('senderid'),
				'user_id' 	     => $this->session->userid,
				'created_at' 	 => date('Y-m-d H:i:s'),
				'number'   	     => trim($this->input->post('input_string')),
				'status'    	 => 0,
				'send_status'    => 0,
				'processed_at'   => date('Y-m-d H:i:s')
	   		);
		$res = $this->Sms_model->insertSingleNumber($array);	
		if($res){
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">SMS sending in progress..</div>');
		    redirect('Sms/single_sms');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Could not send SMS..Please try again.</div>');
		  	redirect('Sms/single_sms');
		}   
	}

	/*public function sms_log_history()
	{
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('sms/sms_log');
		$this->load->view('layout/footer');
	}*/

	//SMS Settings
	public function sms_status()
	{
		if($_SESSION['name'] == 'Superadmin'){
			$user_id = '2';
		}else{
			$user_id = $_SESSION['userid'];
		}
		$data['total'] = $this->Sms_model->getTotalPurchase($user_id);
		$data['sms'] = $this->Sms_model->getTotalSend($user_id);
		$t = $data['total'][0]['total_purchase'];
		$s = $data['sms'][0]['total_send']; 
		$data['balance'] = $t - $s; //var_dump($data['balance']); die();
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('sms/sms_status', $data);
		$this->load->view('layout/footer');
	}

	public function sender_ids()
	{
		if($_SESSION['name'] == 'Superadmin'){
			$user_id = '2';
		}else{
			$user_id = $_SESSION['userid'];
		}
		$data['senderid'] = $this->Sms_model->getSenderId($user_id);
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('sms/sender_id', $data);
		$this->load->view('layout/footer');
	}

	public function add_new_senderid()
	{
		if($_SESSION['name'] == 'Superadmin'){
			$user_id = '2';
		}else{
			$user_id = $_SESSION['userid'];
		}
		$data = array(
			'sender_id' => strtoupper($this->input->post('id')),
			'status'	=> 'Inactive',
			'user_id'	=> $this->session->userid,
			'created_at'=> date('Y-m-d H:i:s')
			);
		$this->Sms_model->addSenderId($data);
		$details = $this->Sms_model->getSuperadminDetails(); 
		$request = array(
	   			'sms_type' 		 => 'Single',
	   			'message'  	   	 => 'Request for new Sender Id in SMSFIZZ',
				'scheduled_time' => date('Y-m-d H:i:s'),
				'sms_route' 	 => 'TA',
				'sender_id' 	 => 'ATCS18',
				'user_id' 	     => $this->session->userid,
				'created_at' 	 => date('Y-m-d H:i:s'),
				'number'   	     => $details->phone,
				'status'    	 => 0,
				'send_status'    => 0,
				'processed_at'   => date('Y-m-d H:i:s')
	   		);
		$this->Sms_model->insertSingleNumber($request);
		$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">Request Sent..</div>');
		redirect('Sms/sender_ids');
	}

	public function delete_senderid($id)
	{
		if($id){
			$this->Sms_model->deleteSenderId($id);
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">Deleted..</div>');
			redirect('Sms/sender_ids');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Please try again..</div>');
			redirect('Sms/sender_ids');
		}
	}

	

}