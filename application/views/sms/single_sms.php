
                <div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>SMS</h3> </li>
                            <li class="breadcrumb-item active"><a href="">SMS - Single</a></li>
                        </ul>
                    </div>
                    <div class="data-table-style">
                        <div class="prtm-block pos-relative">
                            <div class="prtm-block-title mrgn-b-lg">
                                <div class="caption">
                                    <h3 class="text-capitalize">Enter Details</h3> 
                                </div>
                                <div class="row">
                                    <div class="col-sm-offset-3 col-sm-6" id="msg">
                                        <p><?php echo $this->session->flashdata('msg'); ?></p>
                                    </div>
                                </div>
                            </div>
                            <form class="form-elments1" action="<?php echo base_url('Sms/send_sms_single'); ?>" method="POST">
                            <div class="prtm-block-content">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label for="password">Select Sender Id</label>
                                            <div class="select-box">
                                                <div class="selectbox-wrap mrgn-b-xs">
                                                    <div class="selectbox">
                                                        <select class="form-control" name="senderid" id="">
                                                            <?php foreach($senderid as $rows){ ?>
                                                            <option value="<?php echo $rows['sender_id']; ?>"><?php echo $rows['sender_id']; ?> </option>
                                                            <?php } ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-danger">*</span>Enter Mobile Number</label>
                                                <div class="form-group">
                                                    <input type="number" minlength="10" maxlength="10" class="form-control" name="input_string" placeholder="Enter Mobile Number..." required>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-danger"></span>Message</label>
                                            <textarea class="form-control" name="msg" rows="5" required="required"></textarea>
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
