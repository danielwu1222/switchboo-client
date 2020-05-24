let current_filter;
var endpoint = "https://api.switchboo.com";
//var endpoint = "http://localhost:3000";

$(document).ready(function () {
   
    let data = JSON.parse(sessionStorage.getItem("future-suppliers"));
    
    current_filter = data['tariffs'];
    
    populateTariffs(data['tariffs']);
    
    buildComparisonTable("c",data['currentUsage']);
    
    if (data['tariffs'].length > 0) {
        let amount = data['tariffs'][0]['expectedAnnualSavings'].toFixed(2);
        $('#save-amount').text("£" + amount + "!");
    }
    
    
    $(document).on('click tap touchstart', '#load-more', function (e) {
        toggleShowMore("hide");
    });
     
    $(document).on('click tap touchstart', '.more-info', function (e) {
        let tariff_id = $(this).attr('data-id');
        $('#info-form').attr("data-id", tariff_id);
        let url = $(this).attr('data-uri');
        populateCurrentComparisonTable(url);
    });
    
    
    $('.filter-tariffs').on('change', function() {
        
        let tariffs = data['tariffs'];
        let list = [];
        
        try {
            let filter = $(this).val();    
            
            if (filter === "all") {
                list = tariffs;
            }
            
            if (filter === "greendeals") {
                list = [];
                $.each(tariffs, function(index, value) {
                    try {
                        if (getGreenEnergy(value) !== "") {
                            list.push(value);
                        }         
                    } catch (err) {
                        console.log("error building greendeals: " + err);
                    }
                });    
            }
            
            if (filter === "paperless") {
                list = [];
                $.each(tariffs, function(index, value) {
                    try {
                        if (isPaperless(value) == true) {
                            list.push(value);
                        }         
                    } catch (err) {
                        console.log("error building paperless: " + err);
                    }
                });    
            }
            
            current_filter = list;
            let sortMethod = $('.order-tariffs').val();
            populateTariffs(orderTariffs(list,sortMethod));
            
        } catch (e) {
            console.log(e);
        } 
    });    
    
    $('.order-tariffs').on('change', function() {
        let tariffs = current_filter     
        try {
            let sort = $(this).val();    
            populateTariffs(orderTariffs(tariffs,sort));    
        } catch (e) {
            console.log(e);
        } 
    }); 
    
    
    $('.filter-tariffs-mobile').on('change', function() {
        
        let tariffs = data['tariffs'];
        let list = [];
        
        try {
            let filter = $(this).val();    
            
            if (filter === "all") {
                list = tariffs;
            }
            
            if (filter === "greendeals") {
                list = [];
                $.each(tariffs, function(index, value) {
                    try {
                        if (getGreenEnergy(value) !== "") {
                            list.push(value);
                        }         
                    } catch (err) {
                        console.log("error building greendeals: " + err);
                    }
                });    
            }
            
            if (filter === "paperless") {
                list = [];
                $.each(tariffs, function(index, value) {
                    try {
                        if (isPaperless(value) == true) {
                            list.push(value);
                        }         
                    } catch (err) {
                        console.log("error building paperless: " + err);
                    }
                });    
            }
            
            current_filter = list;
            let sortMethod = $('.order-tariffs-mobile').val();
            populateTariffs(orderTariffs(list,sortMethod));
            
        } catch (e) {
            console.log(e);
        } 
    });    
     
    $('.order-tariffs-mobile').on('change', function() {
        let tariffs = current_filter     
        try {
            let sort = $(this).val();    
            populateTariffs(orderTariffs(tariffs,sort));    
        } catch (e) {
            console.log(e);
        } 
    }); 
    
     $('.form-plan').on('submit', function(e) { 
        e.preventDefault();
         let tariff_id = $(this).attr('data-id');
         data['template']['data-template']['groups'][0]['items'][0]['data'] = tariff_id;
         try {
             
             let obj = {};
             obj['template'] = data['template'];
             $.each(data['tariffs'], function(index, value) {
                 if (value['id'] === tariff_id) {
                     obj['supplier'] = value
                     return false;
                 }
             });
    
             
             $.ajax({
                url: endpoint + "/tariff",
                type:"POST",
                data:JSON.stringify(obj),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data){
                    sessionStorage.setItem("future-supplier", JSON.stringify(data));
                    setTimeout(function() { 
                        window.location.replace("../../energy/3/");
                     }, 2000);
                }
            });
             
            
         } catch (err) {
             console.log("error in form submit: " + err);
         }
     });
    
    
});



