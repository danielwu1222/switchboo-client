$(document).ready(function () {
    



    

    /*
     * FORM-1
     * plan select or not sure
     */
    $("#plan-select").change(function () {
        if ($(this).val().length > 0) {
            $("#plan-circle").find(".round-button-circle").removeClass("active");
        }
    });

    $(document).on('click tap touchstart', '#plan-circle .round-button-circle', function (e) {
        $("#plan-select").val("").change();
    });


    /*
     * FORM-1-4
     * circle buttons
     */
    $(document).on('click tap touchstart', '.round-button-circle', function (e) {

        var children = $(this).closest('.form-check').find('.round-button-circle');

        $(children).removeClass("active");
        $(this).addClass("active");

    });


    /*
     * FORM-3
     * supplier list select
     */
    $(document).on('click tap touchstart','.result-row',function(e) {

        $("#form-control").find(".result-row").removeClass("active");

        $(this).addClass("active");

    });


    $(document).on('click tap touchstart', '#view-more', function (e) {

        $(".hidden").removeClass("hidden");
        $("#view-more").addClass("hidden");

    });


    $(document).on('click tap touchstart', '#new-address', function (e) {
        $('#billing-address').removeClass("hide-element");
        $('#billing-address').addClass("show-element");
    });
    
    $(document).on('click tap touchstart', '#same-address', function (e) {
        $('#billing-address').addClass("hide-element");
        $('#billing-address').removeClass("show-element");
    });
    
});
