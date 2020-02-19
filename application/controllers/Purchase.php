<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->library('Excel');
		$this->load->model('Purchase_model');
		$this->load->model('Auth_model');
		$this->load->model('Settings_model');
		if(!isset($this->session->userdata['userid'])){
			redirect('Auth/login');
		}
	}

	public function purchase()
	{
		$data['users'] = $this->Auth_model->getUsers();
		$data['plan'] = $this->Settings_model->getPlans();
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('purchase/new', $data);
		$this->load->view('layout/footer');
	}

	public function add_purchase()
	{
		$data = array(
			'user_id' 		   => $this->input->post('user'),
			'sms_plan_id'      => $this->input->post('plan'),
			'date_of_purchase' => $this->input->post('purchase_date')
		);
		$res = $this->Purchase_model->addNew($data);
		if($res == TRUE){
			$topup = array(
				'user_id'      => $this->input->post('user'),
				'no_of_sms'    => $this->input->post('sms'),
				'purchased_date' => $this->input->post('purchase_date')
			);
			$this->Purchase_model->addTopUp($topup);
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">Saved..</div>');
		  	redirect('Purchase/purchase');
		}else{
			$this->session->set_flashdata('msg','<div class="alert alert-block alert-danger text-center">Please try Again..</div>');
		  	redirect('Purchase/purchase');
		}
	}

}