<!Doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
    <meta name="description" content="School Software, Codefizz">
    <meta content="" name="author" />
    <link rel="shortcut icon" type="image/png" href="<?php echo base_url(); ?>assets/img/favicon.png">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/plugins/animate/animate.min.css" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/pratham.min.css">
    <title>SMSFIZZ | login</title>
</head>

<body>
    <div class="prtm-wrapper">
        <div class="prtm-main"> 
            <div class="login-banner"></div>
            <div class="login-form-wrapper mrgn-b-lg">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-5 center-block">
                            <div class="prtm-form-block prtm-full-block overflow-wrappper">
                                <div class="login-bar"> <img src="<?php echo base_url(); ?>assets/img/login-bars.png" class="img-responsive" alt="login bar" width="743" height="7"> </div>
                                <div class="prtm-block-title text-center">
                                    <div class="mrgn-b-lg">
                                        <h1 class="text-center">S M S F I Z Z</h1>
                                    </div>
                                    <div class="login-top mrgn-b-lg">
                                        <div class="mrgn-b-md">
                                            <h2 class="text-capitalize base-dark font-2x fw-normal">Login</h2> </div>
                                        <p>Please enter your user information</p><br>
                                        <p class="text-danger"><?php echo $this->session->flashdata('login_error'); ?></p>
                                    </div>
                                </div>
                                <div class="prtm-block-content">
                                    <form class="login-form" action="<?php echo base_url('Auth/login_process'); ?>" method="POST">
                                        <div class="form-group has-feedback">
                                            <input class="form-control" id="user-id" name="username" type="email" placeholder="User Name" required> <span class="glyphicon glyphicon-user form-control-feedback fa-lg" aria-hidden="true"></span> </div>
                                        <div class="form-group has-feedback">
                                            <input class="form-control" id="user-pwd" name="password" aria-describedby="user-pwd" type="password" placeholder="Password" required> <span class="glyphicon glyphicon-lock form-control-feedback fa-lg" aria-hidden="true"></span> </div>
                                        <div class="login-meta mrgn-b-lg">
                                            <div class="row">
                                                <div class="col-xs-6 col-sm-6 col-md-6">
                                                    <div class="checkbox">
                                                        <label>
                                                            <!--input type="checkbox"><span class="text-capitalize">Remember me</span--> </label>
                                                    </div>
                                                </div>
                                                <!--div class="col-xs-6 col-sm-6 col-md-6 text-right"> <a href="javascript:;" class="text-primary password-style">Forgot Password?</a> </div-->
                                            </div>
                                        </div>
                                        <div class="mrgn-b-lg">
                                            <button type="submit" class="btn btn-success btn-block font-2x">Sign In</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/vendor.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url(); ?>assets/js/plugins.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url(); ?>assets/js/pratham.min.js" type="text/javascript"></script>
</body>

</html>