/*
 * orders tariffs in either price or custom rating order
*/
function orderTariffs(list, order) {
    
    let tariffs = list;
    
    try {     
        if (order === "saving") {
            tariffs.sort(compareSaving);
        } else {
            tariffs.sort(compareRating);
        }  
        return tariffs;
    } catch (err) {
        console.log("error ordering tariffs: " + err);
    }
}
function compareSaving(a, b) {
  if (a['expectedAnnualSavings'] > b['expectedAnnualSavings']) return -1;
  if (b['expectedAnnualSavings'] > a['expectedAnnualSavings']) return 1;
  return 0;
}
function compareRating(a, b) {
  if (a['supplier']['serviceStarRating'] > b['supplier']['serviceStarRating']) return -1;
  if (b['supplier']['serviceStarRating'] > a['supplier']['serviceStarRating']) return 1;
  return 0;
}





/*
 * builds the tariff section
*/
function populateTariffs(list) {
    
    let container = "#top-three-container";
    let more_container = "#more-container";
    
    $(container).empty();
    $(more_container).empty();
    
    $.each(list, function(index, value) {
        try {
            
            if (index > 2) container = more_container; 

            buildResult(value, container);
            buildMobileResult(value, container);
            
        } catch (err) {
            console.log("error building tariff: " + err);
        }
    });
    
    toggleShowMore("show");
}


/*
 * toggles whether show more is shown or not
*/
function toggleShowMore(val) {
    if (val === "show") {
        $('#more-container').addClass("hidden");  
        $('#load-more').removeClass("hidden");
    } else {
        $('#more-container').removeClass("hidden");  
        $('#load-more').addClass("hidden");
    }
}

/*
 * builds a desktop result
*/
function buildResult(result, container) {
    
    let exit_fee = calculateExitFee(result);
    let tariff_name = getTariffName(result);
    let supplier_logo = getSupplierLogo(result);
    let tariff_length = getFixedLength(result);
    let monthly_cost = getEstimatedMonthlyCost(result);
    let yearly_cost = getEstimatedYearlyCost(result);
    let yearly_saving = getYearlySaving(result);
    let details_link = getDetailsLink(result);
    
    var html = [];
    
    html.push('<div class="no_padding_margin desktop_item tablet_view">');
    
    html.push('<div class="section1 center-div">');
    html.push('<img src="' + supplier_logo + '" />');
    html.push('<div class="star-container">' + getRating(result) + '</div>');
    html.push('</div>');
    
    html.push('<div class="section2 center-div">');
    html.push('<div class="sub-section">');
    html.push('<h6 class="item-title">' + tariff_name + '</h6>');
    html.push('<h6 class="item-detail">' + exit_fee + ' exit fee</h6>');
    html.push('<h6 class="item-detail">' + tariff_length + '</h6>');
    html.push('</div>');
    html.push('</div>');
    
    html.push('<div class="section3 center-div">');
    html.push('<div class="sub-section">');
    html.push('<h6 class="item-title">Estimated cost:</h6>');
    html.push('<h6 class="item-detail">' + monthly_cost + ' per month</h6>');
    html.push('<h6 class="item-detail">' + yearly_cost + ' per year</h6>');
    html.push('</div>');
    html.push('</div>');
    
    
    
    html.push('<div class="center-div section4">');
    html.push('<h3>Save<br>' + yearly_saving + '<br>a year</h3>');
    html.push('</div>');
    
    
    html.push('<div class="section5 center-div">');
    html.push('<div class="button-group">');
    html.push('<form class="form-plan" data-id="' + getTariffID(result) + '"><button class="btn button1" type="submit" type="button">Choose plan</button></form>');
    html.push('<button data-id="' + getTariffID(result) + '" data-uri="' + details_link + '" class="more-info btn button2">More info</button>');
    html.push('</div>');
    html.push('</div>');
    html.push('</div>');
    
    $(container).append(html.join(""));
        
}
  

