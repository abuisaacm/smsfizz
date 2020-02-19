<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Auth extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->helper('security');
		$this->load->library('session');
		$this->load->model('Auth_model');
	}

	public function index(){
		if(isset($this->session->userid)){
			redirect('Auth/dashboard');
		}else{
			$this->login();
		}
		
	}

	public function login(){
		$this->load->view("auth/login");
	}

	public function login_process(){
		date_default_timezone_set("Asia/Kolkata");
		$username = $this->input->post('username'); 
        $password = $this->input->post('password'); 
		if($this->Auth_model->resolveUserLogin($username, $password)) { 
            $user_id = $this->Auth_model->getUserIdFromUsername($username);
            $user = $this->Auth_model->getUser($user_id);
			if(count($user) == 1){
				$newdata = array(
					'userid'  => $user[0]['user_id'],
					'username'  => $user[0]['email'],
					'name'     => $user[0]['name'],
					'logged_in' => TRUE
					);
				$this->session->set_userdata($newdata);
				$update = array(
                	'last_logged_in' =>date('Y-m-d H:i:s')
                	);
				$this->Auth_model->updateLoginTime($_SESSION['userid'], $update);
				redirect('Auth/dashboard');
			}else{
				$this->session->set_flashdata('login_error', "Please check your password!");
				redirect('Auth/login', 'refresh');
			}
		}else{
			$this->session->set_flashdata('login_error', "Please check your credentials!");
			redirect('Auth/login', 'refresh');
		}
	}

	public function dashboard()
	{
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('dashboard');
		$this->load->view('layout/footer');
	}

	public function change_password()
	{
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('auth/password');
		$this->load->view('layout/footer');
	}

	public function password()
	{
		$this->load->library('form_validation');
        $this->form_validation->set_error_delimiters('<div class="error">', '</div>');
        $this->form_validation->set_rules('password','New Password','required|trim');
        $this->form_validation->set_rules('pwd','Verify New Password','required|trim|matches[password]');
        if($this->form_validation->run() == FALSE)
        	{
	         	$this->load->view('layout/header');
				$this->load->view('layout/sidebar');
				$this->load->view('auth/password');
				$this->load->view('layout/footer');
	        }else{
	        	$id = $_SESSION['userid'];
	        	$new = $this->input->post('password');
	        	$new_pass = $this->Auth_model->hashPassword($new);
	        	$data = array(
                  			'password' => $new_pass
                 );
	        	$this->Auth_model->changePassword($id, $data);
	        	$this->session->set_flashdata('msg','<div class="alert alert-block alert-success text-center">Updated Successfully!!!</div>');
            	redirect('Auth/change_password');
	        }
	}

	public function profile()
	{
		$this->load->view('layout/header');
		$this->load->view('layout/sidebar');
		$this->load->view('Auth/profile_view');
		$this->load->view('layout/footer');
	}

	public function logout(){
		$this->session->sess_destroy();
		redirect('Auth/login');
	}

}