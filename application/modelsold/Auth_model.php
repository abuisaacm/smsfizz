<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Community Auth - Auth_model Model
 *
 * Community Auth is an open source authentication application for CodeIgniter 3
 *
 * @package     Community Auth
 * @author      Robert B Gottier
 * @copyright   Copyright (c) 2011 - 2018, Robert B Gottier. (http://brianswebdesign.com/)
 * @license     BSD - http://www.opensource.org/licenses/BSD-3-Clause
 * @link        http://community-auth.com
 */

class Auth_model extends CI_Model {

	public function hashPassword($password)
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public function resolveUserLogin($username, $password)
    {       
        $this->db->select('password');  
        $this->db->from('users');
        $this->db->where('email', $username);
        $this->db->where('status', 'active');
        $hash = $this->db->get()->row('password'); 
        return $this->verifyPasswordHash($password, $hash);
    }

    private function verifyPasswordHash($password, $hash)
    {
        return password_verify($password, $hash);  
    }

    public function getUserIdFromUsername($username)
    {
        $this->db->select('user_id');
        $this->db->from('users');
        $this->db->where('email', $username);
        return $this->db->get()->row('user_id');
    }

	public function getUser($user_id)
    {
        $this->db->from('users');
        $this->db->where('user_id', $user_id);
        return $this->db->get()->result_array();       
    }

    public function updateLoginTime($id, $data){
        $this->db->where('user_id', $id);
       return $this->db->update('users', $data); 
    }

    public function changePassword($id, $data){
        $this->db->where('user_id', $id);
       return $this->db->update('users', $data); 
    }

}