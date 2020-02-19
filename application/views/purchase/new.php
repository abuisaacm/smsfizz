				<div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>Purchase</h3> </li>
                            <li class="breadcrumb-item active"><a href="">New</a></li>
                        </ul>
                    </div>
                    <div class="form-style">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-lg-offset-3">
                                <div class="prtm-block">
                                    <div class="prtm-block-title mrgn-b-lg">
                                        <h3 class="text-capitalize">Enter Details</h3> 
                                    </div>
                                    <div class="col-sm-offset-3 col-sm-10">
                                     	<p><?php echo $this->session->flashdata('msg'); ?></p>
                                	</div>
                                    <form class="form-elments1" action="<?php echo base_url(); ?>Purchase/add_purchase" method="post">
                                        <div class="form-group">
                                            <label for="Name">Select User</label>
                                            <div class="select-box">
                                                <div class="selectbox-wrap mrgn-b-xs">
                                                    <div class="selectbox">
                                                        <select class="form-control" name="user" id="">
                                                            <?php foreach($users as $row){ ?>
                                                            <option value="<?php echo $row['user_id']; ?>"><?php echo $row['name']; ?> (<?php echo $row['email']; ?>)</option>
                                                            <?php } ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="password">Select Plan</label>
                                            <div class="select-box">
                                                <div class="selectbox-wrap mrgn-b-xs">
                                                    <div class="selectbox">
                                                        <select class="form-control" name="plan" id="">
                                                            <?php foreach($plan as $rows){ ?>
                                                            <option value="<?php echo $rows['id']; ?>"><?php echo $rows['plan_name']; ?> (Rs. <?php echo $rows['plan_price']; ?>)</option>
                                                            
                                                            <input type="hidden" name="sms" value="<?php echo $rows['no_of_sms']; ?>">
                                                            <?php } ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="msg">Date</label>   
                                                <div class="form-input">
                                                    <div class="form-group has-feedback">
                                                        <input type="text" class="form-control datepicker mrgn-b-xs" name="purchase_date" value="<?php echo date('d-m-Y'); ?> ">
                                                        <span class="glyphicon glyphicon-calendar form-control-feedback fa-lg base-dark" aria-hidden="true"></span>
                                                    </div>
                                                </div>
                                        </div>
                                        <div class="form-group">
                                        	<div class="row mrgn-all-none">
                                                <div class="col-sm-offset-4 col-sm-10">
		                                            <input class="btn btn-primary" value="Submit" name="submit" type="submit"> 
		                                        </div>
	                                        </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>