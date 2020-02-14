                <div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>SMS Settings</h3> </li>
                            <li class="breadcrumb-item"><a href="javascript:;">SMS Status</a></li>
                        </ul>
                        <?php echo $this->session->flashdata('msg'); ?>
                    </div>
                    <div class="prtm-users-listing clearfix">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                                <div class="prtm-block fw-light">
                                    <div class="clearfix">
                                        <div class="thumb-wid pull-left mrgn-r-md"> </div>
                                        <div class="thumb-content pull-left">
                                            <h3 class="fw-bold base-dark">Total SMS Purchased <span class="label label-xs label-primary"></span></h3>
                                            <p><b>Last Purchase Date: <span>&nbsp;<?php if(isset($total)){ foreach($total as $row) {} echo $row['last_date']; } else { echo "00/00/0000"; } ?></span></b></p>
                                        </div>
                                        <div class="thumb-wid pull-right">
                                            <h1 class="fw-bold base-dark"> <?php if(isset($total)){ echo $row['total_purchase']; } else { echo "0"; } ?> </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                                <div class="prtm-block fw-light">
                                    <div class="clearfix">
                                        <div class="thumb-wid pull-left mrgn-r-md"> </div>
                                        <div class="thumb-content pull-left">
                                            <h3 class="fw-bold base-dark">Total SMS Send<span class="label label-xs label-primary"></span></h3>
                                            <br>&nbsp;
                                        </div>
                                        <div class="thumb-wid pull-right">
                                            <h1 class="fw-bold base-dark"> <?php if(isset($sms)){ foreach($sms as $row) {} echo $row['total_send']; } else { echo "0"; } ?> </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                                <div class="prtm-block fw-light">
                                    <div class="clearfix">
                                        <div class="thumb-wid pull-left mrgn-r-md"> </div>
                                        <div class="thumb-content pull-left">
                                            <h3 class="fw-bold base-dark">Available Balance SMS<span class="label label-xs label-primary"></span></h3>
                                            <br>&nbsp;
                                        </div>
                                        <div class="thumb-wid pull-right">
                                            <h1 class="fw-bold base-dark"> <?php if(isset($balance)){ echo $balance; } else { echo "0"; } ?> </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>