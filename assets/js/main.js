var init_data;
var endpoint = "https://api.switchboo.com";
//var endpoint = "http://localhost:3000";

var fired = false;

$( document ).ready(function() {
    
    $('input').bind('invalid', function() {
      return false;
    });
    
    
    $('input').on('input',function(){  
        if ($(this).attr("pattern") != undefined) {
            if (this.reportValidity() === true && $(this).val() !== "") {
                $(this).css('background-image', 'url(assets/images/checkmark.png)');
            } else {
                $(this).css('background-image', 'url(assets/images/delete-sign.png)');
            }
        }
    });
    
    
        
    $(document).on('click','.to-top',function(e) {     
        $('html, body').animate({scrollTop: $("#reg-form").offset().top}, 1200, function() {
            $("#form-container").effect( "shake", {times:1, distance:2}, 1500 );
        });      
    });


    $(document).on('click tap touchstart', '#quote_base_submit_yes', function (e) {
    try {
        e.preventDefault();
        } catch (err) {
            console.log("caught err: " + err);
        }
        
    setTimeout(() => {
        fired = false;
    }, 4000);
        
        if (fired == false) {
            fired = true;
        } else {
            console.log("fired = true");
            return false;
        }
        
        $.get(endpoint + "/init/", function( data ) {
            init_data = JSON.parse(data);
            init_data['marketing'] = 1;
            console.log(init_data);
            if (document.getElementById("quote_base").checkValidity() == true) {
                
                let postcode = $('#quote_base_postcode').val();
                let email = $('#quote_base_email').val();
                
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
                                    sessionStorage.setItem("email", email);
                                    sessionStorage.setItem("supplier-template", JSON.stringify(data));
                                    window.location.replace("energy/1/");
                                } else {
                                    fired = false;
                                    alert(data['errors']['0']['message']['text']);
                                }
                            }
                        });
                        
                        
                    }
                }        
            } else {
                fired = false;
            }
        });
    });
        
    
    $(document).on('click tap touchstart', '#quote_base_submit_no', function (e) {
        try {
        e.preventDefault();
        } catch (err) {
            console.log("caught err: " + err);
        }
            
    setTimeout(() => {
        fired = false;
    }, 4000);
        
        if (fired == false) {
            fired = true;
        } else {
            console.log("fired = true");
            return false;
        }
        
        $.get(endpoint + "/init/", function( data ) {
            init_data = JSON.parse(data);
            init_data['marketing'] = 0;
            console.log(init_data);
            if (document.getElementById("quote_base").checkValidity() == true) {
                
                let postcode = $('#quote_base_postcode').val();
                let email = $('#quote_base_email').val();
                
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
                                    sessionStorage.setItem("email", email);
                                    sessionStorage.setItem("supplier-template", JSON.stringify(data));
                                    window.location.replace("energy/1/");
                                } else {
                                    fired = false;
                                    alert(data['errors']['0']['message']['text']);
                                }
                            }
                        });
                        
                        
                    }
                }        
            } else {
                fired = false;
                document.getElementById("quote_base").reportValidity();
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