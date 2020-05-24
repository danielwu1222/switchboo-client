var endpoint = "https://api.switchboo.com";
//var endpoint = "http://localhost:3000";

var data_template = null;
var post_template = null;
var gas_suppliers = new Array();
var electricity_suppliers = new Array();
var dual_suppliers = new Array();
var payment_methods = new Array();


var base = "../../assets/images/logos/";
var imgs = ["1200px-The_Co-operative_Energy_logo.svg.png", "15679582512.png", "igloo-energy.png", "1280px-Ovo_Energy_logo.svg.png", "Scottish-Power.png", "1200px-SSEenergy.svg.png", "508px-EON_Logo.svg.png", "1200px-British_Gas_logo.svg.png"];


$(document).ready(function () {
    
    

    
    data_template = JSON.parse(sessionStorage.getItem("supplier-template"));
    console.log(data_template);
    
    init();
    getSupplierListBoxValues("#select-dual-supplier", dual_suppliers, "Dual");
    getSupplierListBoxValues("#select-gas-supplier", gas_suppliers, "Single");
    getSupplierListBoxValues("#select-electricity-supplier", electricity_suppliers, "Single");
    
    getBigSix("#dual-supplier-image-container", dual_suppliers, "dual");
    getBigSix("#gas-supplier-image-container", gas_suppliers, "gas");
    getBigSix("#electricity-supplier-image-container", electricity_suppliers, "electricity");
    
    
    //row one buttons on change
    $('input[name=row_one_buttons]').change(function() {
        let energy_type = $(this).val();
        
        //if its the dual button clicked
        if (energy_type === "dual") {
            //if they have the same supplier else not
            showElement("#row-one-same-supplier");
            showElement("#row-6-gas");
            if (parseInt($('input[name=row_one_circles]:checked').val()) == 1) {
                showElement("#row-2");
                hideElement("#row-3");
                hideElement("#row-4");
            } else {
                hideElement("#row-2");
                showElement("#row-3");
                showElement("#row-4");
            } 
        }
        
        if (energy_type === "electricity") {
            hideElement("#row-one-same-supplier");
            hideElement("#row-2");
            hideElement("#row-3");
            showElement("#row-4");
            hideElement("#row-6-gas");
        }
        
        
    });
    
    //row one circle buttons on change
    $('input[name=row_one_circles]').change(function() {
        let value = parseInt($(this).val());
        
        if (value == 1) {
            showElement("#row-2");
            hideElement("#row-3");
            hideElement("#row-4");
        } else {
            hideElement("#row-2");
            showElement("#row-3");
            showElement("#row-4");
        }
        
    });
    
    
    $('input[name=row_gas_images]').change(function() {
        let value = parseInt($(this).val());
        $("#select-gas-supplier").val(value);
        $("#select-gas-supplier").trigger('change');
        
    });
    
    $('input[name=row_dual_images]').change(function() {
        let value = parseInt($(this).val());
        $("#select-dual-supplier").val(value);
        $("#select-dual-supplier").trigger('change');
        
    });
    
    $('input[name=row_electricity_images]').change(function() {
        let value = parseInt($(this).val());
        $("#select-electricity-supplier").val(value);
        $("#select-electricity-supplier").trigger('change');
        
    });
    
    //row five circles change
    $('input[name=row_five_circles]').change(function() {
        let value = parseInt($(this).val());
        
        if (value == 1) {
            showElement(".night-usage");
        } else {
            hideElement(".night-usage");
        }
    });
    
    
    $('#select-gas-use').on('change', function() {
        let value = $(this).val();
        
        if (value === "spend") {
            $('#gas-input').removeClass('input-no-border-right');
            $('#gas-input').addClass('input-no-border-left');
            hideElement("#gas-kwh");
            showElement("#gas-pound");
            
            $('#select-gas-per').empty();
            $('#select-gas-per').append('<option value="1">Monthly</option>');
            $('#select-gas-per').append('<option value="3">Yearly</option>');
            $('#select-gas-per').append('<option value="2">Quarterly</option>');
            
            
        } else {
            $('#gas-input').addClass('input-no-border-right');
            $('#gas-input').removeClass('input-no-border-left');
            hideElement("#gas-pound");
            showElement("#gas-kwh");
            
            $('#select-gas-per').empty();
            $('#select-gas-per').append('<option value="3">Yearly</option>');
            
        }
    });
    
    $('#select-electricity-use').on('change', function() {
        let value = $(this).val();     
        if (value === "spend") {
            $('#electricity-input').removeClass('input-no-border-right');
            $('#electricity-input').addClass('input-no-border-left');
            hideElement("#electricity-kwh");
            showElement("#electricity-pound");
            
            $('#select-electricity-per').empty();
            $('#select-electricity-per').append('<option value="1">Monthly</option>');
            $('#select-electricity-per').append('<option value="3">Yearly</option>');
            $('#select-electricity-per').append('<option value="2">Quarterly</option>');
                   
        } else {
            $('#electricity-input').addClass('input-no-border-right');
            $('#electricity-input').removeClass('input-no-border-left');
            hideElement("#electricity-pound");
            showElement("#electricity-kwh");
            $('#select-electricity-per').empty();
            $('#select-electricity-per').append('<option value="3">Yearly</option>');
        }
    });
    
    
    $('input[name=row_six_circles]').change(function() {
        let value = $(this).val();     
        if (value == 0) {
            showElement("#row-6-not-sure");
            hideElement("#row-6-usage");
        } else {
            hideElement("#row-6-not-sure");
            showElement("#row-6-usage");
        }
    });
    
    
    $('#select-gas-supplier').on('change', function() {
        let supplier_id = $(this).val();
        $.each(gas_suppliers, function (index, value) {
            if (value['id'] == supplier_id) {
                populatePlans(value, "#select-gas-plan", "Single");
                $("#select-gas-plan").trigger('change');
            }
        });
    });
    
    $('#select-electricity-supplier').on('change', function() {
        let supplier_id = $(this).val();
        $.each(electricity_suppliers, function (index, value) {
            if (value['id'] == supplier_id) {
                populatePlans(value, "#select-electricity-plan", "Single");
                $("#select-electricity-plan").trigger('change');
            }
        });
    });
    
    $('#select-dual-supplier').on('change', function() {
    let supplier_id = $(this).val();
    console.log(dual_suppliers);
    $.each(dual_suppliers, function (index, value) {
        if (value['id'] == supplier_id) {
            populatePlans(value, "#select-dual-plan", "Dual");
            $("#select-dual-plan").trigger('change');
        }
    });
});

    $('#select-electricity-plan').on('change', function() {
        let supplier_id = $("#select-electricity-supplier").val();
        let plan_id = $(this).val();
        populatePayment(electricity_suppliers, supplier_id,plan_id,"#select-electricity-pay", "Single");
    });
    
    $('#select-gas-plan').on('change', function() {
        let supplier_id = $("#select-gas-supplier").val();
        let plan_id = $(this).val();
        populatePayment(gas_suppliers, supplier_id,plan_id,"#select-gas-pay", "Single");
    });
    
    $('#select-dual-plan').on('change', function() {
        let supplier_id = $("#select-dual-supplier").val();
        let plan_id = $(this).val();
        populatePayment(dual_suppliers, supplier_id,plan_id,"#select-dual-pay", "Dual");
    });

    onLoaded();
    
    $('[data-toggle="tooltip"]').tooltip();
    //$('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');

    
    
    
    
$('#quote-submit-frm').on('submit', function(e) { 
e.preventDefault();
    
    
    
    
    if (validateUsage() == true) {
        validateTemplate();
        console.log("showing modal");
        $('#search-modal').modal("show");
        let template = data_template['data-template'];
        template['data-template'] = post_template;
        template['supply-data'] = null;

        $.ajax({
            url: endpoint + "/suppliers/validate",
            type:"POST",
            data:JSON.stringify(template),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data){
                if (!data.hasOwnProperty("errors")) {


                        $.ajax({
                            url: endpoint + "/suppliers",
                            type:"POST",
                            data:JSON.stringify(template),
                            contentType:"application/json; charset=utf-8",
                            dataType:"json",
                            success: function(value){

                            let _template = handleUsageTemplate(value);
                                
                            console.log(_template);
                                $.ajax({
                                url: endpoint + "/usage/validate",
                                type:"POST",
                                data:JSON.stringify(_template),
                                contentType:"application/json; charset=utf-8",
                                dataType:"json",
                                success: function(_data){
                                    if (!data.hasOwnProperty("errors")) {
                                    console.log(_data);
                                        
                                        _template['email'] = sessionStorage.getItem("email");
                                        $.ajax({
                                            url: endpoint + "/usage",
                                            type:"POST",
                                            data:JSON.stringify(_template),
                                            contentType:"application/json; charset=utf-8",
                                            dataType:"json",
                                            success: function(_data){
                                                if (!_data.hasOwnProperty("errors")) {
                                                console.log(_data);
                                                sessionStorage.setItem("future-suppliers", JSON.stringify(_data));
                                                    setTimeout(function() { 
                                                        window.location.replace("../../energy/2/");
                                                     }, 2000);
                                                    
                                                } else {
                                                    console.log("hiding search modal");
                                                    $('#search-modal').modal('hide');
                                                    $('#search-modal').modal('hide');
                                                    clearInterval();
                                                    $.each(_data['errors'], function(index, value) {
                                                        $('#modal-body').text(value['message']['text']);
                                                        $('#errorModal').modal('show');
                                                    });   
                                                } 
                                            }
                                        });
 
                                    } else {   
                                        console.log("hiding search modal");
                                        $('#search-modal').modal('hide');
                                        $('#search-modal').modal('hide');
                                        clearInterval();
                                        $.each(data['errors'], function(index, value) {
                                            $('#modal-body').text(value['message']['text']);
                                            $('#errorModal').modal('show');
                                        });   
                                    } 
                                }
                                
                                });
                            }
                        });
      
                } else {
                    $('#search-modal').modal('hide');
                    $('#search-modal').modal('hide');
                    clearInterval();
                    $.each(data['errors'], function(index, value) {     
                        $('#modal-body').text(value['message']['text']);
                        $('#errorModal').modal('show');
                    });   
                } 
            }
        });
    }
    
    
    
});


    
    
});


