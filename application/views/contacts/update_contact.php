
                <div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>Update Contact</h3> </li>
                            <li class="breadcrumb-item active"><a href=""></a></li>
                        </ul>
                    </div>
                    <div class="data-table-style">
                        <div class="prtm-block pos-relative">
                            <div class="prtm-block-title mrgn-b-lg">
                                <div class="caption">
                                    <h3 class="text-capitalize">Enter Details</h3> 
                                </div>
                                <div class="row">
                                    <div class=" col-sm-6" id="msg">
                                        <p><?php echo $this->session->flashdata('msg'); ?></p>
                                    </div>
                                </div>
                            </div>
                            <form class="form-elments1" action="<?php echo base_url('Contacts/update'); ?>" method="POST">
                            <div class="prtm-block-content">
                              <input type="hidden" name="id" id="id" value="<?php echo $contact->id;?>">
                                  <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-success"></span>Name</label>
                                                <div class="form-group">
                                                 <input type="text" class="form-control" name="name" value="<?php echo $contact->name;?>" >
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-danger">*</span>Phone</label>
                                                <div class="form-group">
                                                    <input type="number"  class="form-control" name="phone" value="<?php echo $contact->phone;?>" required>
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-success"></span>Email</label>
                                                <div class="form-group">
                                                    <input type="Email" class="form-control" name="email"  value="<?php echo $contact->email;?>" >
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-danger"></span>Additional Info</label>
                                            <textarea class="form-control" name="additional_info" rows="5" >  <?php echo $contact->additional_info;?></textarea>
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
