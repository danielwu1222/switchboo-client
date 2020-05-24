$( document ).ready(function() {
        
    let data = JSON.parse(sessionStorage.getItem("next"));
    $('#what-happens').html(data['customerData']['nextSteps']);
    
});