function init() {
    post_template = data_template['data-template']['data-template'];
    electricity_suppliers = data_template['data-template']['supply-data']['fuels']["electricity"]['suppliers'];
    gas_suppliers = data_template['data-template']['supply-data']['fuels']["gas"]['suppliers'];
    getDualSuppliers();
    getPaymentMethods();
}


function onLoaded() {
    let gas_elem = $('input[name=row_gas_images]')[0];
    $(gas_elem).prop("checked", true).change();
    let value1 = parseInt($(gas_elem).val());
    $("#select-gas-supplier").val(value1);
    $("#select-gas-supplier").trigger('change');
    
    let elec_elem = $('input[name=row_electricity_images]')[0];
    $(elec_elem).prop("checked", true).change();
    let value2 = parseInt($(elec_elem).val());
    $("#select-electricity-supplier").val(value2);
    $("#select-electricity-supplier").trigger('change');
    
    let dual_elem = $('input[name=row_dual_images]')[0];
    $(dual_elem).prop("checked", true).change();
    let value3 = parseInt($(dual_elem).val());
    $("#select-dual-supplier").val(value3);
    $("#select-dual-supplier").trigger('change');
}

function populatePayment(obj, supplierID, planID, element, fuelType) {
    clearListBox(element);
    $.each(obj, function (index, value) {
        if (value['id'] == supplierID) {
            
            $.each(obj[index]['supplierTariffs'], function (_index, _value) {
                
                if (_value['id'] == planID) {
                    let base = obj[index]['supplierTariffs'][_index]['paymentMethods'];
                    $.each(base, function (__index, __value) {
                        let payment_id = __value['id'];
                        $.each(base[__index]['for'], function (___index, ___value) {        
                            if (___value['fuelType'] === fuelType) {
                                $.each(payment_methods, function (____index, ____value) {        
                                    if (____value['id'] === payment_id) {
                                        $(element).append(`<option value="${____value['id']}"> ${____value['name']}</option>`);
                                    }   
                                });   
                            }
                        });
                    });
                }
            });
        }
    });
}


