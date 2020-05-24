$(document).ready(function () {
    
    
    
    
    $( '.qa-body' ).each(function() {
    var $elem = $(this);         // The element or elements with the text to hide
    var $limit = 100;        // The number of characters to show
    var $str = $elem.text();    // Getting the text
    var $strtemp = $str.substr(0,$limit);   // Get the visible part of the string
    $str = $strtemp + '<span>...</span><span class="hide">' + $str.substr($limit,$str.length) + '</span>';  // Recompose the string with the span tag wrapped around the hidden part of it
    $elem.html($str);    // Write the string to the DOM 
    });
 
    
    
    $(document).on('click tap touchstart', '.qa-title', function (e) {
        let parent = $(this).closest(".row");
        
        $('#section-two-container').removeClass("hide");
        $('#card-container').removeClass("hide");
        $('#title').text($(parent).find(".qa-title").text());
        
        let body = $(parent).find(".qa-body").text();
        body = body.replace("...", "");
        
        $('#body').text(body);
        
        
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#title").offset().top
        }, 1000);
        
        
    });
    
    

    var options = {
	url: "data.json",

	getValue: "title",

	list: {
        match: {
			enabled: true
		},

		onSelectItemEvent: function() {
            $('#section-two-container').removeClass("hide");
            $('#card-container').removeClass("hide");
			var title = $("#function-data").getSelectedItemData().title;
            var body = $("#function-data").getSelectedItemData().answer;
            $('#title').text(title);
            $('#body').html(body)
			//$("#data-holder").val(value).trigger("change");
		}
	}
};

$("#function-data").easyAutocomplete(options);
    
    
    
    
     
});