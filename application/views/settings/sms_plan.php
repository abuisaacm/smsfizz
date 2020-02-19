				<div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>Settings</h3> </li>
                            <li class="breadcrumb-item active"><a href="">SMS Plan</a></li>
                        </ul>
                    </div>
                    <div class="form-style">
                        <div class="row">
                            <div class="col-md-12 col-lg-6">
                                <div class="prtm-block">
                                    <div class="prtm-block-title mrgn-b-lg">
                                        <h3 class="text-capitalize">Enter Details</h3> 
                                    </div>
                                    <div class="col-sm-offset-3 col-sm-10">
                                     	<p><?php echo $this->session->flashdata('msg'); ?></p>
                                	</div>
                                    <form class="form-elments1" action="<?php echo base_url(); ?>Settings/add_plan" method="post">
                                        <div class="form-group">
                                            <label for="Name">Plan Name</label>
                                            <input type="text" class="form-control" name="plan" id="Name" placeholder="Name" required> 
                                        </div>
                                        <div class="form-group">
                                            <label for="password">Number of SMS</label>
                                            <input type="number" class="form-control" name="pno" id="numb" placeholder="Number of SMS" required> 
                                        </div>
                                        <div class="form-group">
                                            <label for="msg">Plan Price</label>   
                                            <input type="number" class="form-control" name="price" id="price" placeholder="Price" required>
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
                    <div class="data-table-style">
                        <div class="row">
                            <div class="col-md-12 col-lg-8">
                                <div class="prtm-block pos-relative">
                                    <div class="prtm-block-content">
                                        <div class="dataTables_wrapper">
                                            <div class="table-responsive">
                                                <table class="table table-hover dataTable table-striped table-bordered" data-table="table-button" data-buttons="['copy', 'csv', 'excel', 'pdf', 'print']">
                                                    <thead>
                                                        <tr class="bg-primary">
                                                            <th>Sl. No.</th>
                                                            <th>SMS Name</th>
                                                            <th>SMS Plan</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <?php $i=1; foreach($plan as $row) { ?>
                                                        <tr>
                                                            <td><?php echo $i++; ?></td>
                                                            <td><?php echo $row['plan_name']; ?></td>
                                                            <td>Number of SMS: <?php echo $row['no_of_sms']; ?><br>Rate: Rs.<?php echo $row['plan_price']; ?></td>
                                                             <td><a onclick="return confirm('Are you sure you want to delete this item?');" href="<?php echo base_url('Settings/delete_smsplan/'.$row['id']); ?>"><i class="fa fa-trash fa-2x"></i> </a>
                                                            </td>
                                                        </tr>
                                                        <?php } ?>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>