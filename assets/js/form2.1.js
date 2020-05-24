var title_cut_off = 100;
var months_required = 0;
var meter_details_exist = false;
var ignore = new Array("dateOfBirth", "supplyAddress", "correspondenceAddress", "addressHistoryWithOverseasOption", "coopMembership", "addressHistoryTwoPreviousAddresses", "addressHistoryOnePreviousAddress");
var _addressHistoryWithOverseasOption = false;

var data = null;
var questions = null;


var confirm_data = null;
var endpoint = "https://api.switchboo.com";
//var endpoint = "http://localhost:3000";


$('input').bind('invalid', function() {
  return false;
});



var containers;


//sort code     100000
//acc number    31510604


$(document).ready(function () {
    
    data = JSON.parse(sessionStorage.getItem("future-supplier"));
    questions = data['data-template']['groups'];
    console.log(data);
    parseStars(data);
    
    $('#supply-address').append('<option value="unknown">My address is not listed</option>');
    $.each(data['supplyAddressSearchResults'], function(index, value) {
        $('#supply-address').append('<option value="' + value['id'] + '">' + value['name'] + '</option>');
    });
    
    
    let bank_exists = false;
    $.each(questions, function(index, value) {
        if (value['tags'] === "BankDetails") {
           bank_exists = true;
        }
        
        if (value['name'] === "addressHistoryWithOverseasOption") {
            _addressHistoryWithOverseasOption = true;
        }
        
        if (value['tags'] === "MeterNumbers") {
            meter_details_exist = true;
        }
        
    });
    
    if (bank_exists == false) {
        $('#bank-container').addClass("hide-element");
    }
    
    
    if ("future-supplier-details" in data) {
        if ("links" in data['future-supplier-details']) {
            $.each(data['future-supplier-details']['links'], function(index, value) {
                if (value['rel'] === "/rels/domestic/supplier-terms-and-conditions") {
                    $('.s-t-c').attr("href", value['uri']);
                }
            });
        }
    }
    
    
    if (meter_details_exist == false) {
        $('#meter-container').addClass('hide-element');
    }
    
    /*
    question types
    
    select multiple values
    text input
    custom
    select two options
    select OR inputs
    */
    getSwitchHandleTable();
    
    $.each(questions, function(index, value) {
        let guidance = null;
        
        if ("guidance" in value) {
            if (value['guidance'][0] !== undefined) {
                if ("statement" in value['guidance'][0]) {
                    guidance = value['guidance'][0]['statement'];
                }
            }
        }
        
        if ("items" in value) {
            let container = "#" + value['tags'];
            $.each(value['items'], function(_index, _value) {
                try {
                    let identifier = '[data-id="' + _value['name'] + '"]';
                    let absolute_path = container + ' [data-id="' + _value['name'] + '"]';
                    
                    
                    if (container === "#MarketingPreferences" && _value['name'] === "communicationAllowed") {
                        value['data'] = false;
                        return true;
                    }
                    
                    if (container === "#AdditionalInformation" && _value['name'] === "consent") {
                        value['data'] = "No";
                        return true;
                    }
                    
                    
             
                    if (!("acceptableValues" in _value) && _value['type'] !== "bool") {            
                        //if its an input create the input
                        
                        if (container === "#MeterNumbers") {
                            //do nothing
                        } else if ($(absolute_path).length || $.inArray(value['name'], ignore) !== -1 || !("mandatory" in _value)) {
                            return true;
                        }
                        createInput(_value, container, guidance);

                               
                    } else if (isYesNo(_value) == true) {
                        //if its a yes/no create the circles and populate info
                        if ($(absolute_path).length || $.inArray(value['name'], ignore) !== -1 || !("mandatory" in _value)) {
                            return true;
                        }
                        createYesNo(_value, container, guidance);
                        
                    } else if (_value['type'] === "anyOf") {
                        //its a multiple select thing
                        if ($(absolute_path).length || $.inArray(value['name'], ignore) !== -1 || !("mandatory" in _value)) {
                            return true;
                        }
                        createAnyOf(_value, container, guidance);
  
                    } else {
                        //must be a select so check if it already exists
                        if ($(identifier).length) { //select exists
                            populateList(absolute_path, _value["acceptableValues"]);
                        } else { //select doesn't exist
                            createSelect(_value, container, guidance);
                        }
                    }



                } catch(error) {
                    console.error(error);
                }
            });
        
        }
        
    });
    
    
    function populateList(identifier, values) {
        console.log("populating " + identifier);
        if ($(identifier).length) {
            $.each(values, function(index, value) {
                $(identifier).append('<option value="' + value['id'] + '">' + value['name'] + '</option>');
            });
        }
    }
    
    
    function createYesNo(question, container, statement) {
        console.log("creating yes/no " + question['prompt']);
        let title = buildTitle(question, statement);
        let element = [];
        element.push('<div class="row question-row">');
        element.push(title);
        
        element.push('<div class="form-check">');
        element.push('<div class="row">');
        
        
        
        
        if ("acceptableValues" in question) {
            if (question['acceptableValues'].length == 2) {
                let q_name = question['name'];
                let q_val_one = question['acceptableValues'][0];
                let q_id_one = q_name + q_val_one['id'];
                let q_val_two = question['acceptableValues'][1];
                let q_id_two = q_name + q_val_two['id'];
                
                element.push('<div class="col-6 col-md-2">');
                element.push('<input id="'+ q_id_one +'" class="display-hide button-fill" type="radio" name="' + q_name + '" value="'+ q_val_one['id'] +'">');
                element.push('<label for="' + q_id_one + '" class="btn btn-primary type-button round-button-circle">');
                element.push('<span>' + q_val_one['name'] + '</span>');
                element.push('</label>');
                element.push('</div>');
                           
                element.push('<div class="col-6 col-md-2">');
                element.push('<input id="'+ q_id_two +'" class="display-hide button-fill" type="radio" name="' + q_name + '" value="'+ q_val_two['id'] +'" checked>');
                element.push('<label for="' + q_id_two + '" class="btn btn-primary type-button round-button-circle">');
                element.push('<span>' + q_val_two['name'] + '</span>');
                element.push('</label>');
                element.push('</div>');    
                
            }
        }
        
        
        
        
        
        if ("type" in question) {
            if (question['type'] === "bool") {
                let q_name = question['name'];
                
                element.push('<div class="col-6 col-md-2">');
                element.push('<input id="'+ q_name +'true" class="display-hide button-fill" type="radio" name="' + q_name + '" value="true">');
                element.push('<label for="' + q_name + 'true" class="btn btn-primary type-button round-button-circle">');
                element.push('<span>Yes</span>');
                element.push('</label>');
                element.push('</div>');
                           
                element.push('<div class="col-6 col-md-2">');
                element.push('<input id="'+ q_name +'false" class="display-hide button-fill" type="radio" name="' + q_name + '" value="false" checked>');
                element.push('<label for="' + q_name + 'false" class="btn btn-primary type-button round-button-circle">');
                element.push('<span>No</span>');
                element.push('</label>');
                element.push('</div>');    
                
            }
        }
        
         
        
        
        element.push('</div>');
        element.push('</div>');
        element.push('</div>');
        
        
        if (!($(container).length)) {
            $("#AdditionalInformation").append(element.join(""));
        } else {
            $(container).append(element.join(""));
        }
        
    }
    

    function createAnyOf(question, container, statement) {
        console.log("creating anyOf " + question['prompt']);
        let title = buildTitle(question, statement);
        let element = [];
        element.push('<div class="row question-row" id="' + question['name'] + '">');
        element.push(title);
        $.each(question['acceptableValues'], function(index, value) {
            
            if (value['name'] !== "Text") {       
                element.push('<div class="col-12 col-md-4">');
                element.push('<div class="custom-control custom-checkbox">');
                element.push('<input type="checkbox" data-id="' + value['id'] + '" class="custom-control-input" id="'+ value['id'] +'">');
                element.push('<label class="custom-control-label com-container" for="'+ value['id'] +'">');
                element.push('<span class="com-labels">' + value['name'] + '</span>');
                element.push('</label>');
                element.push('</div>');
                element.push('</div>');
            }
        
        });
        
        element.push('</div>');
        
        if (!($(container).length)) {
            $("#AdditionalInformation").append(element.join(""));
        } else {
            $(container).append(element.join(""));
        }
        
    }
    

    
    
    function createSelect(question, container, statement) {
        console.log("creating select " + question['prompt']);
        let title = buildTitle(question, statement);
        let element = [];
        element.push('<div class="row question-row">');
        element.push(title);
        
        element.push('<div class="col-12 col-md-6 col-lg-4">');
        element.push('<label class="label-selector">');
        element.push('<select data-id="' + question['name'] + '" class="form-control selector">');
        element.push('<option value="null">Please select</option>');
        $.each(question['acceptableValues'], function(index, value) {
            element.push('<option value="' + value['id'] + '">' + value['name'] + '</option>');
        
        });
        element.push('</label>');
        element.push('</div>');
        element.push('</div>');
        
        if (!($(container).length)) {
            $("#AdditionalInformation").append(element.join(""));
        } else {
            $(container).append(element.join(""));
        }
        
    }
    
    
    function isYesNo(question) {
        rtn = false;
        
        if ("acceptableValues" in question) {
            if (question['acceptableValues'].length == 2) {
                rtn = true;
            }
        }
        
        if ("type" in question) {
            if (question['type'] === "bool") {
                rtn = true;
            }
        }
        
        return rtn;
    }
    
    
    function createInput(question, container, statement) {
        console.log("creating input " + question['prompt']);
        
        let element = [];
        let title = buildTitle(question, statement);
        element.push('<div class="row question-row" id="' + question['name'] + '">');
        element.push(title);
        element.push('<div class="col-12 col-md-6 col-lg-4">');
        
        if ("regularExpression" in question) {
            element.push('<input data-id="' + question['name'] + '" type="text" class="form-control custom-input" pattern="' + question['regularExpression'] + '" title="' + question['regularExpressionErrorMessage'] + '">');
        } else {
            element.push('<input data-id="' + question['name'] + '" type="text" class="form-control custom-input">');
        }
        element.push('</div>');
        element.push('</div>');  
        
        if (!($(container).length)) {
            $("#AdditionalInformation").append(element.join(""));
        } else {
            $(container).append(element.join(""));
        }
    }
    
    
    
    function buildTitle(value, statement) {
        let rtn = [];
        try {
            rtn.push('<div class="col-11">');
            if (value['prompt'].length >= title_cut_off) {
                rtn.push("<p>" + value['prompt'] + "<p>");
            } else {
                rtn.push("<h5>" + value['prompt'] + "</h5>");
            }
            rtn.push('</div>');
            
            if (statement != null) {
                rtn.push('<div class="col-1 text-right icon-pull-right">');
                rtn.push('<span>');
                rtn.push('<button type="button" class="btn btn-secondary btn-tooltip" data-toggle="tooltip" data-placement="right" title="' + statement + '">');
                rtn.push('<i class="far fa-question-circle" aria-hidden="true"></i>');
                rtn.push('</button>');
                rtn.push('</span>');
                rtn.push('</div>');
            }
            
        rtn = rtn.join("");
        } catch (e) {
            console.log(e);
        }
        return rtn;
    }
    
function parseStars(value) {
    $('.star-container').empty();
    let rtn = "";
    let star = '<i class="fas fa-star dark-star"></i>';
    let grey_star = '<i class="fas fa-star light-star"></i>';
    
    let html = [];
    let amount = value['future-supplier']['supplier']['serviceStarRating'];

    for (i = 0; i < amount; i++) {
      html.push(star);
    }

    for (i = 0; i < 5 - amount; i++) {
      html.push(grey_star);
    }
    rtn = html.join("");
    $('.star-container').html(rtn);
}

  
    
    
    if ("expectedAnnualSpend" in data['future-supplier']) {
        let num = parseFloat(data['future-supplier']["expectedAnnualSpend"]);
        let num_month = num / 12;
        num_month = num_month.toFixed(0);
        num = num.toFixed(0);
        $('.spend-yearly').text("£" + num);
        $('.spend-monthly').text("£" + num_month);
    }
    
    
    if ("uri" in data['future-supplier']['supplyDetails']['logo']) {
        let image_url = data['future-supplier']['supplyDetails']['logo']['uri'];
        $('.supplier-logo').attr("src",image_url);
    }
    
    if ("expectedAnnualSavings" in data['future-supplier']) {
        if (parseInt(data['future-supplier']['expectedAnnualSavings']) < 0) {
            showError("You can't save money right now", "Check back in a few months time or switch now and save next year.");
        }
    }
    
    autofillFieldDecimal(data['future-supplier'], "expectedAnnualSavings", '.save-amount'); 
   if ('expectedAnnualSpend' in data['future-supplier']) {
        let anual_spend = parseFloat(data['future-supplier']['expectedAnnualSpend']);
        anual_spend = anual_spend / 12;
        anual_spend = anual_spend.toFixed(2);
        $('.cost-amount').text('£' + anual_spend);
    }
    
    $('.more-info').attr('data-id', getTariffID(data['future-supplier']));
    $('.more-info').attr('data-uri', getDetailsLink(data['future-supplier']));
    autofillField(data['future-supplier']['supplier'], "name", ".supplier-name");
    autofillField(data['future-supplier']['supplyDetails'], "name", ".tariff-name");
    autofillField(data['future-supplier'], "tariffType", ".tariff-type");
    autofillField(data['future-supplier-details']['supplies'][0]['supplierTariff']['paymentMethod'], "name", ".payment-method");
    
    if ("durationWithCurrentSupplierInMonths" in data['future-supplier']) {
        $('.tariff-length').text("Fixed for " + data['future-supplier']["durationWithCurrentSupplierInMonths"] + " months");
        $('.new-tariff-length').text(data['future-supplier']["durationWithCurrentSupplierInMonths"] + " months");
    } else {
        $('.tariff-length').text("Variable tariff");
    }
    

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
    
    
    $('input').on('input',function(){  
        if ($(this).attr("pattern") != undefined) {
            if (this.reportValidity() === true && $(this).val() !== "") {
                $(this).css('background-image', 'url(../../assets/images/checkmark.png)');
            } else {
                $(this).css('background-image', 'url(../../assets/images/delete-sign.png)');
            }
        }
    });
    
    
    $("#timeAtSupplyAddressYears").focusout(function() {
        if ($("#timeAtSupplyAddressYears").val() !== "") {
            let months = parseInt($(this).val()) * 12;
            let num = 0;
            if ($('#timeAtSupplyAddressMonths').val() !== "") {
                num = parseInt($('#timeAtSupplyAddressMonths').val());
            }
            num = num + months;
            console.log("time at supply address: " + num);
            $('#timeAtSupplyAddress').val(num)

            if (num < 36) {   
                $('#previous-address-container').removeClass("hide-element");
            } else {
                $('#previous-address-container').addClass("hide-element");
            }
        }
    });
    
    
    
    $("#timeAtSupplyAddressMonths").focusout(function() {
        if ($("#timeAtSupplyAddressYears").val() !== "") {
            let months = 0;
            if ($(this).val() !== "") {
                months = parseInt($(this).val());
            }
            let num = 0;
            if ($('#timeAtSupplyAddressYears').val() != "") {
                num = parseInt($('#timeAtSupplyAddressYears').val() * 12);
            }
            num = num + months;
            console.log("time at supply address: " + num);
            $('#timeAtSupplyAddress').val(num)

            if (num < 36) {   
                $('#previous-address-container').removeClass("hide-element");
            } else {
                $('#previous-address-container').addClass("hide-element");
            }
        }
    });
    
    
    $("#timeAtPreviousAddressYears").focusout(function() {
        if ($("#timeAtPreviousAddressYears").val() !== "") {
            let years = parseInt($(this).val() * 12)
            let months = 0;
            if ($('#timeAtPreviousAddressMonths').val() !== "") {
                months = parseInt($('#timeAtPreviousAddressMonths').val());
            }
            months = months + years;
            $('#timeAtPreviousAddress').val(months);
            console.log("time at previous address:" + months);
            let previousMonths = parseInt($("#timeAtSupplyAddress").val());
            previousMonths = previousMonths + months;
            console.log("time at previous address and first address: " + previousMonths);
            if (previousMonths < 36) {   
                $('#second-previous-address-container').removeClass("hide-element");
            } else {
                $('#second-previous-address-container').addClass("hide-element");
            }
        }
    });
    
    
    
    $("#timeAtPreviousAddressMonths").focusout(function() {
        if ($("#timeAtPreviousAddressYears").val() !== "") {
            let months = "";
            if ($(this).val() !== "") {
                months = parseInt($(this).val());   
            }
            let years = 0;
            if ($('#timeAtPreviousAddressYears').val() !== "") {
                years = parseInt($('#timeAtPreviousAddressYears').val() * 12);
            }
            months = months + years;
            $('#timeAtPreviousAddress').val(months);
            console.log("time at previous address:" + months);
            let previousMonths = parseInt($("#timeAtSupplyAddress").val());
            previousMonths = previousMonths + months;
            console.log("time at previous address and first address: " + previousMonths);
            if (previousMonths < 36) {   
                $('#second-previous-address-container').removeClass("hide-element");
            } else {
                $('#second-previous-address-container').addClass("hide-element");
            } 
        }
    });
    
    
    let gasmeterhtml = '<div id="gasSmeterWarning" class="row"><div class="col-12 col-md-8"><p>If you have a smart meter, your new supplier may not be able to operate this in the same way as your current provider, this means that you may lose some smart meter services.</p></div></div>';
    let elecmeterhtml = '<div id="elecSmeterWarning" class="row"><div class="col-12 col-md-8"><p>If you have a smart meter, your new supplier may not be able to operate this in the same way as your current provider, this means that you may lose some smart meter services.</p></div></div>';
    $('input[name=hasGasSmartMeter]').change(function() {
        if ($(this).val() === "Yes" && $('#gasSmeterWarning').length === 0) {
            let form_check = $(this).closest('.form-check');
            $(form_check).append(gasmeterhtml);
        } else {
            $('#gasSmeterWarning').remove();
        }
    });
    
    $('input[name=hasElectricitySmartMeter]').change(function() {
        if ($(this).val() === "Yes" && $('#elecSmeterWarning').length === 0) {
            let form_check = $(this).closest('.form-check');
            $(form_check).append(elecmeterhtml);
        } else {
            $('#elecSmeterWarning').remove();
        }
        
    });
    
    $("#PreviousPostcode").focusout(function() {
        let postcode = $(this).val();
        handleReturnAddress(postcode, "#previous-address");
        $('.address-two').removeClass('hide-element');
    });
    
    
    $("#SecondPreviousPostcode").focusout(function() {
        let postcode = $(this).val();
        handleReturnAddress(postcode, "#second-previous-address");
        $('.address-three').removeClass('hide-element');
    });
    
    
    $('#supply-address').on('change', function() {
        try {
            let address = $(this).val();    
            
            if (address === "unknown") {
                $('#supplyNotFound').removeClass('hide-element');
                if (meter_details_exist == true) {
                    $('#meter-container').removeClass("hide-element");
                    $('#electricityMeterNumber').removeClass("hide-element");
                    $('#meterNumber').removeClass("hide-element");
                }
            } else {
                $('input[data-id="supplyNameNum"]').val("");
                $('input[data-id="supplyFirstLine"]').val("");
                $('#supplyNotFound').addClass('hide-element');
            }
            
                
            
            
            if (address != null && meter_details_exist == true && address !== "unknown") {
                let meter_split = address.split("||||");
                meter_split = meter_split[1].split("|");

                let electricity = meter_split[1];
                let gas = meter_split[2];


                if (electricity === "ElecM" && gas === "GasM") {
                    $('#meter-container').addClass("hide-element");
                } else {
                    $('#meter-container').removeClass("hide-element");
                }


                if (electricity === "NoElecM") { //dont know electriciy num
                    $('#electricityMeterNumber').removeClass("hide-element");
                } else { //do know electricity num
                    $('#electricityMeterNumber').addClass("hide-element");
                }

                if (gas === "NoGasM") { //dont know gas num
                    $('#meterNumber').removeClass("hide-element");
                } else { //do know gas num
                    $('#meterNumber').addClass("hide-element");
                }
                
                
                if ("addressHistoryMonthsRequired" in data) {
                    $('#supply-time').removeClass("hide-element");
                }

            }
        } catch (e) {
            console.log(e);
        } 
    });
    
    
    
    $('#previous-address').on('change', function() {
        try {
            let address = $(this).val();    
            
            if (address === "unknown") {
                $('#firstNotFound').removeClass('hide-element');
            } else {
                $('#firstNotFound').addClass('hide-element');
                $('input[data-id="firstNameNum"]').val("");
                $('input[data-id="firstFirstLine"]').val("");
            }
        } catch (e) {
            console.log(e);
        } 
    });
    
    
    $('#second-previous-address').on('change', function() {
        try {
            let address = $(this).val();    
            
            if (address === "unknown") {
                $('#secondNotFound').removeClass('hide-element');
            } else {
                $('input[data-id="secondNameNum"]').val("");
                $('input[data-id="secondFirstLine"]').val("");
                $('#secondNotFound').addClass('hide-element');
            }
        } catch (e) {
            console.log(e);
        } 
    });

    $(document).on('click tap touchstart', '#show-direct-modal', function (event) {
        event.preventDefault();
        $('#guarantee-modal').modal('show');
    });
        
    
    $(document).on('click tap touchstart', '#confirm-switch', function (event) {
        sendSwitch();
    });
    
    
    if ($('input[data-id="emailAddress"]').length) {
        if (sessionStorage.hasOwnProperty('email')) {
            $('input[data-id="emailAddress"]').val(sessionStorage.getItem("email"));
        }
    }

    $(document).on('click tap touchstart', '#tariff-details-expand', function (e) {
        if ($(this).hasClass('collapsed')) {
            $('#exxpandor').text("More info");
            $('#form-expand-arrow .fas').removeClass("fa-chevron-down");
            $('#form-expand-arrow .fas').addClass("fa-chevron-right");
        } else {
            $('#form-expand-arrow .fas').removeClass("fa-chevron-right");
            $('#form-expand-arrow .fas').addClass("fa-chevron-down");
            $('#exxpandor').text("Less info");
        }
    });
    
    $('#b-dd').on('input', function() {
        if ($(this).val().length > 1) {
            $("#b-mm").focus();
        }
    });
    
    $('#b-mm').on('input', function() {
        if ($(this).val().length > 1) {
            $("#b-yyyy").focus();
        }
    });
    
    
    $('input').bind('invalid', function() {
      return false;
    });
    
});



