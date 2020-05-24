<?php
error_reporting(0);
define('BASE_URL' , 'https://'.$_SERVER['HTTP_HOST'].'/');
?>

   <!-- Navigation -->
    <nav class="navbar navbar-expand-md bg-white static-top no-padding-bottom">
        <div class="container-fluid">

            <div class="row" id="nav-row">


                <div class="col-6 col-md-3 offset-md-1 col-lg-3 offset-lg-2 col-xl-4 offset-xl-0">
                    <a class="navbar-brand black" href="<?php echo BASE_URL; ?>">
                        <img src="https://switchboo.com/assets/images/switchboo_pink.png" class="img-fluid"/>
                    </a>
                </div>

                <div class="col-6 col-md-8 col-lg-7 col-xl-8" id="navbar-toggler">

                    <button class="navbar-toggler custom-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="nav-link black" href="<?php echo BASE_URL; ?>how-it-works/"><span>How it works</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link black" href="<?php echo BASE_URL; ?>about/"><span>About us</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link black" href="<?php echo BASE_URL; ?>help/"><span>Help</span></a>
                            </li>
                            <li class="nav-item">
                                <!-- <a id="nav-login" class="nav-link black" href="#"><span>Login</span></a> -->
                                <a  class="nav-link black" href="<?php echo BASE_URL; ?>contact/"><span>Contact us</span></a>
                            </li>
                        </ul>
                    </div>

                </div>


            </div>
        </div>
    </nav>