function populatePlans(obj, planElement, planType) {
    clearListBox(planElement);
    let default_id = 0;
    if ("defaultSupplierTariff" in obj){
        if (obj['defaultSupplierTariff'] !== null) {
            default_id = obj['defaultSupplierTariff']['id'];
            $(planElement).append(`<option value="${obj['defaultSupplierTariff']['id']}">Standard</option>`);
            $(planElement).append(`<option value="${obj['defaultSupplierTariff']['id']}">Not Sure</option>`);
        }
    }
    
    $.each(obj['supplierTariffs'], function (index, value) {
        if (planHasPaymentType(value, planType) == true) {
            if (value['id'] !== default_id) {
                populateListBox(planElement, value);
            }
        }
    });
}


function planHasPaymentType(obj, paymentType) {
 let rtn_value = false;
    let flag = true;
    $.each(obj['paymentMethods'], function (index, value) {
        $.each(obj['paymentMethods'][index]['for'], function (_index, _value) {
            if (_value['fuelType'] === paymentType) {
                rtn_value = true;
                flag = false;
            }
        });
        return flag;
    });
    return rtn_value;
}


function getBigSix(imgcontainer, obj, name) {
    $.each(obj, function (index, value) {
        if ("supplierAttributes" in value) {
            $.each(obj[index]['supplierAttributes'], function (_index, _value) {
                if (_value === "RegionalBigSix") {
                    $(imgcontainer).append(`
                    <div class="col-12 col-sm-6 col-md-4">
                    <input id="supplier-name-${name}-${index}" class="display-hide button-outline" type="radio" name="row_${name}_images" value="${value['id']}">
                    <label for="supplier-name-${name}-${index}" class="supplier-image">
                    <div style="background-image: url('${value['logo']['uri']}');"></div>
                    </label>
                    </div>
                    `);
                }
            });
        }
    });
}

