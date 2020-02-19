
                 




                <div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>New Contact</h3> </li>
                            <li class="breadcrumb-item active"><a href=""></a></li>
                        </ul>
                    </div>
 <div class="row mrgn-all-none">
  <div class="col-md-6">

 <div class="data-table-style">
                        <div class="prtm-block pos-relative">
                            <div class="prtm-block-title mrgn-b-lg">
                                <div class="caption">
                                    <h3 class="text-capitalize">Bulk Insert From Excel Sheet</h3> 
                                </div>
                                <div class="row">
                                    <div class=" col-sm-6" id="msg">
                                        <p><?php echo $this->session->flashdata('msg'); ?></p>
                                    </div>
                                </div>
                            </div>

                               <div class="note note-info" id="title_head"> 
                         <h5>Instructions For Excel File Upload </h5>
                         <ul class="email-tabs nav nav-tabs tabs-left">
                                <li><i class="fa fa-cog"></i>&nbsp;&nbsp; Upload Excel Sheet File Only</li>
                                <li><i class="fa fa-cog"></i>&nbsp;&nbsp; Please make sure the numbers column should be in the first column without any title field </li>
                                <li><i class="fa fa-cog"></i>&nbsp;&nbsp; There should be no empty rows in the number column</li>
                                <li><i class="fa fa-cog"></i>&nbsp;&nbsp; Example of an excel sheet format is shown below:</li>

                              <p>Click on the image to enlarge it.</p>

                                <li>
<a target="_blank" href="<?php echo base_url(); ?>assets/img/sample.png">
  <img src="<?php echo base_url(); ?>assets/img/sample.png"  alt="Forest" style="width:150px">
</a>  </li>
                        </ul>
                    </div>


 <?php $attributes = array("class" => "add",); echo form_open_multipart("Contacts/bulk_insert", $attributes); ?>
                            <div class="prtm-block-content">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <div class="form-group">
                                                <label for="inputimg2" class="control-label">Select Excel File:</label><br>
                                                   <div class="fileinput fileinput-new" data-provides="fileinput">
                                                        <span class="btn btn-danger btn-file">
                                                            <span class="fileinput-new">Select file</span>
                                                                <span class="fileinput-exists">Change</span>
                                                                    <input type="file" name="file" accept=".xls, .xlsx" required="required">
                                                                </span>
                                                            <span class="fileinput-filename"></span>
                                                        <a href="#" class="close fileinput-exists" data-dismiss="fileinput">&times;</a>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                <div class="row mrgn-all-none">
                                    <div class="col-sm-offset-2 col-sm-6">
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                            </form>
 </div>
 </div>
   </div>
                            </div>
 <div class="col-md-6">


                    <div class="data-table-style">
                        <div class="prtm-block pos-relative">
                            <div class="prtm-block-title mrgn-b-lg">
                                <div class="caption">
                                    <h3 class="text-capitalize">Add new contact</h3> 
                                </div>
                                <div class="row">
                                    <div class=" col-sm-6" id="msg">
                                        <p><?php echo $this->session->flashdata('msg'); ?></p>
                                    </div>
                                </div>
                            </div>
                            <form class="form-elments1" action="<?php echo base_url('Contacts/create'); ?>" method="POST">
                            <div class="prtm-block-content">
                                  <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-success"></span>Name</label>
                                                <div class="form-group">
                                                 <input type="text" class="form-control" name="name" placeholder="Enter Name..." required>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-danger">*</span>Phone</label>
                                                <div class="form-group">
                                                    <input type="number"  class="form-control" name="phone" placeholder="Enter Mobile Number..." required>
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-success"></span>Email</label>
                                                <div class="form-group">
                                                    <input type="Email" class="form-control" name="email" placeholder="Enter email..." required>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-danger"></span>Additional Info</label>
                                            <textarea class="form-control" name="additional_info" rows="5" required="required"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row mrgn-all-none">
                                    <div class="col-sm-offset-2 col-sm-6">
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
<style>
img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
}

img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>