function showError(title, err) {
    $('#error-modal-title').text(title);
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


function getSwitchHandleTable() {
    let uri = "";
    
    $.each(data['links'], function(index, link) {
        if (link['rel'] === "/rels/domestic/switch") {
            uri = link['uri'];
        }
    });
    
    
    if (uri !== "") {
        let uri_ = 'proxy.php?csurl=' + uri;
        $.ajax({
            url: uri_,
            type:"GET",
            async: true,
            dataType:"json",
            success: function(result){
                console.log("1");
                console.log(result);
                
                if ("currentSupply" in result) {
                    
                    if ("electricity" in result['currentSupply']) {
                        
                        if ("supplier" in result['currentSupply']['electricity']) {
                            $('.t-e-old-supplier-name').text(result['currentSupply']['electricity']['supplier']['name']);
                        }
                        
                        if ("supplierTariff" in result['currentSupply']['electricity']) {
                            $('.t-e-old-tariff-name').text(result['currentSupply']['electricity']['supplierTariff']['name']);
                        }
                    }
                    
                    
                    if ("gas" in result['currentSupply']) {
                        
                        if ("supplier" in result['currentSupply']['gas']) {
                            $('.t-g-old-supplier-name').text(result['currentSupply']['gas']['supplier']['name']);
                        }
                        
                        if ("supplierTariff" in result['currentSupply']['gas']) {
                            $('.t-g-old-tariff-name').text(result['currentSupply']['gas']['supplierTariff']['name']);
                        }
                    }
                    
                    
                    if ("details" in result['currentSupply']) {
                        let details_uri = result['currentSupply']['details']['uri'];
                        
                        if (details_uri !== "") {
                            let details_uri_ = 'proxy.php?csurl=' + details_uri;
                            $.ajax({
                                url: details_uri_,
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success: function(details){
                                    console.log("2");
                                    console.log(details);
                                if ("supplies" in details) {
                                    $.each(details['supplies'], function(index, supply) {
                                        let identifier = "g";
                                        if (supply['fuel'] === "electricity") {
                                            identifier = "e";
                                        }
                                        
                                        if ("supplierTariff" in supply) {
                                            
                                            if ("tariffType" in supply['supplierTariff']) {
                                                $('.t-' + identifier + '-old-tariff-type').text(supply['supplierTariff']['tariffType']);
                                            }
                                            
                                            if ("paymentMethod" in supply['supplierTariff']) {
                                                $('.t-' + identifier + '-old-payment-method').text(supply['supplierTariff']['paymentMethod']['name']);
                                            }
                                            
                                            
                                            if ("unitCharge" in supply['supplierTariff']) {
                                                $('.t-' + identifier + '-old-unit-rate').text(supply['supplierTariff']['unitCharge']);
                                            }
                                            
                                            if ("standingCharge" in supply['supplierTariff']) {
                                                $('.t-' + identifier + '-old-standing-charge').text(supply['supplierTariff']['standingCharge']);
                                            }
                                            
                                            if ("nightUnitCharge" in supply['supplierTariff']) {
                                                $('.t-e-old-nu-charge').text(supply['supplierTariff']['nightUnitCharge']);
                                            }
                                            
                                            
                                            
                                        }
                                        
                                        
                                        
                                        
                                        
                                    });
                                    
                                    
                                }    
                                    
                                    
                                    
                                }
                            });
                        }
                    }
                    
                    
                    
                    
                    if ("details" in result['futureEnergySupply']) {
                        let details_uri = result['futureEnergySupply']['details']['uri'];
                        
                        if (details_uri !== "") {
                            let details_uri_ = 'proxy.php?csurl=' + details_uri;
                            $.ajax({
                                url: details_uri_,
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success: function(details){
                                    console.log("3");
                                    console.log(details);
                                    
                                if ("supplies" in details) {
                                    $.each(details['supplies'], function(index, supply) {
                                        let identifier = "g";
                                        if (supply['fuel'] === "electricity") {
                                            identifier = "e";
                                        }
                                        
                                        if ("supplierTariff" in supply) {
                                            

                                            
                                            if ("paymentMethod" in supply['supplierTariff']) {
                                                $('.t-' + identifier + '-new-payment-method').text(supply['supplierTariff']['paymentMethod']['name']);
                                            }
                                            
                                            
                                            if ("unitCharge" in supply['supplierTariff']) {
                                                $('.t-' + identifier + '-new-unit-rate').text(supply['supplierTariff']['unitCharge']);
                                            }
                                            
                                            if ("standingCharge" in supply['supplierTariff']) {
                                                $('.t-' + identifier + '-new-standing-charge').text(supply['supplierTariff']['standingCharge']);
                                            }
                                            
                                            if ("nightUnitCharge" in supply['supplierTariff']) {
                                                $('.t-e-new-nu-charge').text(supply['supplierTariff']['nightUnitCharge']);
                                            }
                                        
                                    
                                        }
                                    });
                                    
                                    
                                }    
                                    
                                    
                                    
                                }
                            });
                        }
                    }
                    
                    
                    
                }
                
                
                
            }
        });
    }
}


function handleReturnAddress(postcode, element) {
    
    let _postcode = postcode;
    let _uri = null;
    $.each(data['linked-data'], function(index, value) {
        if (value['rel'] === "/rels/domestic/address-lookup") {
            _uri = value['uri'];
        }
    });
    
    if (_uri != null) {
        
        let template = {
            postcode: _postcode,
            uri: _uri
        };
        
        $.ajax({
            url: endpoint + "/functions/postcode",
            type:"POST",
            data:JSON.stringify(template),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(obj){
                $(element).empty();
                $(element).append('<option value="null">Please select your address</option>');
                $(element).append('<option value="unknown">My address is not listed</option>');
                $.each(obj, function(index, value) {
                    $(element).append('<option value="' + value['id'] + '">' + value['name'] + '</option>');
                });
            }
        });
    } else {
        console.log("failed to find postcode rel/uri");
    }
    
}


function postTemplate(ignoreErrors) {
    let post_template = data;
    //post_template['future-supplier'] = null;
    //post_template['future-supplier-details'] = null;
    post_template['supplierPreferredPaymentDays'] = null;
    post_template['supplyAddressSearchResults'] = null;
    post_template['email'] = sessionStorage.getItem("email");
    $.ajax({
        url: endpoint + "/switch",
        type:"POST",
        data:JSON.stringify(post_template),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(confirm_template){
            if (!confirm_template.hasOwnProperty("errors")) {
                sessionStorage.removeItem("supplier-template");
                sessionStorage.removeItem("usage-template");
                sessionStorage.setItem("next", JSON.stringify(confirm_template));
                window.location.replace("../../energy/4/");     
            } else {
                if (confirm_template['errors'][0]['message']['text'].includes("server error")) {
                    sessionStorage.removeItem("supplier-template");
                    sessionStorage.removeItem("usage-template");
                    sessionStorage.setItem("next", JSON.stringify(confirm_template));
                    window.location.replace("../../energy/3/");  
                } else {
                    showError("Error", confirm_template['errors'][0]['message']['text']);
                }
            } 
        }

    });
}


function updateAddress(val, name) {
    $.each(data['data-template']['groups'], function(index, value) {     
        if ("items" in value) {
            $.each(value['items'], function(_index, _value) {              
                if (_value['name'] === name) {
                    _value['data'] = val;
                    return false;
                }
            });
        }
    });
}


function handleAddressHistory() {
    try {
        let _okay = true;

        if ($('#supply-address').val() === "null" || $('#timeAtSupplyAddress').val() === "") {
            _okay = false;
        }

        if ($('#previous-address-container').hasClass('hide-element') == false) {
            if ($('#previous-address').val() === "null" || $('#timeAtPreviousAddress').val() === "") {
                _okay = false;
            }
        }

        if ($('#second-previous-address-container').hasClass('hide-element') == false) {
            if ($('#second-previous-address').val() === "null") {
                _okay = false;
            }
        }
             
        if (_okay == false) {
            return false;
        }
            
        
        $.each(data['data-template']['groups'], function(index, group) {        
            if ("items" in group) {
                $.each(group['items'], function(index, item) { 
                        
                    
                    
                    if (item['name'] === "timeAtSupplyAddress") {   
                        item['data'] = $('#timeAtSupplyAddress').val();
                    }


                    if (item['name'] === "knownAddress" && $('#supply-address').val() !== "unknown") {
                        item['data'] = $('#supply-address').val();
                    }
                    
                    if (item['name'] === "knownAddress" && $('#supply-address').val() === "unknown") {
                        item['data'] = "";
                    }
                    
                    if (item['name'] === "knownfirstPreviousAddress" && $('#previous-address').val() === "unknown") {
                        item['data'] = "";
                    }
                    
                    if (item['name'] === "knownSecondPreviousAddress" && $('#second-previous-address').val() === "unknown") {
                        item['data'] = "";
                    }
                    
                     if (item['name'] === "addressLine1" && $('#supply-address').val() !== "unknown") {
                         item['data'] = "";
                     }
                    
                     if (item['name'] === "flatNumber" && $('#supply-address').val() !== "unknown") {
                         item['data'] = "";
                     }
                    
                     if (item['name'] === "houseNumber" && $('#supply-address').val() !== "unknown") {
                         item['data'] = "";
                     }
                    
                     if (item['name'] === "houseName" && $('#supply-address').val() !== "unknown") {
                         item['data'] = "";
                     }
                    
                    
                    
                    
                    if (item['name'] === "addressLine1" && $('#supply-address').val() === "unknown" && group['name'] !== "correspondenceAddress") {
                        item['data'] = $('input[data-id="supplyFirstLine"]').val();
                    }
                    
                    
                    if (group['name'] === "supplyAddress" && $('#supply-address').val() === "unknown") {
                        
                        let supplyVal =  $('input[data-id="supplyNameNum"]').val();
                        if (isNumber(supplyVal)) {
                            if (item['name'] === "flatNumber" || item['name'] === "houseNumber") {
                                item['data'] = supplyVal;
                            }
                        } else {
                            if (item['name'] === "houseName") {
                                item['data'] = supplyVal;
                            }  
                        }
                    }
                    
                    
                   //if we have a first previous address
                   if ($('#previous-address-container').hasClass('hide-element') == false) {
                       
                       if ($('#previous-address').val() === "unknown") {
                           
                           if (item['name'] === "firstPreviousPostcode") {
                               item['data'] = $('#PreviousPostcode').val();
                           }
                           
                           if (item['name'] === "firstPreviousAddressLine1") {
                               item['data'] = $('input[data-id="firstFirstLine"]').val();
                           }
                           
                        
                            let supplyVal =  $('input[data-id="firstNameNum"]').val();
                            if (isNumber(supplyVal)) {
                                if (item['name'] === "firstPreviousFlatNumber" || item['name'] === "firstPreviousHouseNumber") {
                                    item['data'] = supplyVal;
                                }
                            } else {
                                if (item['name'] === "firstPreviousHouseName") {
                                    item['data'] = supplyVal;
                                }  
                            }
                               
                       } else { 
                           if (item['name'] === "knownfirstPreviousAddress") {
                                item['data'] = $('#previous-address').val();
                            }
                       } 
                   }
                    
                    
                    
                        
                    
                    
                    
                    if ($('#second-previous-address-container').hasClass('hide-element') == false) {
                        
                        if (item['name'] === "timeAtFirstPreviousAddress") {
                            item['data'] = $('#timeAtPreviousAddress').val();
                        }
                        
                       
                       if ($('#second-previous-address').val() === "unknown") {
                           
                           if (item['name'] === "secondPreviousPostcode") {
                               item['data'] = $('#SecondPreviousPostcode').val();
                           }
                           
                           if (item['name'] === "secondPreviousAddressLine1") {
                               item['data'] = $('input[data-id="secondFirstLine"]').val();
                           }
                           
                           
                           
                        
                            let supplyVal =  $('input[data-id="secondNameNum"]').val();
                            if (isNumber(supplyVal)) {
                                if (item['name'] === "secondPreviousFlatNumber" || item['name'] === "secondPreviousHouseNumber") {
                                    item['data'] = supplyVal;
                                }
                            } else {
                                if (item['name'] === "secondPreviousHouseName") {
                                    item['data'] = supplyVal;
                                }  
                            }
                               
                       } else { 
                           if (item['name'] === "knownfirstPreviousAddress") {
                                item['data'] = $('#previous-address').val();
                            }
                       } 
                   }

            

                    
                    
                    
                    if (group['name'] === "correspondenceAddress") {
                        if (item['name'] === "isSameAsSupplyAddress") {
                            item['data'] = true;
                        }
                    }
                    
                    
                    if (group['name'] === "addressHistoryWithOverseasOption") {
                        if (item['name'] === "firstPreviousAddressWasOverseas") {
                            item['data'] = false;
                        }  
                    }

                });
            }
        });
        
        
        
        
        
        
        
        return true;
    } catch (e) {
        return false;
    }

}


function sendSwitch() {
console.log("switch called");
    
    
    if (handleAddressHistory() == false) {
        showError("Error", "Issues with address history, Please check your answers");
        return false;
    }
    
    
    $.each(data['data-template']['groups'], function(index, value) {        
        if ("items" in value) {
            $.each(value['items'], function(_index, _value) {    
                
                
                if (value['name'] === "coopMembership") {
                    if (_value['name'] === "isMember") {
                        _value['data']= "No";
                        return true;
                    }
                    
                    if (_value['name'] === "join") {
                        _value['data']= "No";
                        return true;
                    }
                }
                
                
                if (_value['name'] === "dateOfBirth") {
                    _value['data'] = $('#b-yyyy').val() + "-" + $('#b-mm').val() + "-" + $('#b-dd').val();
                    return true;
                }
                
                
                if (_value['name'] === "communicationType") {
                    _value['data'] = [];
                    let elements = $('#communicationType input:checked');
                    $.each(elements, function(__index, element) { 
                        _value['data'].push($(element).attr('data-id'));
                    });
                    return true;
                }
                
                             
                if ($.inArray(value['name'], ignore) !== -1) {
                    return true;
                }
                
                
                let data_name = '[data-id="' + _value['name'] + '"]';
                if ($(data_name).length){
                    _value['data'] = $(data_name).val();
                }
                
                let name_name = 'input[name=' + _value['name'] + ']:checked';
                if ($(name_name).length) {
                    _value['data'] = $(name_name).val();
                }
                
                
            });
        }
        
    });
    
    console.log(data['data-template']);
    postTemplate(false);
    
    
}


function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }