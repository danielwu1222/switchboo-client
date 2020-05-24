<?php
error_reporting(0);
define('BASE_URL' , 'https://'.$_SERVER['HTTP_HOST'].'/');
?>
    <div class="container-fluid" id="section-four-container">

        <div class="row" id="section-four-header">
            <div class="col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 col-xl-12 offset-xl-0">
                <h5>GET STARTED FOR FREE</h5>
            </div>
        </div>

        <div class="row" id="section-four-secondary-header">
            <div class="col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 col-xl-12 offset-xl-0">
                <p>We'll email you a confirmation of your quote. Do you want to receive emails about news and money saving tips?</p>
            </div>
        </div>

        <div class="row" id="section-four-form">
            <div class="col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 col-xl-12 offset-xl-0">
                <form id="quote_base_two" name="quote_base_two" method="post">
                <div class="row">

                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="form-group">
                            <input type="text" id="quote_base_two_postcode" required="required" placeholder="YOUR POSTCODE" class="form-control" pattern="^[-a-zA-Z0-9 .'&ñçàáâãäèéêëìíîïòóôõöùúûü]{2,50}$">
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-4">
                        <div class="form-group">
                            <input type="email" id="quote_base_two_email" required="required" placeholder="YOUR EMAIL" class="form-control" pattern="^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-||_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+([a-zA-Z]+|\d|-|\.{0,1}|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])?([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$">
                        </div>
                    </div>

                    <div class="col-6 col-md-3 button-row-left smaller-buttons-container left-button">
                        <button type="button" id="quote_base_two_submit_yes" class="btn btn-primary white-underline" style="height: calc(2.2em + .75rem + 2px);"><span class="white-hover">Yes, go!</span></button>
                    </div>
                    <div class="col-6 col-md-3 col-lg-2 button-row-right smaller-buttons-container">
                        <button type="button" id="quote_base_two_submit_no" class="btn btn-primary white-underline t-button" style="height: calc(2.2em + .75rem + 2px);"><span class="white-hover">No, go</span></button>
                    </div>

                </div>
                </form>

            </div>
        </div>


        <div class="row" id="section-four-footer">
            <div class="col-12 col-sm-8 offset-sm-2 col-xl-12 offset-xl-0">
                
            </div>
        </div>


    </div>

