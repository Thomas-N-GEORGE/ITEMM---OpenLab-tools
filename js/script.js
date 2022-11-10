// no conflict mode in jQuery
var $j = jQuery.noConflict();

// validate numerical input
function checkNumInput(value) {
    const result = Number.parseFloat(value);
    if (isNaN(result)) {
        alert("please enter a valid input value");
        return false;
    } else {
        // alert("enter is a valid input value !");
        return true;
    }
}

// don't do anything until page is loaded : 
$j(document).ready(function () {
    
    console.log("it's working !");
    
    $j("h1").click(function () {
        $j(this).hide();
    });

    $j()
});