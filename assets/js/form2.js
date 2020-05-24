var data = null;
var confirm_data = null;
//var endpoint = "https://switchboo.herokuapp.com";
var endpoint = "http://localhost:3000";
var long_questions = ["specialNeeds", "consent", "communicationType"];
var long_answers = ["firstPreviousAddressLine1", "firstPreviousAddressLine2", "addressLine1", "addressLine2", "specialNeeds"];



//sort code     100000
//acc number    31510604


$(document).ready(function () {
    
   
    data = JSON.parse(sessionStorage.getItem("future-supplier"));
    console.log(data);

    $.each(data['data-template']['groups'], function(index, value) {
        let container = value['tags'];
        let guidance = null;
        if ("guidance" in value) {
            guidance = value['guidance'];
        }
        
        if (value['name'] === "supplyAddress") {
            container = "collapseTwo > .card-body";
        }
        
        if (value['name'] === "addressHistoryWithOverseasOption") {
            return;
        }
        
        $.each(value['items'], function(_index, _value) {
            buildQuestion(_value, container, guidance);  
        });
    });
         
    $.each(data['data-template']['groups'], function(index, value) {
        if (value['name'] === 'supplyAddress') {
            $.each(value['items'], function(_index, _value) {
                if (_value['name'] === "knownAddress") {
                    $.each(_value['acceptableValues'], function(__index, __value) {
                        $('#supply-address').append('<option value="' + __value['id'] + '">' + __value['name'] + '</option>');
                    });
                }
            });
        }
        
        
        if (value['name'] === "directDebitBankAccountWithPreferredPaymentDay") {
            if ("guidance" in value) {
                $('.direct-debit-header').text(value['guidance'][0]['statement']);
            }
        }
        
        
    });
    
    
    let tariff_string = "";
    if (data['future-supplier']['tariffType'] === "Fixed") {
        if ("durationWithCurrentSupplierInMonths" in data['future-supplier']) {
            tariff_string = data['future-supplier']["durationWithCurrentSupplierInMonths"] + " month fixed";
        } else {
            tariff_string = "fixed tariff";
        }
    } else {
        tariff_string = data['future-supplier']['tariffType'] + " tariff";
    }
    $('#form-tariff-type').text(tariff_string);
    
    
    if ("expectedAnnualSpend" in data['future-supplier']) {
        let num = parseFloat(data['future-supplier']["expectedAnnualSpend"]);
        let num_month = num / 12;
        num_month = num_month.toFixed(2);
        num = num.toFixed(2);
        $('#spend-yearly').text("£" + num);
        $('#spend-monthly').text("£" + num_month);
    }
    
    
    if ("addressHistoryMonthsRequired" in data) {
        $('.previous-address').removeClass("hide-element");
        $('.months-required').text(data['future-supplier']['supplier']['name'] + ' require ' + data['addressHistoryMonthsRequired'] + ' months of address history in order to process your switch');
    }
    
    if ("uri" in data['future-supplier']['supplyDetails']['logo']) {
        let image_url = data['future-supplier']['supplyDetails']['logo']['uri'];
        $('#supplier-logo').attr("src",image_url);
    }
    
    autofillFieldDecimal(data['future-supplier'], "expectedAnnualSavings", '.save-amount'); 
   if ('expectedAnnualSpend' in data['future-supplier']) {
        let anual_spend = parseFloat(data['future-supplier']['expectedAnnualSpend']);
        anual_spend = anual_spend / 12;
        anual_spend = anual_spend.toFixed(2);
        $('.cost-amount').text('£' + anual_spend);
    }
    
    autofillField(data['future-supplier']['supplier'], "name", ".supplier-name");
    autofillField(data['future-supplier']['supplyDetails'], "name", ".tariff-name");
    autofillField(data['future-supplier'], "tariffType", ".tariff-type");
    autofillField(data['future-supplier-details']['supplies'][0]['supplierTariff']['paymentMethod'], "name", ".payment-method");
    
    
    $("#time-at-supply-address").focusout(function() {
        let months = parseInt($(this).val()); 
            if (months < parseInt(data['addressHistoryMonthsRequired'])) {
                showError("You must have been at this address for " + data['addressHistoryMonthsRequired'] + " months in order to switch with us");
            }
    });
    

    $('input[name=firstPreviousAddressWasOverseas]').change(function() {
        let value = $(this).val();
        if (value === "true") {
            $('#previous-address-search').addClass('hide-element');
        } else {
            $('#previous-address-search').removeClass('hide-element');
        }
    });
    
    
    let exitFee = 0;
    $.each(data['future-supplier-details']['supplies'], function(index, value) {
        
        if (value['fuel'] === "electricity") {
            autofillField(value['supplierTariff'], "standingCharge", '.electricity-standing-charge');
            autofillField(value['supplierTariff'], "unitCharge", '.electricity-unit-rate');
            if ('exitFees' in value['supplierTariff']) {
                exitFee += parseInt(value['supplierTariff']['exitFees']);
            }
        }
        
        if (value['fuel'] === "gas") {
            autofillField(value['supplierTariff'], "standingCharge", '.gas-standing-charge');
            autofillField(value['supplierTariff'], "unitCharge", '.gas-unit-rate');
            if ('exitFees' in value['supplierTariff']) {
                exitFee += parseInt(value['supplierTariff']['exitFees']);
            }
        }
        
    });
    $('.exit-fee').text('£' + exitFee);
    $('[data-toggle="tooltip"]').tooltip();
    
    $('.regex-input').on('input',function(){
        
        this.reportValidity();
    });

    
    
    
    
    
    $.each(data['data-template']['groups'], function(index, value) {
        if (value['tags'] === "BankDetails") {
            if ("statements" in value) {
                $.each(value['statements'], function(_index, _value) {     
                    if ("reference" in _value && "link" in _value) {
                                   
                        if (_value['reference'] === "/statement/direct-debit-instruction") {
                            if ("uri" in _value['link']) {
                                let statement_uri = 'proxy.php?csurl=' + _value['link']['uri'];
                                $.ajax({
                                    url: statement_uri,
                                    type:"GET",
                                    async: true,
                                    dataType:"html",
                                    success: function(_statement){
                                        let instructions = _statement.replace('Direct Debit Guarantee', '<a href="#" id="show-direct-modal">Direct Debit Guarantee</a>');

                                        $('#direct-debit-instructions').html(instructions);
                                    }
                                });
                            }
                        }
                        
                        
                        if (_value['reference'] === "/statement/direct-debit-guarantee") {
                            if ("uri" in _value['link']) {
                                let statement_uri = 'proxy.php?csurl=' + _value['link']['uri'];
                                $.ajax({
                                    url: statement_uri,
                                    type:"GET",
                                    async: true,
                                    dataType:"html",
                                    success: function(_statement){
                                        $('#modal-body').html(_statement);
                                    }
                                });
                            }
                        }
                        
                        
                        
                        
                        if (_value['reference'] === "/statement/direct-debit-bank-account-logo") {
                            if ("uri" in _value['link']) {
                                let logo_uri = _value['link']['uri'];
                                $('#direct-debit-logo').css('background-image', 'url("' + logo_uri + '")');
                            }
                        }
  
                    }  
                });
            }
        }
    });
    
    
    
    
    $(document).on('click tap touchstart', '#show-direct-modal', function (event) {
        event.preventDefault();
        $('#guarantee-modal').modal('show');
    });
    
    
    
    $(document).on('click tap touchstart', '#tariff-details-expand', function (event) {
        $('#supply-address').val(null);
    });
    
    
    $(document).on('click tap touchstart', '#confirm-modal-button', function (event) {
        event.preventDefault();
        if ($('#confirm-switch-tick:checked').length > 0) {
             $.each(confirm_data['data-template']['groups'], function(index, value) {
                if (value['name'] === "confirmSwitch") {
                    $.each(value['items'], function(_index, _value) {
                        if (_value['name'] === "confirm") {
                            _value['data'] = true;
                        }
                    });
                }
            });
               
            $.ajax({
                url: endpoint + "/switch/confirm",
                type:"POST",
                data:JSON.stringify(confirm_data),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(confirm_response){
                    if (!confirm_response.hasOwnProperty("errors")) {
                        sessionStorage.removeItem("supplier-template");
                        sessionStorage.removeItem("usage-template");
                        sessionStorage.setItem("next", JSON.stringify(confirm_response));
                        window.location.replace("../../switch/3/");
                    }
                }
            });
        }
         
    });
    
    
    $(document).on('click tap touchstart', '#confirm-switch', function (event) {
        
        let failed = false;
        let error = "";
        let dob = "";
        
        if ($('#b-dd').val().length == 0 || $('#b-mm').val().length == 0 || $('#b-yyyy').val().length == 0) {
            failed = true;
            error = "please provide a valid date of birth";
        } else {
            dob = $('#b-yyyy').val() + "-" + $('#b-mm').val() + "-" + $('#b-dd').val();
        }
        
        
        if ("addressHistoryMonthsRequired" in data) {
            let months = parseInt($("#time-at-supply-address").val()); 
            if (months < parseInt(data['addressHistoryMonthsRequired'])) {
                failed = true;
                error = "You must have been at your supply address for " + data['addressHistoryMonthsRequired'] + " months in order to switch with us"
            } else if ($("#time-at-supply-address").val().length == 0) {
                failed = true;
                error = "Please enter how many months you have lived at the supply address";
                
            } else {

                if ($('#supply-address').val() == null) {
                    if ($('[data-id="addressLine1"]').val().length > 0) {
                        
                        $.each(data['data-template']['groups'], function(index, value) {
                            if (value['name'] === "addressHistoryWithOverseasOption") {
                                $.each(value['items'], function(_index, _value) {
                                    
                                    if(_value['name'] === "firstPreviousAddressWasOverseas") {
                                        _value['data'] = "false";
                                    }
                                            
                                    if(_value['name'] === "firstPreviousPostcode") {
                                        _value['data'] = $('[data-id="postcode"]').val();
                                    }
                                    
                                    if(_value['name'] === "firstPreviousFlatNumber") {
                                        _value['data'] = $('[data-id="flatNumber"]').val();
                                    }
                                    
                                    if(_value['name'] === "firstPreviousHouseNumber") {
                                        _value['data'] = $('[data-id="houseNumber"]').val();
                                    }
                                    
                                    if(_value['name'] === "firstPreviousHouseName") {
                                        _value['data'] = $('[data-id="houseName"]').val();
                                    }
                                    
                                    if(_value['name'] === "firstPreviousAddressLine1") {
                                        _value['data'] = $('[data-id="addressLine1"]').val();
                                    }
                                    
                                    if(_value['name'] === "firstPreviousAddressLine2") {
                                        _value['data'] = $('[data-id="addressLine2"]').val();
                                    }
                                    
                                    if(_value['name'] === "firstPreviousTown") {
                                        _value['data'] = $('[data-id="town"]').val();
                                    }
                                
                                    if(_value['name'] === "firstPreviousCounty") {
                                        _value['data'] = $('[data-id="county"]').val();
                                    }
                            
                                    if(_value['name'] === "timeAtSupplyAddress") {
                                        _value['data'] = months;
                                    }
 
                                });
                            }
                        });
                        
                        

                    } else {
                        failed = true;
                        error = 'Please either select your address from the dropdown or provide it in the "cant find your address"';
                    }
                } else {
                    
                    $.each(data['data-template']['groups'], function(index, value) {
                        
                        if (value['name'] === "addressHistoryWithOverseasOption") {
                            $.each(value['items'], function(_index, _value) {

                                if(_value['name'] === "firstPreviousAddressWasOverseas") {
                                    _value['data'] = "false";
                                }

                                if(_value['name'] === "knownfirstPreviousAddress") {
                                    _value['data'] = $('#supply-address').val();
                                }
                                
                                if(_value['name'] === "timeAtSupplyAddress") {
                                    _value['data'] = months;
                                }

                            });
                        }
                    });

                } 
            }
        } 

        if (failed == false) {
        
            $.each(data['data-template']['groups'], function(index, value) {
                
                
             if (value['name'] !== "addressHistoryWithOverseasOption") {
           
                $.each(value['items'], function(_index, _value) {


                    if (_value['name'] === "communicationType") {
                        if ("acceptableValues" in _value) { //needs a select box       
                            $.each(_value['acceptableValues'], function(__index, __value) {
                                let data_name = '[data-id="com-' + __value['id'] + '"]:checked';                     
                                if ($(data_name).length > 0) {
                                    _value['data'].push(__value['id']);
                                }
                            });
                        }
                        
                        
                        

                    } else if (_value['name'] === "dateOfBirth") {
                            _value['data'] = dob;
                            console.log("");
                    } else {
                    
                    
                    

                        let name = _value['name'];
                        let data_name = '[data-id="' + name + '"]';
                        let circles_name = 'input[name=' + name + ']:checked';

                        if ($(data_name).length > 0) {
                            let validated = false;
                            let populated = false;
                            
                            if ($(data_name).val().length > 0) {
                                populated = true;
                            } else {
                                populated = false;
                            }
                            
                            if (value['name'] === "supplyAddress") {
                                populated = true;
                            }

                            if ($(data_name).hasClass("regex-input")) {
                                let $this = $(data_name);
                                if ($this.get(0).reportValidity() == true && populated == true) {
                                    validated = true;
                                }
                            } else {
                                validated = true;
                            }

                            if (validated == true) {
                                if (_value['name'] === "preferredPaymentDay") {
                                    _value['data'] = $(data_name).val();
                                } else {
                                    _value['data'] = $(data_name).val();
                                }
                            } else {
                                failed = true;
                                error = 'Please answer the following question: "' + _value['prompt'] + '"';
                            }
                        }
                        if ($(circles_name).length > 0) {
                            if ($(circles_name).val().length > 0) {
                                _value['data'] = $(circles_name).val();
                            }
                        }
                    }

                });
        
            }
        });
        
        }
        
        
        if (failed == true) {
            showError(error);
        } else {
            
            let post_template = data;
            post_template['future-supplier'] = null;
            post_template['future-supplier-details'] = null;
            post_template['supplierPreferredPaymentDays'] = null;
            post_template['supplyAddressSearchResults'] = null;
            
            $.ajax({
                url: endpoint + "/switch",
                type:"POST",
                data:JSON.stringify(post_template),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(confirm_template){
                    if (!confirm_template.hasOwnProperty("errors")) {
                        confirm_data = confirm_template;
                        console.log(confirm_data);
                        
                        $.each(confirm_data['data-template']['groups'], function(index, value) {
                            if (value['name'] === "confirmSwitch") {
                                let statement_uri = 'proxy.php?csurl=' + value['statements'][0]['link']['uri'];
                                $.ajax({
                                    url: statement_uri,
                                    type:"GET",
                                    async: true,
                                    dataType:"html",
                                    success: function(_statement){
                                        $('#confirm-modal-body').html(_statement);
                                        $('#confirm-modal').modal('show');
                                    }
                                });
                            }
                            
                        });
  
                        
                    } else {
                        showError(confirm_template['errors'][0]['message']['text']);
                    }
                }
            });
        }
         
    });
    
});
    
    
    
    


