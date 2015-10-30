$(document).ready(function() { /* activate scrollspy menu */
    $('body').scrollspy({
        target: '#navbar-collapsible',
        offset: 50
    });


    $('.tlt').textillate({ in : {
            effect: 'rollIn'
        }
    });
    // var count = $scope.new_project.count;
    // $( "#count" ).click(function() {
    //     var count = $("#count").value
    //     var count += 1;
    //     alert(count);
    //     $("#count").value = count
    // }); 

	// $("#logedin").hide();
	// $("#proposednav").hide();

	$("#ex1, #ex2").change(function(){
        $('#theshit').click();
    });



    /* smooth scrolling sections */
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 50
                }, 1000);
                return false;
            }
        }
    });

    $("#register").hide();

    $("#registernow").click(function() {
        $("#signin").hide(1000);
        $("#register").show(1000);
    });

    $("#back").click(function() {
        $("#signin").show(1000);
        $("#register").hide(1000);
    });


});

window.setTimeout(function() {
  $("#alert_message").fadeTo(500, 0).slideUp(500, function(){
    $(this).remove(); 
  });
}, 3000);