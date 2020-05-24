<?php 
if (isset($_GET['ref'])) {
    $ref = $_GET['ref'];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <meta name="og:title" content="Switchboo"/>
    <meta name="description" content="Switchboo gets you cheaper energy bills forever. When your deal ends, we'll automatically switch you again. You don't have to do a thing. And our service is free!"/>
    <meta name="subject" content="Switchboo">
    
    <title>Switchboo</title>
    <meta name="og:title" content="Switchboo"/>
    <meta name="subject" content="Switchboo">
    <meta name="description" content="Switchboo gets you cheaper energy bills forever. When your deal ends, we'll automatically switch you again. You don't have to do a thing. And our service is free!"/>
    <meta name="og:description" content="Switchboo gets you cheaper energy bills forever. When your deal ends, we'll automatically switch you again. You don't have to do a thing. And our service is free!"/>
    
    <meta property="og:image" content="https://switchboo.com/assets/images/SB-display.png" />

    
    
    
    <link rel="shortcut icon" href="../assets/favicon/favicon.ico">
	<link rel="icon" sizes="16x16 32x32 64x64" href="../assets/favicon/favicon.ico">
	<link rel="icon" type="image/png" sizes="196x196" href="../assets/favicon/favicon-192.png">
	<link rel="icon" type="image/png" sizes="160x160" href="../assets/favicon/favicon-160.png">
	<link rel="icon" type="image/png" sizes="96x96" href="../assets/favicon/favicon-96.png">
	<link rel="icon" type="image/png" sizes="64x64" href="../assets/favicon/favicon-64.png">
	<link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon/favicon-32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="../assets/favicon/favicon-16.png">
	<link rel="apple-touch-icon" href="../assets/favicon/favicon-57.png">
	<link rel="apple-touch-icon" sizes="114x114" href="../assets/favicon/favicon-114.png">
	<link rel="apple-touch-icon" sizes="72x72" href="../assets/favicon/favicon-72.png">
	<link rel="apple-touch-icon" sizes="144x144" href="../assets/favicon/favicon-144.png">
	<link rel="apple-touch-icon" sizes="60x60" href="../assets/favicon/favicon-60.png">
	<link rel="apple-touch-icon" sizes="120x120" href="../assets/favicon/favicon-120.png">
	<link rel="apple-touch-icon" sizes="76x76" href="../assets/favicon/favicon-76.png">
	<link rel="apple-touch-icon" sizes="152x152" href="../assets/favicon/favicon-152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="../assets/favicon/favicon-180.png">
	<meta name="msapplication-TileColor" content="#FFFFFF">
	<meta name="msapplication-TileImage" content="../assets/favicon/favicon-144.png">
	<meta name="msapplication-config" content="../assets/favicon/browserconfig.xml">

    
    <script src="https://kit.fontawesome.com/28d22f76c2.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <link rel="stylesheet" href="../assets/css/fonts.css">
    <link href="../assets/css/forms.css" rel="stylesheet">
    <link href="../assets/css/form1.css" rel="stylesheet">
    

</head>
    
    <style>
    
        input {
            background-repeat: no-repeat;
            background-position: 96%;
            background-size: 15px;
        }
    
    
    </style>
    
    
    
    
<body>

    
    <!-- navbar -->
    <nav class="navbar navbar-light bg-light">
        <span id="nav-brand">
        <a href="../" target="_blank" class="navbar-brand">
            <img src="../assets/images/switchboo_pink.png" class="img-fluid" alt=""/>
        </a>
        </span>
        <form class="form-inline">
            <a href="/">
                <span class="navbar-text">
                    <span>Back</span>
                </span>
            </a>
        </form>
    </nav>

    
    
        <div class="container-fluid" id="form-container" style="padding-bottom: 10px !Important; background-color: transparent !Important;">
    
        <!-- row-one-content (what do you use at your home) -->
            <div class="row " id="row-1">
                <div class="col-10 offset-1 form-container" style="background-color: transparent !Important;">
                    <!-- what do you use at your home -->
                    <div class="row question-row" style="margin-bottom: 10px !Important;">
                        <div class="col-12 question-title">
                            <h5><label class="required">We're giving away £1,000 to one lucky winner!</label></h5>
                            <h6>Your information is secure and will not be shared with any third parties. Switchboo will only contact you regarding the competition. Enter for free below:</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    


    <div class="container-fluid" id="form-container" style=" padding-bottom: 100px !Important; padding-top: 0px !Important;">
    
        
        <!-- row-one-content (what do you use at your home) -->
        <div class="row " id="row-1">
            <div class="col-10 offset-1 form-container" > <!-- here -->
              <form id="quote_base" method="post">
                  
                <!-- what do you use at your home -->
                <div class="row question-row">

                    <div class="col-12 question-title">
                        <h5><label class="required">Who is your energy supplier?</label></h5>
                    </div>

                    <!-- gas and elecricity, gas or just electricity -->
                    <div class="form-check">
                        <div class="row" id="supplier-buttons">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <input required="required" pattern="^.{2,}$" id="energy-supplier" type="text" class="form-control custom-input">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end -->
                
                <!-- do you have the same supplier for gas and electricity -->
                <div class="row question-row" id="row-one-same-supplier">
                    <div class="col-11 question-title">
                        <h5>Would you like to pay less for your energy?</h5>
                    </div>

                    <div class="form-check" id="same-supplier">
                        <div class="row">
                            <div class="col-6 col-md-2">
                                <input id="row-one-yes" class="display-hide button-fill" type="radio" name="row_one_circles" value="1" checked>
                                <label for="row-one-yes" class="btn btn-primary type-button round-button-circle"><span>Yes</span></label>
                            </div>
                            <div class="col-6 col-md-2">
                                <input id="row-one-no" class="display-hide button-fill" type="radio" name="row_one_circles" value="0">
                                <label for="row-one-no" class="btn btn-primary type-button round-button-circle"><span>No</span></label>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end -->
                
                
                <div class="row question-row">

                    <div class="col-12 question-title">
                        <h5><label class="required">What is your email?</label></h5>
                    </div>

                    <!-- gas and elecricity, gas or just electricity -->
                    <div class="form-check">
                        <div class="row" id="supplier-buttons">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <input required="required" id="customer-name" type="text" class="form-control custom-input" pattern="^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-||_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+([a-zA-Z]+|\d|-|\.{0,1}|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])?([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$">
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div class="row question-row">

                    <div class="col-12 question-title">
                        <h5><label class="required">What is your phone number? <span style="font-size: 14px;">(We'll call you if you win!)</span></label></h5>
                    </div>

                    <!-- gas and elecricity, gas or just electricity -->
                    <div class="form-check">
                        <div class="row" id="supplier-buttons">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <input required="required" id="phone-number" type="text" class="form-control custom-input" pattern="^0[0-9 ]{9,24}$">
                            </div>
                        </div>
                    </div>
                </div>
                
                
                </form>
            </div>
        </div>
        <!-- row-one-content -->
        
        
        <div class="row row-divider">
            <div class="col-10 offset-1 form-container confirm-switch-control">
                    <button type="button" id="quote_step_one_submit" class="btn btn-primary black-button">
                        <span class="white-hover">ENTER</span><i class="fas fa-chevron-right space-icon"></i>
                    </button>
            </div>
        </div>     


    </div>
    
        
    
    
    <div class="modal fade" id="stepmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">£1000 cash giveaway</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Your entry has been recieved. Thanks for entering!
              
              <div class="modal-form-outer">
                  <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <p>Did you know that £4 billion pounds is wasted every year by people overpaying for their energy bills ?</p>
                            
                            <p>Switchboo aims to change that by providing an easy, fast and most importantly free energy switching service.</p>
                        </div>  
                    </div>
                  </div>
              </div>
              
              
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    
<script src="../assets/vendor/jquery/jquery.min.js"></script>
<script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="../assets/vendor/jquery/jquery-ui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js"></script>    
    
    
</body>
    
    
    <script>
    let ref = "facebook";
    <?php
    if (isset($ref)) {
    ?>
    ref = "<?php echo $ref; ?>";
    <?php    
    }    
    ?>
    
    
    console.log(ref);
        
    $( document ).ready(function() {
        
        $('#stepmodal').modal();
        
        
    $('input').bind('invalid', function() {
      return false;
    });
    
    
    $('input').on('input',function(){  
        if ($(this).attr("pattern") != undefined) {
            if (this.reportValidity() === true && $(this).val() !== "") {
                $(this).css('background-image', 'url(../assets/images/checkmark.png)');
            } else {
                $(this).css('background-image', 'url(../assets/images/delete-sign.png)');
            }
        }
    });
        
        
        
        
        var endpoint = "https://api.switchboo.com";
        //var endpoint = "http://localhost:3000";
        
        function validate() {
            try {
                
                let rtn = true;
                
                if ($('#energy-supplier').val().length == 0) {
                    rtn = false;
                }

                if ($('#customer-name').val().length == 0) {
                    rtn = false;
                }
                
                if ($('#phone-number').val().length == 0) {
                    rtn = false;
                }
                return rtn;
            } catch (e) {
                return false;
                console.log(e);
            }
        }    
        
        
        
        $(document).on('click tap touchstart', '#quote_step_one_submit', function (e) {
        e.preventDefault();
            
            if (document.getElementById("quote_base").checkValidity() == false) {
                alert("Please answer all of the questions correctly");
                return;
            }
        
            let obj = {};
            obj['refID'] = ref;
            obj['energySupplier'] = $('#energy-supplier').val();
            obj['customerName'] = $('#customer-name').val();
            obj['phoneNumber'] = $('#phone-number').val();
            
            if ($('input[name=row_one_circles]:checked').val() === "1") {
                obj['payless'] = 1;
            } else {
                obj['payless'] = 0;
            }
            
            
            $.ajax({
                url: endpoint + "/ref",
                type:"POST",
                data:JSON.stringify(obj),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data){
                    console.log(data);
                    alert(data);
                }
            });
            
            console.log(JSON.stringify(obj));
            
            
            
        });
        
    });
        
        
    
    </script>