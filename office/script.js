$( document ).ready(function() {
    
    $( "#name" ).click(function() {   
        $('#modal').modal();
        $('#modal-input').attr("name", "name");
        $('#modal-input').val($('#name-val').text());
        $('#modal-submit').attr("name", "editname");
    });
    
    
    $( ".phone" ).click(function() {   
        $('#modal').modal();
        $('#modal-input').attr("name", "phone");
        $('#modal-input').val($(this).attr("data-id"));
        $('#modal-id').val($(this).attr("data-row"));
        $('#modal-submit').attr("name", "editphone");
    });
    
    
    $( "#address" ).click(function() {   
        $('#modal').modal();
        $('#modal-input').attr("name", "address");
        $('#modal-input').val($('#address-val').text());
        $('#modal-submit').attr("name", "editaddress");
    });
    
    
    $( ".edit-btn" ).click(function() {   
        $('#note-modal').modal();
        let post_id = $(this).attr("data-id");
        let message = $(this).closest(".post").find(".note-message").text();
        
        $('#note-body').val(message);
        $('#note-id').val(post_id);
    });
    
    
    
    
});