/*
 * builds a mobile result
*/
function buildMobileResult(result, container) {
    
    try {
        
        let html = [];
        
        html.push('<div class="no_padding_margin mobile_item mobile_view">');
        html.push('<div class="container">');
        html.push('<div class="row">');
        
        html.push('<div class="col-12">');
        html.push('<img class="mobile-logo" src="' + getSupplierLogo(result) + '">');
        html.push('<div class="star-container">' + getRating(result) + '</div>');
        html.push('</div>');
        
        html.push('<div class="col-12 mobile-save-container">');
        html.push('<span class="mobile-save">Save <span class="save-amount-mobile">' + getYearlySaving(result) + '</span> a year</span>');
        html.push('</div>');
        
        
        html.push('<div class="col-12 mobile-tariff-container">');
        html.push('<span class="mobile-tariff-title">' + getTariffName(result) + '</span>');
        html.push('</div>');
        
        html.push('<div class="col-6 tariff-details-container right-border">');
        html.push('Tariff Details:');
        html.push('<div class="tariff-inner-detail"><i class="fas fa-chevron-right"></i>' + getFixedLength(result) + '</div>');
        html.push('<div class="tariff-inner-detail"><i class="fas fa-chevron-right"></i>' + calculateExitFee(result) + ' exit fee</div>');       
        let green = getGreenEnergy(result);
        if (green !== "") {
            html.push('<div class="tariff-inner-detail"><i class="fas fa-chevron-right"></i>' + green + '</div>')
        }     
        html.push('</div>');
        
        
        
        html.push('<div class="col-6 tariff-details-container">');
        html.push('Estimated cost:');
        html.push('<div class="tariff-inner-detail"><i class="fas fa-chevron-right"></i>' + getEstimatedMonthlyCost(result) + ' per month</div>');
        html.push('<div class="tariff-inner-detail"><i class="fas fa-chevron-right"></i>' + getEstimatedYearlyCost(result) + ' per year</div>');
        html.push('</div>');
        
        
        html.push('<div class="col-6">');
        html.push('<button data-id="' + getTariffID(result) + '" data-uri="' + getDetailsLink(result) + '" class="btn button2 more-info mobile-more-info">More info</button>');
        html.push('</div>');
        
        
        
        
        html.push('<div class="col-6">');
        html.push('<form class="form-plan" data-id="' + getTariffID(result) + '"><button class="btn button1 mobile-choose-plan" type="submit" type="button">Choose plan</button></form>');
        html.push('</div>');
        
        html.push('</div>');
        html.push('</div>');
        html.push('</div>');


        $(container).append(html.join(""));
        
    } catch (err) {
        console.log(err);
    }
}


/*
 * true/false as to whether its paperless
*/
function isPaperless(result) {
    let rtn = false;
    if (inObj(result, ['supplyDetails', 'attributes']) !== "NA") {
        $.each(result['supplyDetails']['attributes'], function(index) {
            if (result['supplyDetails']['attributes'][index] === "PaperlessBilling") {
                rtn = true;
                return false;
            }
        });
    }
    return rtn;
}


/*
 * gets the tariffID
*/
function getTariffID(result){
    rtn = "";
    try {
        rtn = result['id'];
    } catch (err) {
        console.log("error getting tariffID: " + err);
    }
    
    return rtn;
}


/*
 * gets the green energy
*/
function getGreenEnergy(result) {
    let rtn = "";
    if (inObj(result, ['supplyDetails','keyFeatures']) !== "NA") {
        $.each(result['supplyDetails']['keyFeatures'], function(index, value) {
            if (value['tags'] === "Green") {
                rtn = "Green energy";
                return false;
            }
        });
    }
    return rtn;
}


/*
 * get the star rating and return the html element
*/
function getRating(value) {
    let rtn = "";
    let star = '<i class="fas fa-star dark-star"></i>';
    let grey_star = '<i class="fas fa-star light-star"></i>';
    
    if (inObj(value, ['supplier', 'serviceStarRating'])) {
        let html = [];
        let amount = value['supplier']['serviceStarRating'];
        
        for (i = 0; i < amount; i++) {
          html.push(star);
        }
        
        for (i = 0; i < 5 - amount; i++) {
          html.push(grey_star);
        }
        rtn = html.join("");
    }
    return rtn;
}


/*
 * calculate an exit fee from a given result
*/
function calculateExitFee(result) {
    let rtn = 0;
    if (result.hasOwnProperty("supplyDetails")) {
        if (result['supplyDetails'].hasOwnProperty("elecCancellationFee")) {
            rtn += result['supplyDetails']['elecCancellationFee']    
        }
        if (result['supplyDetails'].hasOwnProperty("gasCancellationFee")) {
            rtn += result['supplyDetails']['gasCancellationFee']    
        }
    }
    rtn = "£" + rtn;
    return rtn;    
}


/*
 * get the results tariff name
*/
function getTariffName(result) {
    let rtn = "";
    
    if (result.hasOwnProperty("supplyDetails")) {
        if (result['supplyDetails'].hasOwnProperty("name")) {
            rtn = result['supplyDetails']['name']    
        }
    }
    
    return rtn;
}


