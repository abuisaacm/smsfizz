<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->library('Excel');
		$this->load->model('Settings_model');
		$this->load->model('Sms_model');
		if(!isset($this->session->userdata['userid'])){
			redirect('Auth/login');
		}
	}

	public function sms_plan()
	{
		$data['plan'] = $this->Settings_model->getPlans();
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('settings/sms_plan', $data);
		$this->load->view('layout/footer');
	}

	public function add_plan()
	{
		$data = array(
			'plan_name' => $this->input->post('plan'),
			'no_of_sms' => $this->input->post('pno'),
			'plan_price' => $this->input->post('price')
		);
		$this->Settings_model->addSMSPlan($data);
		$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">Saved..</div>');
	  	redirect('Settings/sms_plan');
	}

	public function delete_smsplan($id)
	{
		if($id){
			$this->Settings_model->deleteSmsPlan($id);
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">Deleted..</div>');
			redirect('Settings/sms_plan');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Please try again..</div>');
			redirect('Settings/sms_plan');
		}
	}

	public function sender_id()
	{
		$data['senderid'] = $this->Sms_model->getInactiveSenderId();
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('settings/sender_id', $data);
		$this->load->view('layout/footer');
	}

	public function activate_senderid($id)
	{
		if($id){
		$data = array(
			'status' => 'Active'
		);
		$this->Sms_model->activateSenderId($id, $data);
		$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">Activated..</div>');
	  	redirect('Settings/sender_id');
	  }else{
	  	$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Please try again..</div>');
		redirect('Settings/sender_id');
	  }
	}



}