
                <div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>Update Group</h3> </li>
                            <li class="breadcrumb-item active"><a href=""></a></li>
                        </ul>
                    </div>
                    <div class="data-table-style">
                        <div class="prtm-block pos-relative">
                            <div class="prtm-block-title mrgn-b-lg">
                                <div class="caption">
                                    <h3 class="text-capitalize">Update Details</h3> 
                                </div>
                                <div class="row">
                                    <div class=" col-sm-6" id="msg">
                                        <p><?php echo $this->session->flashdata('msg'); ?></p>
                                    </div>
                                </div>
                            </div>
                            <form class="form-elments1" action="<?php echo base_url('Groups/update'); ?>" method="POST">
                            <div class="prtm-block-content">
                             <input type="hidden" name="id" id="id" value="<?php echo $group->id;?>">
                                  <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-success"></span>Name</label>
                                                <div class="form-group">
                                                 <input type="text" class="form-control" name="name" value="<?php echo $group->name;?>" >
                                                </div>
                                        </div>
                                    </div>
                                </div>
                               
                    <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-danger"></span>Additional Info</label>
                    <textarea class="form-control" name="description" rows="5" ><?php echo $group->description;?></textarea>
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