/* 
 * check if a supplier has any single plans and add it to the collection
 * params {element ID}{object}{Single/Dual}
 */
function getSupplierListBoxValues(element, obj, forType) {  
    $.each(obj, function (index, value) {
        if (supplierHasPlan(value, forType)) {
            populateListBox(element, value);
        }
    });
}


function getPaymentMethods() {
    $.each(data_template['data-template']['supply-data']['paymentMethods'], function (index, value) {
        payment_methods.push(value);
    });
    
    
}

/* 
 * Populate a listbox with a supplier/plan/payment-type
 * params {element ID}{object}
 */
function populateListBox(listBox, value) {
    $(listBox).append(`<option value="${value['id']}"> ${value['name']}</option>`);
}



/* 
 * clear any listbox
 * params {element ID}
 */
function clearListBox(identifier) {
    $(identifier).empty();
}



/* 
 * Check if a supplier has a dual or single payment option for any of their plans
 * params {object}{Single/Dual}
 */
function supplierHasPlan(supplier, planType) {
    let rtn_value = false;
    let flag = true;
    $.each(supplier['supplierTariffs'], function (index, value) {
        $.each(supplier['supplierTariffs'][index]['paymentMethods'], function (_index, _value) {
            $.each(supplier['supplierTariffs'][index]['paymentMethods'][_index]['for'], function (__index, __value) {
                if (__value['fuelType'] === planType) {
                    rtn_value = true;
                    flag = false;
                }
            });
        });
        return flag;
    });
    return rtn_value;
}


function getDualSuppliers() {
    let base = electricity_suppliers;
    $.each(gas_suppliers, function (index, value) {
       if (supplierHasPlan(value, "Dual")) {
           dual_suppliers.push(value);
       } 
    });
    
    
    $.each(electricity_suppliers, function (index, value) {
        if (supplierHasPlan(value, "Dual")) {
            let match = false;
            $.each(dual_suppliers, function (_index, _value) {
                if (_value['id'] == value['id']) {
                    match = true;
                }
            });
            if(!match) { 
                dual_suppliers.push(value);
            }
        }
    });
} 

/* 
 * Show or hide an element
 * params {element ID}
 */
function showElement(elem) {
    $(elem).removeClass("hide-element");
}

function hideElement(elem) {
    $(elem).addClass("hide-element");
}