/*
 * get the suppliers logo
*/
function getSupplierLogo(result) {
    let rtn = "";
    
    if (result.hasOwnProperty("supplyDetails")) {
        if (result['supplyDetails'].hasOwnProperty("logo")) {
            if (result['supplyDetails']['logo'].hasOwnProperty("uri")) {
                rtn = result['supplyDetails']['logo']['uri'];
            }
        }
    }  
    return rtn;
}


/*
 * get how long the tariff length is 
*/
function getFixedLength(result) {
    let rtn = "";
    
    if (result.hasOwnProperty("supplyDetails")) {
        if (result['supplyDetails'].hasOwnProperty("keyFeatures")) {
            $.each(result['supplyDetails']['keyFeatures'], function(index, value) {
                if (value['tags'] === "CappedOrFixed") {
                    let val = value['text'].replace ( /[^\d.]/g, '' ); 
                    let total = parseInt(val);
                    if (isNaN(total)) {
                        rtn = "";
                    } else {
                        rtn = "Fixed for " + total + " months";
                    }
                    return false;
                }
            });
        }
    }  
    return rtn;
}


/*
 * get the monthly estimated cost
*/
function getEstimatedMonthlyCost(result) {
    let rtn = 0;
    
    if (result.hasOwnProperty("estimatedElecMonthlyCost")) {
        rtn += result['estimatedElecMonthlyCost'];
    }
    
    if (result.hasOwnProperty("estimatedGasMonthlyCost")) {
        rtn += result['estimatedGasMonthlyCost'];
    }
    rtn = "£" + Math.round(rtn);
    return rtn;
}


/*
 * get the yearly estimated cost
*/
function getEstimatedYearlyCost(result) {
    let rtn = 0;
    
    if (result.hasOwnProperty("expectedAnnualSpend")) {
        rtn += result['expectedAnnualSpend'];
    }
    rtn = "£" + Math.round(rtn);
    return rtn;
}


/*
 * get the yearly saving
*/
function getYearlySaving(result) {
    let rtn = 0;    
    if (result.hasOwnProperty("expectedAnnualSavings")) {
        rtn += result['expectedAnnualSavings'];
    }
    rtn = "£" + rtn.toFixed(2);
    return rtn;
}


/*
 * get details link
*/
function getDetailsLink(result) {
    let rtn = 0;    
    if (result.hasOwnProperty("supplyDetails")) {
        if (result['supplyDetails'].hasOwnProperty("details")) {
            rtn = result['supplyDetails']['details']['uri'];
        }
    }
    return rtn;
}



/*
 * builds the comparison table
*/

function buildComparisonTable(prefix,obj) {
    
    $.each(obj['supplies'], function(index, value) {
        
        let identifier = "";
        
        if (value['fuel'] === "electricity") {
            identifier = "." + prefix + "-elec-";
        } else {
            identifier = "." + prefix + "-gas-";
        }
        
        $(identifier + "supplier").text(inObj(value, ['supplier','name']));
        
        
        
        let tariff_name = inObj(value, ['supplierTariff','name']);
        if (tariff_name.includes(" - ")) {
            tariff_name = tariff_name.split(' - ').pop();
        }    
        $(identifier + "tariff").text(tariff_name);
        
        
        $(identifier + "tariff-type").text(inObj(value, ['supplierTariff','tariffType']));
        $(identifier + "payment-method").text(inObj(value, ['supplierTariff','paymentMethod','name']));
        $(identifier + "unit-rate").text(inObj(value, ['supplierTariff','unitCharge']));
        $(identifier + "standing-charge").text(inObj(value, ['supplierTariff','standingCharge']));
        $(identifier + "night-unit").text(inObj(value, ['supplierTariff','nightUnitCharge']));
        $(identifier + "tariff-length").text(inObj(value, ['supplierTariff','durationWithCurrentSupplierInMonths']) + " months");
        $(identifier + "exit-fee").text("£ " + inObj(value, ['supplierTariff','exitFees']));
    });
}


function populateCurrentComparisonTable(url) {
    
    $.ajax({
        url: 'proxy.php?csurl=' + url,
        type:"GET",
        async: true,
        dataType:"json",
        success: function(result){
            buildComparisonTable("n",result);
            $('#loadModalCenter').modal();
        }
    });
    
    
    
    
}




/*
 * recursive scan in an object to see if a value exists
*/
function inObj(obj, arry) {  
    let rtn = "NA";
    try {
        var i;
        let identifier = obj;
        for (i = 0; i < arry.length; i++) {
            if (identifier.hasOwnProperty(arry[i])) {
                identifier = identifier[arry[i]];       
                if (i == arry.length -1) {
                    rtn = identifier;
                }
            }
        } 
    } catch(err) {
        console.log(err);
        rtn = "NA";
    }
    return rtn;
}



