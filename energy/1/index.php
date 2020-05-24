
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <title>Step 1 - Switchboo</title>
    <meta name="og:title" content="Switchboo - Cheap Energy Forever"/>
    <meta name="subject" content="Switchboo - Cheap Energy Forever ">
    <meta name="description" content="Switchboo is a free service that saves you time and money by automatically switching you onto the best energy deals when your plan ends."/>
    <meta name="og:description" content="Switchboo is a free service that saves you time and money by automatically switching you onto the best energy deals when your plan ends."/>
    <script src="https://kit.fontawesome.com/28d22f76c2.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <link rel="stylesheet" href="../../assets/css/fonts.css">

    <link href="../../assets/css/forms.css" rel="stylesheet">
    <link href="../../assets/css/form1.css" rel="stylesheet">
    
    
    <link rel="shortcut icon" href="../../assets/favicon/favicon.ico">
	<link rel="icon" sizes="16x16 32x32 64x64" href="../../assets/favicon/favicon.ico">
	<link rel="icon" type="image/png" sizes="196x196" href="../../assets/favicon/favicon-192.png">
	<link rel="icon" type="image/png" sizes="160x160" href="../../assets/favicon/favicon-160.png">
	<link rel="icon" type="image/png" sizes="96x96" href="../../assets/favicon/favicon-96.png">
	<link rel="icon" type="image/png" sizes="64x64" href="../../assets/favicon/favicon-64.png">
	<link rel="icon" type="image/png" sizes="32x32" href="../../assets/favicon/favicon-32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="../../assets/favicon/favicon-16.png">
	<link rel="apple-touch-icon" href="../../assets/favicon/favicon-57.png">
	<link rel="apple-touch-icon" sizes="114x114" href="../../assets/favicon/favicon-114.png">
	<link rel="apple-touch-icon" sizes="72x72" href="../../assets/favicon/favicon-72.png">
	<link rel="apple-touch-icon" sizes="144x144" href="../../assets/favicon/favicon-144.png">
	<link rel="apple-touch-icon" sizes="60x60" href="../../assets/favicon/favicon-60.png">
	<link rel="apple-touch-icon" sizes="120x120" href="../../assets/favicon/favicon-120.png">
	<link rel="apple-touch-icon" sizes="76x76" href="../../assets/favicon/favicon-76.png">
	<link rel="apple-touch-icon" sizes="152x152" href="../../assets/favicon/favicon-152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="../../assets/favicon/favicon-180.png">
	<meta name="msapplication-TileColor" content="#FFFFFF">
	<meta name="msapplication-TileImage" content="../../assets/favicon/favicon-144.png">
	<meta name="msapplication-config" content="../../assets/favicon/browserconfig.xml">


    <!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1270048123146935');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1270048123146935&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
    
    <!-- Google Analytics Code -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-160223111-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-160223111-1');
</script>
     <!-- End Google Analytics Code -->

</head>
    
    <!-- Facebook Track Event -->
    <body>
    <script>
  fbq('track', 'ViewContent');
</script>
    </body>
    <!-- End Facebook Track Event -->
