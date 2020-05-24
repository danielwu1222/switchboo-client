<?php
error_reporting(0);
define('BASE_URL' , 'https://'.$_SERVER['HTTP_HOST'].'/');
?>

<script>
    $( document ).ready(function() {
        
        
    $('input').bind('invalid', function() {
      return false;
    });
        
    $('input').on('input',function(){  
        if ($(this).attr("pattern") != undefined) {
            if (this.reportValidity() === true && $(this).val() !== "") {
                $(this).css('background-image', 'url(<?php echo BASE_URL; ?>assets/images/checkmark.png)');
            } else {
                $(this).css('background-image', 'url(<?php echo BASE_URL; ?>assets/images/delete-sign.png)');
            }
        }
    });
        
        
    var endpoint = "https://api.switchboo.com";
    $(document).on('click tap touchstart', '#quote_base_two_submit_yes', function (e) {
        e.preventDefault();
        
        $.get(endpoint + "/init/", function( data ) {
            init_data = JSON.parse(data);
            init_data['marketing'] = 1;
            console.log(init_data);
            if (document.getElementById("quote_base_two").checkValidity() == true) {
                
                let postcode = $('#quote_base_two_postcode').val();
                let email = $('#quote_base_two_email').val();
                
                if (updateTemplate("supplyPostcode","postcode", postcode)) {
                    if (updateTemplate("references","customerReference",email)) {
                        
                        
                        $.ajax({
                            url: endpoint + "/postcode",
                            type:"POST",
                            data:JSON.stringify(init_data),
                            contentType:"application/json; charset=utf-8",
                            dataType:"json",
                            success: function(data){
                                console.log(data);
                                if (!data.hasOwnProperty("errors")) {
                                    sessionStorage.setItem("supplier-template", JSON.stringify(data));
                                    window.location.replace("<?php echo BASE_URL; ?>switch/1/");
                                } else {
                                    alert("error");
                                }
                            }
                        });
                        
                        
                    }
                }        
            } else {
                document.getElementById("quote_base_two").reportValidity();
            }
        });
    });
        
    $(document).on('click tap touchstart', '#quote_base_two_submit_no', function (e) {
        e.preventDefault();
        
        $.get(endpoint + "/init/", function( data ) {
            init_data = JSON.parse(data);
            init_data['marketing'] = 0;
            console.log(init_data);
            if (document.getElementById("quote_base_two").checkValidity() == true) {
                
                let postcode = $('#quote_base_two_postcode').val();
                let email = $('#quote_base_two_email').val();
                
                if (updateTemplate("supplyPostcode","postcode", postcode)) {
                    if (updateTemplate("references","customerReference",email)) {
                        
                        
                        $.ajax({
                            url: endpoint + "/postcode",
                            type:"POST",
                            data:JSON.stringify(init_data),
                            contentType:"application/json; charset=utf-8",
                            dataType:"json",
                            success: function(data){
                                console.log(data);
                                if (!data.hasOwnProperty("errors")) {
                                    sessionStorage.setItem("supplier-template", JSON.stringify(data));
                                    window.location.replace("<?php echo BASE_URL; ?>switch/1/");
                                } else {
                                    alert("error");
                                }
                            }
                        });
                        
                        
                    }
                }        
            } else {
                document.getElementById("quote_base_two").reportValidity();
            }
        });
    });
        
        
    function updateTemplate(group_name, item_name, item_value) {
        let response = false;
        $.each(init_data['data-template']['groups'], function(index, val) {
            if (val['name'] === group_name) {
                $.each(init_data['data-template']['groups'][index]['items'], function(indexx, value) {
                    console.log(indexx, value);
                    if (value['name'] === item_name) {
                        value['data'] = item_value;
                        response = true;
                    }
                });
            }  
        });
        return response;
    }

    });


</script>