function handleUsageTemplate(template) {
    let _template = template['data-template'];
    let full_template = template;
    
    if ($('input[name=row_five_circles]:checked').val() == 1) {
        economy_meter = true;
    }
    
    
    let gas_usage_type = 0;
    let elec_usage_type = 0;
    if ($('input[name=row_six_circles]:checked').val() == 0) {
        gas_usage_type = "2";
        elec_usage_type = "2";
    } else {        
        if ($('#select-gas-use').val() === "spend") {
            gas_usage_type = "4";
        } else {
            gas_usage_type = "3";
        }  
        if ($('#select-electricity-use').val() === "spend") {
            elec_usage_type = "4";
        } else {
            elec_usage_type = "3";
        }     
    }
    
    
    
    if ($('input[name=row_one_buttons]:checked').val() === "dual") {
        _template = setIncludedUsage(_template, "compareGas", "true");
        _template = setIncludedUsage(_template, "compareElec", "true");        
        
        _template = updateUsageType(_template, "gasUsageType", gas_usage_type);
        _template = updateUsageType(_template, "elecUsageType", elec_usage_type);
    } else {  
        _template = setIncludedUsage(_template, "compareGas", "false");
        _template = setIncludedUsage(_template, "compareElec", "true");
        _template = updateUsageType(_template, "elecUsageType", elec_usage_type);
    }
    
    
    if ($('input[name=row_six_circles]:checked').val() == 0) {
        let usage_val = $('input[name=row_six_ns]:checked').val();
        _template = updateSimpleEstimate(_template, "gasSimpleEstimate", usage_val);
        _template = updateSimpleEstimate(_template, "elecSimpleEstimate", usage_val);
    } else {
        
        let gas_amount = $('#gas-input').val();
        let gas_duration = $('#select-gas-per').val();
        let elec_amount = $('#electricity-input').val();
        let elec_duration = $('#select-electricity-per').val();
        if ($('#select-gas-use').val() === "spend") {
            _template = updateUsageSpend(_template, "gasSpend", gas_amount, gas_duration);
        } else {
            _template = updateUsagekWH(_template, "gasKWhUsage", gas_amount, gas_duration);
        }
        
        if ($('#select-electricity-use').val() === "spend") {
            _template = updateUsageSpend(_template, "elecSpend", elec_amount, elec_duration);
        } else {
            _template = updateUsagekWH(_template, "elecKWhUsage", elec_amount, elec_duration);
        }  
    }
    
    
    
    $.each(_template['groups'], function(index, value) {
        if (value['name'] === "economy7") {
            $.each(_template['groups'][index]['items'], function(_index, _value) {
                if (_value['name'] === "nightUsagePercentage") {
                    _value['data'] = handleDecimal($('#select-electricity-night').val());
                }
            }); 
        }
    });
    
    
    full_template['data-template'] = _template;
    return full_template;
}


function handleDecimal(val) {
    let _val = val;
    //_val = parseInt(val);
    //_val = _val.toFixed(2);
    return _val;
}


function updateUsageSpend(template, name, amountVal, timeVal) {
    _template = template;
    
    $.each(_template['groups'], function(index, value) {
        if (value['name'] === name) {
            $.each(_template['groups'][index]['items'], function(_index, _value) {
                if (_value['name'] === "usageAsSpend") {
                    _value['data'] = handleDecimal(amountVal);
                }
                if (_value['name'] === "spendPeriod") {
                    _value['data'] = timeVal;
                }
            });
        }
    });
    return _template;
}


function updateUsagekWH(template, name, amountVal, timeVal) {
    _template = template;
    
    $.each(_template['groups'], function(index, value) {
        if (value['name'] === name) {
            $.each(_template['groups'][index]['items'], function(_index, _value) {
                if (_value['name'] === "usageAsKWh") {
                    _value['data'] = handleDecimal(amountVal);
                }
                if (_value['name'] === "usagePeriod") {
                    _value['data'] = timeVal;
                }
            });
        }
    });
    return _template;
}



function updateSimpleEstimate(template, name, val) {
    _template = template;
    
    $.each(_template['groups'], function(index, value) {
        if (value['name'] === name) {
            $.each(_template['groups'][index]['items'], function(_index, _value) {
                if (_value['name'] === "simpleEstimate") {
                    _value['data'] = val;
                }
            });
        }
    });
    return _template;
}


function updateUsageType(template, name, val) {
    _template = template;
    
    $.each(_template['groups'], function(index, value) {
        if (value['name'] === name) {
            $.each(_template['groups'][index]['items'], function(_index, _value) {
                if (_value['name'] === "usageType") {
                    _value['data'] = val;
                }
            });
        }
    });
    return _template;
}



