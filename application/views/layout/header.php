<!Doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
    <meta content="" name="School Software" />
    <meta content="" name="author" />
    <link rel="shortcut icon" type="image/png" href="<?php echo base_url(); ?>assets/img/favicon.png">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/vendor.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/plugins.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/pratham.min.css">
    <title>SMSFIZZ | Admin</title>
</head>
<body>
    <div class="prtm-wrapper">
        <header class="prtm-header">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span><span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                        <button class="c-hamburger c-hamburger--htra prtm-bars pull-right"> <span>toggle menu</span> </button>
                        <div class="prtm-logo">
                            <a class="navbar-brand" href="#"><strong>&nbsp;&nbsp;S&nbsp; M&nbsp; S&nbsp; F&nbsp; I&nbsp; Z&nbsp; Z</strong><!--img class="img-responsive display-ib" src="<?php echo base_url(); ?>assets/img/admin.png" alt="logo" width="226" height="31"--></a>
                        </div>
                    </div>
                    <div id="navbar" class="navbar-collapse collapse" data-hover="dropdown">
                        <!--ul class="nav navbar-nav">
                            <li class="active">
                                <div class="prtm-search-icon"> <a href="javascript:;" class="prtm-menu-search"><i class="fa fa-search overlay-1"></i></a>
                                    <div class="prtm-navbar-search">
                                        <div class="prtm-search-area"></div>
                                        <form class="prtm-search-form" method="post" role="search" action="javascript:;"> <span class="prtm-search-form-title fa fa-search"></span>
                                            <input placeholder="Type and hit enter" value="" name="s" type="text"> </form>
                                    </div>
                                </div>
                            </li>
                            <li class="dropdown hidden-xs hidden-sm hidden-md"> <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Mega <span class="caret"></span></a>
                                <div class="dropdown-menu prtm-mega-menu">
                                    <div class="prtm-mega-menu-wrap pad-all-lg">
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2">
                                                <h4 class="sidenav-heading text-uppercase mrgn-b-md">Welcome Admin!</h4>
                                                <ul class="list-unstyled">
                                                    <li><a href="index.html">Dashboard 1</a></li>
                                                    <li><a href="dashboard-v2.html">Dashboard 2</a></li>
                                                    <li><a href="dashboard-v3.html">Dashboard 3</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2">
                                                <h4 class="sidenav-heading text-uppercase mrgn-b-md">Features</h4>
                                                <ul class="list-unstyled">
                                                    <li><a href="ui-buttons.html">UI Elements</a></li>
                                                    <li><a href="notification.html">Components</a></li>
                                                    <li><a href="google-chart.html">Graph and Charts</a></li>
                                                    <li><a href="googlemap.html">Maps</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2">
                                                <h4 class="sidenav-heading text-uppercase mrgn-b-md">Layouts</h4>
                                                <ul class="list-unstyled">
                                                    <li><a href="index.html">Sidebar At left</a></li>
                                                    <li><a href="right-sidebar.html">Sidebar At right</a></li>
                                                    <li><a href="fixed-header.html">Fixed Header</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2">
                                                <h4 class="sidenav-heading text-uppercase mrgn-b-md">Pages</h4>
                                                <ul class="list-unstyled">
                                                    <li><a href="users-list.html">Users</a></li>
                                                    <li><a href="ecommerce-product.html">Ecommerce</a></li>
                                                    <li><a href="email.html">Mailbox</a></li>
                                                    <li><a href="login.html">Extra Pages</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                                                <div class="prtm-sparkline">
                                                    <div class="prtm-sparkline-list bg-success clearfix prtm-card-box">
                                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"> <span class="show count-item" data-count="5000">0</span> <span>New visitors</span> </div>
                                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="chart sparkline text-center" data-chart="sparkline" data-type="bar" data-height="50px" data-barwidth="6" data-width="100%" data-barspacing="2" data-barcolor="#ffffff" data-values="[9, 8, 9, 7, 6, 8, 7, 8]"> </div>
                                                        </div>
                                                    </div>
                                                    <div class="prtm-sparkline-list clearfix bg-info prtm-card-box">
                                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"> <span class="show count-item" data-count="3000">0</span> <span>New Users</span> </div>
                                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="chart sparkline text-center" data-chart="sparkline" data-type="bar" data-height="50px" data-barwidth="6" data-width="100%" data-barspacing="2" data-barcolor="#ffffff" data-values="[5, 6, 8, 9, 5, 8, 4, 6]"> </div>
                                                        </div>
                                                    </div>
                                                    <div class="prtm-sparkline-list clearfix bg-secondary prtm-card-box">
                                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"> <span class="show count-item" data-count="7000">0</span> <span>Active Users</span> </div>
                                                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="chart sparkline text-center" data-chart="sparkline" data-type="bar" data-height="50px" data-barwidth="6" data-width="100%" data-barspacing="2" data-barcolor="#ffffff" data-values="[9, 8, 9, 7, 6, 8, 7, 8]"> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="dropdown hidden-xs hidden-sm hidden-md"> <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">New<span class="caret"></span></a>
                                <ul class="dropdown-menu ">
                                    <li><a href="javascript:;">New Page 1</a></li>
                                    <li><a href="javascript:;">New Page 2</a></li>
                                    <li><a href="javascript:;">New Page 3</a></li>
                                </ul>
                            </li>
                        </ul-->
                        <ul class="nav navbar-nav navbar-right">
                           <li class="dropdown"> <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?php if(isset($_SESSION['name'])) echo $_SESSION['name']; ?><span class="caret"></span><img class="img-responsive display-ib mrgn-l-sm img-circle" src="<?php echo base_url(); ?>assets/img/user-1.jpg" width="64" height="64" alt="User-image"></a>
                                <ul class="dropdown-menu">
                                    <li><a href="<?php echo base_url('Auth/profile'); ?>"><i class="fa fa-user"></i> My Profile</a></li>
                                    <li><a href="<?php echo base_url('Auth/change_password'); ?>"><i class="fa fa-cog"></i> Change Password</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="<?php echo base_url('Auth/logout'); ?>"><i class="fa fa-power-off"></i>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!--/.nav-collapse -->
                </div>
            </nav>
        </header>
        <div class="prtm-main">