<body>

    <!-- navbar -->
    <nav class="navbar navbar-light bg-light">
        <span id="nav-brand">
        <a href="../../" target="_blank" class="navbar-brand">
            <img src="../../assets/images/switchboo_pink.png" class="img-fluid" alt=""/>
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
    <!-- end -->
    
    
    <!-- loading spinner -->
    <div class="loading hide-element">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    
    
    <!-- end -->

    <div class="container-fluid" id="form-container">
    
        
        <!-- row-one-content (what do you use at your home) -->
        <div class="row " id="row-1">
            <div class="col-10 offset-1 form-container" >
              
                <!-- what do you use at your home -->
                <div class="row question-row">

                    <div class="col-12 question-title">
                        <h5><label class="required">What type of energy does your home use?</label></h5>
                    </div>

                    <!-- gas and elecricity, gas or just electricity -->
                    <div class="form-check">
                        <div class="row" id="supplier-buttons">
                            <div class="col-12 col-sm-6 col-lg-4">
                                <input id="row-one-dual" class="display-hide button-fill" type="radio" name="row_one_buttons" value="dual" checked> 
                                <label for="row-one-dual" class="btn btn-primary type-button">
                                    Gas and Electricity
                                </label>        
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4">
                                <input id="row-one-electricity" class="display-hide button-fill" type="radio" name="row_one_buttons" value="electricity"> 
                                <label for="row-one-electricity" class="btn btn-primary type-button">
                                    Electricity only
                                </label>        
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end -->
                
                <!-- do you have the same supplier for gas and electricity -->
                <div class="row question-row" id="row-one-same-supplier">
                    <div class="col-11 question-title">
                        <h5>Do you have the same supplier for both gas and electricity?</h5>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="Duel Fuel means the same supplier provides both your gas and electricity">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
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
                
                
                <div class="row question-row" id="economy-seven-question">
                    <div class="col-11 question-title">
                        <h5>Do you have an Economy 7 Meter?</h5>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="Customers with an Economy 7 meter are charged two different rates for their energy, depending on the time they’re using their energy. If you’re not sure whether you have one then check for two dials, usually marked 'high' and 'low' or 'day' and 'night', or a Meter Point Access Number (MPAN) starting with '02'.">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>


                    <div class="form-check" id="economy-seven">                       
                        <div class="row">
                            <div class="col-6 col-md-2">
                                <input id="row-five-yes" class="display-hide button-fill" type="radio" name="row_five_circles" value="1">
                                <label for="row-five-yes" class="btn btn-primary type-button round-button-circle"><span>Yes</span></label>
                            </div>
                            <div class="col-6 col-md-2">
                                <input id="row-five-no" class="display-hide button-fill" type="radio" name="row_five_circles" value="0" checked>
                                <label for="row-five-no" class="btn btn-primary type-button round-button-circle"><span>No</span></label>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
        <!-- row-one-content -->
        
        
        <!-- row-two-content (who is your energy supplier) -->
        <div class="row row-divider" id="row-2">
            <div class="col-10 offset-1 form-container" >
                   <!-- whos is your energy supplier-->
                <div class="row question-row">
                    <div class="col-11 question-title">
                        <h5>Who is your energy supplier?</h5>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="If you’re not sure who your current supplier is, take a look at your most recent bill.">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                    
                    
                    <div class="col-12">
                        <div class="row" id="dual-supplier-image-container">
                        </div>
                    </div>       
                    
                    <div class="col-12">
                        <p class="control-label">Can't see your supplier? Check the list below</p>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-dual-supplier">
                                    <optgroup label="Find your supplier">
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <!-- end -->
                
                <!-- which energy plan are you on -->
                <div class="row question-row gas-and-electricity">
                    <div class="col-11 question-title">
                        <h5>Which tariff are you on?</h5>
                        <p>You can find this on your energy bill</p>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="If you cannot find your tariff in the list select Not Sure and we will assume you are on a standard tariff">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-dual-plan">
                                    <optgroup label="Find your plan">
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>  
                </div>
                <!-- end-->
                
                <!-- How do you pay for your energy ? -->
                <div class="row question-row gas-and-electricity">
                    <div class="col-12 question-title">
                        <h5>How do you pay for your energy?</h5>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-dual-pay">        
                                    <optgroup label="Payment Method">  
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>
                    
                </div>
                <!-- end -->  
                
                
            </div>
        </div>
        <!-- row-two-content -->
        
        
        
        
        <!-- row-three-content (who is your gas supplier) -->
        <div class="row row-divider hide-element" id="row-3">
            <div class="col-10 offset-1 form-container">
                   <!-- whos is your energy supplier-->
                <div class="row question-row">
                    <div class="col-11 question-title">
                        <h5>Who is your Gas supplier?</h5>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="If you’re not sure who your current supplier is, take a look at your most recent bill.">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                    
                    
                    <div class="col-12">
                        <div class="row" id="gas-supplier-image-container">

                        </div>
                    </div>       
                    
                    <div class="col-12">
                        <p class="control-label">Can't see your supplier? Check the list below</p>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-gas-supplier">
                                    <optgroup label="Find your supplier">
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <!-- end -->
                
                <!-- which energy plan are you on -->
                <div class="row question-row gas-and-electricity">
                    <div class="col-11 question-title">
                        <h5>Which tariff are you on?</h5>
                        <p>You can find this on your energy bill</p>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="If you cannot find your tariff in the list select Not Sure and we will assume you are on a standard tariff">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-gas-plan">
                                    <optgroup label="Find your plan">
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>  
                </div>
                <!-- end-->
                
                <!-- How do you pay for your energy ? -->
                <div class="row question-row gas-and-electricity">
                    <div class="col-12 question-title">
                        <h5>How do you pay for your gas?</h5>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-gas-pay">        
                                    <optgroup label="Payment Method">  
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>
                    
                </div>
                <!-- end -->  
                
                
            </div>
        </div>
        <!-- row-three-content -->
        
        
        
               
        <!-- row-four-content (who is your electricity supplier) -->
        <div class="row row-divider hide-element" id="row-4">
            <div class="col-10 offset-1 form-container" >
                   <!-- whos is your energy supplier-->
                <div class="row question-row">
                    <div class="col-11 question-title">
                        <h5>Who is your electricity supplier?</h5>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="If you’re not sure who your current supplier is, take a look at your most recent bill.">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                    
                    
                    <div class="col-12">
                        <div class="row" id="electricity-supplier-image-container"> 
                        </div>
                    </div>       
                    
                    <div class="col-12">
                        <p class="control-label">Can't see your supplier? Check the list below</p>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-electricity-supplier">
                                    <optgroup label="Find your supplier">
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <!-- end -->
                
                <!-- which energy plan are you on -->
                <div class="row question-row gas-and-electricity">
                    <div class="col-11 question-title">
                        <h5>Which tariff are you on?</h5>
                        <p>You can find this on your energy bill</p>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="If you cannot find your tariff in the list select Not Sure and we will assume you are on a standard tariff">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-electricity-plan">
                                    <optgroup label="Find your plan">
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>  
                </div>
                <!-- end-->
                
                <!-- How do you pay for your energy ? -->
                <div class="row question-row gas-and-electricity">
                    <div class="col-12 question-title">
                        <h5>How do you pay for your electricity?</h5>
                    </div>

                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 col-lg-4 offset-md-0">
                        <div class="form-group">
                            <label class="label-selector">
                                <select class="form-control selector" id="select-electricity-pay">        
                                    <optgroup label="Payment Method">  
                                    </optgroup>
                                </select>
                            </label>
                        </div>
                    </div>
                    
                </div>
                <!-- end -->  
                
                
            </div>
        </div>
        <!-- row-three-content -->
        
        
        <!-- row-six-content (how much energy do you use) -->
        <div class="row row-divider" id="row-6">
            <div class="col-10 offset-1 form-container" >
                
                <div class="row question-row" id="row-one-same-supplier">
                    <div class="col-11 question-title">
                        <h5>Do you know how much energy you use?</h5>
                    </div>
                    
                    <div class="col-1 text-right tooltip-container">
                        <span>
                            <button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="" data-original-title="Do you know how much energy you use in either Kwh or £ ?">
                                <i class="far fa-question-circle" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>

                    <div class="form-check" id="same-supplier">
                        <div class="row">
                            <div class="col-6 col-md-2">
                                <input id="row-six-yes" class="display-hide button-fill" type="radio" name="row_six_circles" value="1" checked>
                                <label for="row-six-yes" class="btn btn-primary type-button round-button-circle"><span>Yes</span></label>
                            </div>
                            <div class="col-6 col-md-2">
                                <input id="row-six-no" class="display-hide button-fill" type="radio" name="row_six_circles" value="0">
                                <label for="row-six-no" class="btn btn-primary type-button round-button-circle"><span>No</span></label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="row-6-usage">
                    <div class="row question-row" id="row-6-gas">
                    <div class="col-12 question-title">
                        <h5>Your gas</h5>
                    </div>
                    
                    <div class="col-12">
                        <div class="row" id="row-six-gas">
                            <div class="col-12 col-md-4">
                                <label class="label-selector">
                                    <select class="form-control selector" id="select-gas-use">        
                                        <option value="spend">I spend</option>
                                        <option value="use">I use</option>
                                    </select>
                                </label>
                            </div>
                            
                            <div class="col-12 col-md-4">
                                <form>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend" id="gas-pound">
                                            <span class="input-group-text input-group-border-left">£</span>
                                        </div>
                                        <input id="gas-input" type="number" class="form-control custom-input input-no-border-left">
                                        <div class="input-group-prepend hide-element" id="gas-kwh">
                                            <span class="input-group-text input-group-border-right">kWH</span>
                                        </div>
                                    </div>
                                </form>
                            </div>


                            <div class="col-12 col-md-4">
                                <label class="label-selector">
                                    <select class="form-control selector" id="select-gas-per">
                                        <option value="1">Monthly</option> 
                                        <option value="3">Yearly</option>
                                        <option value="2">Quarterly</option>               
                                    </select>
                                </label>
                            </div>

                        </div>
                    </div>
                    
                </div>         
                    <div class="row question-row" id="row-6-electricity">
                        <div class="col-12 question-title">
                            <h5>Your electricity</h5>
                        </div>
                    
                    <div class="col-12">
                        <div class="row" id="row-six-electricity">
                            <div class="col-12 col-md-4">
                                <label class="label-selector">
                                    <select class="form-control selector" id="select-electricity-use">        
                                        <option value="spend">I spend</option>
                                        <option value="use">I use</option>
                                    </select>
                                </label>
                            </div>
                            
                            <div class="col-12 col-md-4">
                                <form>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend" id="electricity-pound">
                                            <span class="input-group-text input-group-border-left">£</span>
                                        </div>
                                        <input id="electricity-input" type="number" class="form-control custom-input input-no-border-left">
                                        <div class="input-group-prepend hide-element" id="electricity-kwh">
                                            <span class="input-group-text input-group-border-right">kWH</span>
                                        </div>
                                    </div>
                                </form>
                            </div>


                            <div class="col-12 col-md-4">
                                <label class="label-selector">
                                    <select class="form-control selector" id="select-electricity-per">  
                                        <option value="1">Monthly</option>
                                        <option value="3">Yearly</option>
                                        <option value="2">Quarterly</option>
                                        
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    
                    
                                                

                        <div class="row question-row night-usage hide-element" id="row-6-night-usage">
                            <div class="col-12 question-title">
                                <h5>Night usage</h5>
                            </div>
                    
                            <div class="col-12 col-md-4">
                                <label class="label-selector">
                                    <select class="form-control selector" id="select-electricity-night">
                                        <option value="0.42">42%</option>
                                        <option value="0.00">0%</option>
                                        <option value="0.05">5%</option>
                                        <option value="0.10">10%</option>
                                        <option value="0.15">15%</option>
                                        <option value="0.20">20%</option>
                                        <option value="0.25">25%</option>
                                        <option value="0.30">30%</option>
                                        <option value="0.35">35%</option>
                                        <option value="0.40">40%</option>
                                        <option value="0.45">45%</option>
                                        <option value="0.50">50%</option>
                                        <option value="0.55">55%</option>
                                        <option value="0.60">60%</option>
                                        <option value="0.65">65%</option>
                                        <option value="0.70">70%</option>
                                        <option value="0.75">75%</option>
                                        <option value="0.80">80%</option>
                                        <option value="0.85">85%</option>
                                        <option value="0.90">90%</option>
                                        <option value="0.95">95%</option>
                                        <option value="1.00">100%</option>
                                    </select>
                                </label>
                            </div>
                            
                        </div>    
                            
                            
                    
                    
                    
                    
            </div>
                
                
                          
                <div class="row question-row hide-element" id="row-6-not-sure">
                    <div class="col-12 question-title">
                        <h5>Your consumption</h5>
                    </div>
                    
                    <div class="col-12">
                        <div class="row">
                            
                            <div class="col-12 col-md-4">
                                <input id="row-six-small" class="display-hide button-fill" type="radio" name="row_six_ns" value="1" checked> 
                                <label for="row-six-small" class="btn btn-primary type-button text-center">
                                    <h5>Low</h5>
                                    <p class="usage-text">1-2 bedrooms</p>
                                </label> 
                            </div>
                            
                            
                            <div class="col-12 col-md-4">
                                <input id="row-six-med" class="display-hide button-fill" type="radio" name="row_six_ns" value="2"> 
                                <label for="row-six-med" class="btn btn-primary type-button text-center">
                                    <h5>Medium</h5>
                                    <p class="usage-text">2-4 bedrooms</p>
                                </label> 
                            </div>
                            
                            
                            <div class="col-12 col-md-4">
                                <input id="row-six-high" class="display-hide button-fill" type="radio" name="row_six_ns" value="3"> 
                                <label for="row-six-high" class="btn btn-primary type-button text-center">
                                    <h5>High</h5>
                                    <p class="usage-text">4+ bedrooms</p>
                                </label> 
                            </div>
                        </div>
                    </div>
                </div>
                
                
                
                
                
                
                
                
            </div>
        </div>
        <!-- row-six-content -->
        
        

        

        <div class="row row-divider">
            <div class="col-10 offset-1 form-container confirm-switch-control">
                <form id="quote-submit-frm">
                <button type="submit" id="quote_step_one_submit" class="btn btn-primary black-button">
                    <span class="white-hover">SEE RESULTS</span><i class="fas fa-chevron-right space-icon"></i>
                </button>
                </form>
            </div>
        </div>     


        <!-- start of footer -->
        <div class="row" id="footer">
            <div class="col-12 text-center">
                <h4>If you get stuck, give us a a call on 0800 4211 3213</h4>
            </div>
        </div>
        <!-- end of footer -->

    </div>
    
    
    
    <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Error</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"  id="modal-body">
            
          </div>
        </div>
      </div>
    </div>
    
    
    
    
    <div class="modal" id="search-modal" tabindex="-1" role="dialog" aria-hidden="true">
        
    <nav class="navbar navbar-light bg-light">
        <span id="nav-brand">
        <a href="../../" target="_blank" class="navbar-brand">
            <img src="../../assets/images/switchboo_pink.png" class="img-fluid" alt="">
        </a>
        </span>
    </nav>    
        
        
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" id="search-content">
          <div class="modal-body text-center" id="search-body">
            <h2 id="search-text">Searching for the best deals</h2>
              
            <div class="img-holder">
                <!--<img id="rotator" src="">-->
                <div class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
            </div>
              
          </div>
        </div>
      </div>
    </div>
    
    
    
    
    </body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<script src="../../assets/js/forms.js"></script>
<script src="../../assets/js/form1-new.js"></script>