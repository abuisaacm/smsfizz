
                <div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>Change Password</h3> </li>
                        </ul>
                    </div>
                    <div class="data-table-style">
                        <div class="prtm-block pos-relative">
                            <div class="prtm-block-title mrgn-b-lg">
                                <div class="caption">
                                    <h3 class="text-capitalize">Enter New Password</h3> 
                                 </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-offset-3 col-sm-6">
                                    <p><?php echo $this->session->flashdata('msg'); ?></p>
                                 </div>
                            </div>
                            <div class="prtm-block-content">
                                <div class="prtm-full-block text-center">
                                    <div class="pad-all-md">
                                        <form class="form-elments1" action="<?php echo base_url('Auth/password'); ?>" method="POST">
                                            <div class="prtm-block-content">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                                            <label>New Password<span class="text-danger">*</span></label>
                                                               <div class="form-group">
                                                                 <input type="password" class="form-control" name="password" required> 
                                                                 <span class="text-danger"><?php echo form_error('password'); ?></span>   
                                                                </div>  
                                                        </div>
                                                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                                            <label>Retype New Password<span class="text-danger">*</span></label>
                                                                <div class="form-group">
                                                                    <input type="password" class="form-control" name="pwd" required> 
                                                                    <span class="text-danger"><?php echo form_error('pwd'); ?></span> 
                                                                </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 select-submit" id="select-submit">
                                                            <input type="submit" class="btn btn-primary" value="Submit">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>