function buildQuestion(question, container, guidance) {
    let container_element = '#' + container;
    let identifier = '[data-id="' + question['name'] + '"]';
    
    if (!$(container_element).length) {
        container_element = '#AdditionalInformation';
    }
    
    
    if ($(container_element).length && $(identifier).length == 0) {
        
        if (question['type'] === "bool") {
            let element = [];
                element.push('<div class="row question-row">');
                element.push('<div class="col-11">');
            
                if (long_questions.indexOf(question['name']) > -1) {
                    element.push('<h6>' + question['prompt'] + '</h6>');
                } else {
                    element.push('<h5>' + question['prompt'] + '</h5>');
                }
                element.push('</div>');
                
            
                if (guidance !== null && guidance[0] !== undefined) {
                    element.push('<div class="col-1 text-right"><span>');
                    element.push('<button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="' + guidance[0]['statement'] +'">');
                    element.push('<i class="far fa-question-circle"></i>');
                    element.push('</button>');
                    element.push('</span>');
                    element.push('</div>');

                }
            
            
                element.push('<div class="form-check">');
                element.push('<div class="row">');
                element.push('<div class="col-6 col-md-2">');
                element.push('<input id="' + question['name'] + 'true" class="display-hide button-fill" type="radio" name="' + question['name'] + '" value="true">');
                element.push('<label for="' + question['name'] + 'true" class="btn btn-primary type-button round-button-circle"><span>Yes</span></label>');
                element.push('</div>');
                element.push('<div class="col-6 col-md-2">');
                element.push('<input id="' + question['name'] + 'false" class="display-hide button-fill" type="radio" name="' + question['name'] + '" value="false" checked>');
                element.push('<label for="' + question['name'] + 'false" class="btn btn-primary type-button round-button-circle"><span>No</span></label>');
                element.push('</div>');
                element.push('</div>');
                element.push('</div>');
                element.push('</div>');
                element = element.join("");
                $(container_element).append(element);
  
        } else if (question['name'] === "communicationType") {
            let element = [];
                element.push('<div class="row question-row">');
                element.push('<div class="col-11">');
            
                if (long_questions.indexOf(question['name']) > -1) {
                    element.push('<h6>' + question['prompt'] + '</h6>');
                } else {
                    element.push('<h5>' + question['prompt'] + '</h5>');
                }
                element.push('</div>');
                if (guidance !== null && guidance[0] !== undefined) {
                    element.push('<div class="col-1 text-right"><span>');
                    element.push('<button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="' + guidance[0]['statement'] +'">');
                    element.push('<i class="far fa-question-circle"></i>');
                    element.push('</button>');
                    element.push('</span>');
                    element.push('</div>');

                }
                
            
                if ("acceptableValues" in question) { //needs a select box       
                    $.each(question['acceptableValues'], function(index, value) {
                        element.push('<div class="col-12 col-md-4">');
                        element.push('<div class="custom-control custom-checkbox">');
                        element.push('<input type="checkbox" data-id="com-' + value['id'] + '" class="custom-control-input" id="com-' + value['id'] + '">');
                        element.push('<label class="custom-control-label com-container" for="com-' + value['id'] + '"><span class="com-labels">' + value['name'] + '</span></label>');
                        element.push('</div>');
                        element.push('</div>');
                    });
                }
            
   
                element.push('</div>');
                element = element.join("");
                $(container_element).append(element);
            
            
        } else {
            
            
            if (question['name'] === "dateOfBirth") {
                return false;
            }

            let element = [];
                element.push('<div class="row question-row">');
                element.push('<div class="col-11">');
                if (long_questions.indexOf(question['name']) > -1) {
                    element.push('<h6>' + question['prompt'] + '</h6>');
                } else {
                    element.push('<h5>' + question['prompt'] + '</h5>');
                }
                element.push('</div>');

            if (guidance !== null && guidance[0] !== undefined) {
                element.push('<div class="col-1 text-right"><span>');
                element.push('<button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="' + guidance[0]['statement'] +'">');
                element.push('<i class="far fa-question-circle"></i>');
                element.push('</button>');
                element.push('</span>');
                element.push('</div>');

            }
                if (long_answers.indexOf(question['name']) > -1) {
                    element.push('<div class="col-12 col-md-7">');
                } else {
                    element.push('<div class="col-12 col-md-4">');
                }

                if ("acceptableValues" in question) { //needs a select box       
                    element.push('<label class="label-selector">');
                    element.push('<select data-id="' + question['name'] + '" class="form-control selector">');
                    $.each(question['acceptableValues'], function(index, value) {
                        element.push('<option value="' + value['id'] + '">' + value['name'] + '</option>');
                    });
                    element.push('</select>');
                    element.push('</label>');

                }  else { //is an input box                    
                    
                    if (question['name'] === "dateOfBirth") {
                        element.push('<input data-id="' + question['name'] + '" pattern="^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$" title="please provide a valid date of birth in YYYY-MM-DD format" placeholder="YYYY-MM-DD" type="text" class="form-control custom-input regex-input">');
                    } else if ("regularExpression" in question && "regularExpressionErrorMessage" in question) {
                        element.push('<input data-id="' + question['name'] + '" type="text" pattern="' + question['regularExpression'] + '" title="' + question['regularExpressionErrorMessage'] + '" class="form-control custom-input regex-input">');
                    } else {
                        element.push('<input data-id="' + question['name'] + '" type="text" class="form-control custom-input">');
                    }
                }      
                element.push('</div>');
                element.push('</div>');
                element = element.join("");
                $(container_element).append(element);
        }

    }
    
}



function showError(err) {
    $('#error-modal-body').text(err);
    $('#error-modal').modal('show');
}


function autofillField(path, field, selector) { 
    if (field in path) {
        $(selector).text(path[field]);
    }
}

function autofillFieldDecimal(path, field, selector) { 
    if (field in path) {
        let num = parseFloat(path[field]);
        num = num.toFixed(2);
        $(selector).text("£" + num);
    }
}