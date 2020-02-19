				<div class="prtm-content">
                    <div class="prtm-page-bar">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item text-capitalize">
                                <h3>Settings</h3> </li>
                            <li class="breadcrumb-item active"><a href="">Sender Ids</a></li>
                        </ul>
                        <div class="col-sm-offset-2 col-md-6 col-lg-4 col-sm-10">
                            <p><?php echo $this->session->flashdata('msg'); ?></p>
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
                                                            <th>Sender Id</th>
                                                            <th>User</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <?php $i=1; foreach($senderid as $row) { ?>
                                                        <tr>
                                                            <td><?php echo $i++; ?></td>
                                                            <td><?php echo $row['sender_id']; ?></td>
                                                            <td><?php echo $row['name']; ?></td>
                                                             <td><a class="btn btn-info"  href="<?php echo base_url('Settings/activate_senderid/'.$row['id']); ?>">Activate </a>
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