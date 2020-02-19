
                <div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                         <li class="breadcrumb-item text-capitalize">
                                <h3>Add contacts into Group</h3>  </li>
                            <li class="breadcrumb-item active"><a href=""></a>
                            </li>
                        </ul>
                        [ Group Name - <?php echo $group->name;?> ,  Total Members - 

                        <?php if(isset($contacts_count)&& $contacts_count)echo $contacts_count;  ?>]
                         <a href=" <?php echo site_url('groups/all/');?><?php echo $group_id;?>"><button class="btn-primary">View all Members</button></a>
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
                                    <h3 class="text-capitalize">Add from Existing contacts</h3> 
                                </div>
                                <div class="row">
                                    <div class=" col-sm-6" id="msg">
                                        <p><?php echo $this->session->flashdata('msg'); ?></p>
                                    </div>
                                     <input type="hidden" name="group_id" id="id" value="<?php echo $group_id;?>">
                                </div>
                            </div>
                            <form class="form-elments1" action="<?php echo base_url('Groups/add_contacts'); ?>" method="POST">
                            <div class="prtm-block-content">
                             <input type="hidden" name="id" id="id" value="<?php echo $group->id;?>">
                                  <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-success"></span>Select</label>
                                            <div style="width:250px;height:350px;line-height:3em;overflow:auto;padding:5px;">

                                                <div class="form-group">

        
            <?php foreach($contacts as $contact){ ?>
         <label><input type="checkbox"name="contact_id[]" value="<?php echo $contact['id']; ?>"><span class="text-success"> <?php echo $contact['name']; ?> </span></label><br>
         <?php } ?>

    </div>                                                                       </div>
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
            </div>

</form>

