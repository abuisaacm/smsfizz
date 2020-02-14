 <div class="prtm-sidebar">
                <div class="prtm-sidebar-back"> </div>
                <div class="prtm-sidebar-nav-wrapper">
                    <div class="prtm-sidebar-menu">
                        <nav class="sidebar-nav collapse">
                            <ul class="list-unstyled sidebar-menu">
                                <li class=""><a href="<?php echo base_url('Auth/index'); ?>"><i class="fa fa-tachometer" aria-hidden="true"></i><span>Dashboard</span></a>
                                </li>
                                <li class="sidenav-heading text-uppercase">Menus</li>
                                 <li class="has-children"><a href="javascript:;"><i class="fa fa-mobile" aria-hidden="true"></i><span>Contacts</span></a>
                                    <ul class="list-unstyled sub-menu collapse">
                                        <li><a href="<?php echo base_url('contacts/'); ?>"><span>New Contact</span></a></li>
                                         <li><a href="<?php echo base_url('contacts/view'); ?>"><span>All Contacts</span></a></li>
                                          <li><a href="<?php echo base_url('groups/'); ?>"><span>New Group</span></a></li>
                                           <li><a href="<?php echo base_url('groups/view'); ?>"><span>All Groups</span></a></li>
                                       
                                    </ul>
                                </li>
                                <li class="has-children"><a href="javascript:;"><i class="fa fa-mobile" aria-hidden="true"></i><span>Send SMS</span></a>
                                    <ul class="list-unstyled sub-menu collapse">
                                        <li><a href="<?php echo base_url('Sms/bulk_sms'); ?>"><span>Bulk SMS</span></a></li>
                                        <li><a href="<?php echo base_url('Sms/single_sms'); ?>"><span>Single SMS</span></a></li>
                                    </ul>
                                </li>
                                <li class="has-children"><a href="javascript:;"><i class="fa fa-inbox" aria-hidden="true"></i><span>SMS Settings</span></a>
                                    <ul class="list-unstyled sub-menu collapse">
                                        <li><a href="<?php echo base_url('Sms/sms_status'); ?>"><span>Status</span></a></li>
                                        <li><a href="<?php echo base_url('Sms/sender_ids'); ?>"><span>Sender Ids</span></a></li>
                                        <li><a href="#"><span>Report</span></a></li>
                                    </ul>
                                </li>

                                <?php if($_SESSION['name'] == 'Superadmin'): ?>
                                <li class="has-children"><a href="javascript:;"><i class="fa fa-cart-plus" aria-hidden="true"></i><span>SMS Purchase</span></a>
                                    <ul class="list-unstyled sub-menu collapse">
                                        <li><a href="<?php echo base_url('Purchase/purchase'); ?>"><span>New</span></a></li>
                                        <li><a href="<?php echo base_url('Purchase/purchase'); ?>"><span>Report</span></a></li>
                                    </ul>
                                </li>
                                <li class="has-children"><a href="javascript:;"><i class="fa fa-cogs" aria-hidden="true"></i><span>Settings</span></a>
                                    <ul class="list-unstyled sub-menu collapse">
                                        <li><a href="<?php echo base_url('Settings/sms_plan'); ?>"><span>SMS Plan</span></a></li>
                                        <li><a href="<?php echo base_url('Settings/sender_id'); ?>"><span>Sender Id</span></a></li>
                                    </ul>
                                </li>
                                <?php endif; ?>
                                <li class=""><a href="<?php echo base_url('Auth/logout'); ?>"><i class="fa fa-power-off" aria-hidden="true"></i><span>Sign-out</span></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
 <div class="prtm-content-wrapper" style="min-height:600px;">