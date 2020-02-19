
                <div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>SMS</h3> </li>
                            <li class="breadcrumb-item active"><a href="">Bulk SMS</a></li>
                        </ul>
                    </div>
                    <div class="note note-info" id="title_head"> 
                         <h5>Instructions For Excel File Upload </h5>
                         <ul class="email-tabs nav nav-tabs tabs-left">
                                <li><i class="fa fa-cog"></i>&nbsp;&nbsp; Upload Excel Sheet File Only</li>
                                <li><i class="fa fa-cog"></i>&nbsp;&nbsp; Please make sure the numbers column should be in the first column without any title field </li>
                                <li><i class="fa fa-cog"></i>&nbsp;&nbsp; There should be no empty rows in the number column</li>
                                <li><i class="fa fa-cog"></i>&nbsp;&nbsp; Example of an excel sheet format is shown below:</li>
                        </ul>
                    </div>
                    <div class="data-table-style">
                        <div class="prtm-block pos-relative">
                            <div class="prtm-block-title mrgn-b-lg">
                                <div class="caption">
                                    <h3 class="text-capitalize">Enter Details</h3> 
                                </div>
                                <div class="col-sm-offset-3 col-sm-6">
                                     <p><?php echo $this->session->flashdata('msg'); ?></p>
                                </div>
                            </div>
                            <?php $attributes = array("class" => "add",); echo form_open_multipart("Sms/insert_data", $attributes); ?>
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
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <label><span class="text-danger"></span>Message</label>
                                            <textarea class="form-control" rows="5" name="message" required="required"></textarea>
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