function setIncludedUsage(template,fuel, dataVal) {
    let _template = template;
    $.each(_template['groups'], function(index, value) {
        if (value['name'] === "includedFuels") {
            $.each(_template['groups'][index]['items'], function(_index, _value) {
                if (_value['name'] === fuel) {
                    _value['data'] = dataVal;
                }
            });
        }
    });
    return _template;
}


function validateUsage() {
    
    if ($('input[name=row_six_circles]:checked').val() == 1) {
        
        if ($('#gas-input').val().length == 0 && $('input[name=row_one_buttons]:checked').val() === 'dual') {
            $('#modal-body').text("Please enter how much you spend or use on gas");
            $('#errorModal').modal('show');
            return false;
        }
        
        if ($('#electricity-input').val().length == 0) {
            $('#modal-body').text("Please enter how much you spend or use on electricity");
            $('#errorModal').modal('show');
            return false;
        }
    } 
    
    return true;
}


function validateTemplate() {
    let rtnValue = true; 
    let economy_meter = false;
    
    if ($('input[name=row_five_circles]:checked').val() == 1) {
        economy_meter = true;
    }
    

    if ($('input[name=row_one_buttons]:checked').val() === "dual") { //is dual
        setIncludedFuels("compareGas", true);
        setIncludedFuels("compareElec", true);
        if ($('input[name=row_one_circles]:checked').val() === "1") { //same supplier    
            let _supplier = $('#select-dual-supplier').val();
            let _tariff = $('#select-dual-plan').val();
            let _payment = $('#select-dual-pay').val();          
            setSupplierGroup("elecTariff", _supplier, _tariff, _payment, economy_meter);
            setSupplierGroup("gasTariff", _supplier, _tariff, _payment, null);
        } else {
            let gas_supplier = $('#select-gas-supplier').val();
            let gas_tariff = $('#select-gas-plan').val();
            let gas_payment = $('#select-gas-pay').val(); 
            
            let elec_supplier = $('#select-electricity-supplier').val();
            let elec_tariff = $('#select-electricity-plan').val();
            let elec_payment = $('#select-electricity-pay').val();
            
            setSupplierGroup("elecTariff", elec_supplier, elec_tariff, elec_payment, economy_meter);
            setSupplierGroup("gasTariff", gas_supplier, gas_tariff, gas_payment, null);
        }
    } else {  
        //is just electricity
        setIncludedFuels("compareGas", false);
        setIncludedFuels("compareElec", true);
        let elec_supplier = $('#select-electricity-supplier').val();
        let elec_tariff = $('#select-electricity-plan').val();
        let elec_payment = $('#select-electricity-pay').val();       
        setSupplierGroup("elecTariff", elec_supplier, elec_tariff, elec_payment, economy_meter);
    }
    
    
    return rtnValue;
}


function setIncludedFuels(fuel, dataVal) {
    $.each(post_template['groups'], function(index, value) {
        if (value['name'] === "includedFuels") {
            $.each(post_template['groups'][index]['items'], function(_index, _value) {
                if (_value['name'] === fuel) {
                    _value['data'] = dataVal;
                }
            });
        }
    });
}


function setSupplierGroup(tariff, supplier, supplierTariff, paymentMethod, economySeven) {
    $.each(post_template['groups'], function(index, value) {
        if (value['name'] === tariff) {
            $.each(post_template['groups'][index]['items'], function(_index, _value) {
                
                //supplier
                if (_value['name'] === "supplier") {
                    _value['data'] = supplier;
                }
                
                //supplierTariff
                if (_value['name'] === "supplierTariff") {
                    _value['data'] = supplierTariff;
                }
                
                //paymentMethod
                if (_value['name'] === "paymentMethod") {
                    _value['data'] = paymentMethod;
                }
                
                //economySeven
                if (economySeven != null) {
                    if (_value['name'] === "economy7") {
                        _value['data'] = economySeven;
                    }
                }      
            });
        }
    }); 
}



function rotateSuppliers() {
    var item = imgs[Math.floor(Math.random()*imgs.length)];
    $('#rotator').attr("src", base + item);
}


function rotateDots() {
    if ($('#dots').text().length == 3) {
        $('#dots').text("");
    } else $('#dots').append(".");
}

