// no conflict mode in jQuery
var $j = jQuery.noConflict();

// don't do anything until page is loaded : 
$j(document).ready(function () {
    
    console.log("it's working !");
    
    $j("h1").click(function () {
        $j(this).hide();
    });

});