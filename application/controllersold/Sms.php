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
		if(!isset($this->session->userdata['userid'])){
			redirect('Auth/login');
		}
	}

	public function index()
	{
		$this->load->helper(array('form', 'url'));
	}

        public function phpinfo()
        {
        var_dump(extension_loaded ('zip'));
               echo phpinfo();
        }

	public function bulk_sms()
	{
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('sms/sms_bulk');
		$this->load->view('layout/footer');
	}

	public function insert_data()
 	{ 
		if(isset($_FILES["file"]["name"]))
	   		{
	   			$array = array(
	   						'sms_type' 		 => 'Bulk',
	   						'message'  		 => $this->input->post('message'),
	   						'scheduled_time' => date('Y-m-d H:i:s'),
	   						'sms_route' 	 => 'TA',
	   						'sender_id' 	 => 'FATIMA',
	   						'user_id' 		 => $this->session->userid,
	   						'created_at' 	 => date('Y-m-d H:i:s')
	   					);
	   			$id = $this->Sms_model->insertMessage($array);
	   			if($id >= 1)
	   			{
		    		$path = $_FILES["file"]["tmp_name"];
					//PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);
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
											      'sms_id'  	 => $id,
											      'number'   	 => $mobile_number,
											      'status'    	 => 0,
											      'send_status'  => 0,
											      'processed_at' => date('Y-m-d H:i:s')
											     );
										}
		   						}
						}//var_dump($data);die();
		   			$this->Sms_model->insertNumbers($data);
		   			redirect('Sms/bulk_sms');
	   			}
	  		}else{
	  			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Something went wrong..Please Try again..</div>');
	  			redirect('Sms/bulk_sms');
	  		}
	}

	

}