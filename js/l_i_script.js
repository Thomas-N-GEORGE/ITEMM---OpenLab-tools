/**
 * This is the script file for the LAMES_IDIOPHONES tool 
 * 
 * Basically it binds entry input and result output in the HTML.
 * 
 * If some constants need to be reset, please do it here.
 * 
 */


// ===== Numerical constants =====
const numConstants = {
    knl1: 4.73,
    knl2: 4.73,
    aire2: 0.00004,
    mom2: 1.33E-11,
    vito2: 130.0271552,
}

// ===== Data fields in lames_idiophones tool ===== 
const fields = [
    "long1",
    "knl1",
    "base1",
    "haut1",
    "vol1",
    "mvol1",
    "aire1",
    "mom1",
    "mass1",
    "myou1",
    "freq1",
    "vito1",
    
    "long2",
    "knl2",
    "base2",
    "haut2",
    "vol2",
    "mvol2",
    "aire2",
    "mom2",
    "mass2",
    "myou2",
    "freq2",
    "vito2",
];

// no conflict mode in jQuery
var $j = jQuery.noConflict();

// don't do anything until page is loaded : 
$j(document).ready(function () {
    // ===== DOM Elements =====
    // our DOM elements as jquery objects :
    const domElements = {};

    // we populate it
    fields.forEach((field) => {
        domElements[field] = $j("#olt-" + field);
    });

    // our data values for calculation
    const data = {};

    function retrieveData() {
        fields.forEach((field) => {
            if (field in numConstants) {
                // console.log("found field ", field, " in numConstants, with value : ", numConstants[field]);
                data[field] = numConstants[field];
            } else {
                // data[field] = Number(domElements[field].val());
                data[field] = (domElements[field].val()).replaceAll(",", ".");
                data[field] = Number(data[field]);
            }
        });
    }
    // We call it a first time, fetches default values
    retrieveData();

    function displayOutput(data) {
        for (let field of fields) {
            // domElements[field].text(data[field]);
            // Format numerical output : 
            if (Math.abs(data[field]) >= 10000 || Math.abs(data[field]) <= 0.1) {
                domElements[field].text(data[field].toExponential(3));
            } else {
                domElements[field].text(data[field].toFixed(3));
            }
            //console.log(domElements[field].val());
        }
    }

    //************************
    //***** Calculations *****
    //************************
    // ( !!! RESPECT ORDER OF CALCULATIONS !!!...)

    // chart 1
    function calcFreq1(long, knl, aire, mvol, mom, myou) {
        console.log(long, knl, aire, mvol, mom, myou);
        // ((C3*C3)/(C2*C2*2*PI()))*SQRT((C11*C9)/(C8*C7))
        return ((knl * knl) / (long * long * 2 * Math.PI)) * Math.sqrt((myou * mom) / (aire * mvol));
    }

    function calcVito1(haut, mvol, myou, freq) {
        console.log(haut, mvol, myou, freq);
        // (((C11/1000000000)/(C7*C5))^0,25)*SQRT(2*PI()*C12)
        return Math.pow((myou / 1000000000) / (haut * mvol), 0.25) * Math.sqrt(2 * Math.PI * freq);
    }

    // global for chart1
    function calcChart1() {
        data.vol1 = data.long1 * data.base1 * data.haut1;
        // console.log(data.vol1);
        data.aire1 = data.base1 * data.haut1;
        // console.log(data.aire1);
        data.mass1 = data.vol1 * data.mvol1;
        // console.log(data.mass1);
        data.mom1 = data.base1 * Math.pow(data.haut1, 3) / 12;
        // console.log(data.mom1);
        data.freq1 = calcFreq1(data.long1, data.knl1, data.aire1, data.mvol1, data.mom1, data.myou1);
        // console.log(data.freq1);
        data.vito1 = calcVito1(data.haut1, data.mvol1, data.myou1, data.freq1);
        // console.log(data.vito1);
    }

    // Chart2
    function calcLong2(knl, freq, myou, mom, aire, mvol) {
        // SQRT((C16*C16)/(2*PI()*C25))*(((C24*C22)/(C21*C20))^0,25)
        return Math.sqrt((knl * knl) / (2 * Math.PI * freq)) * Math.pow((myou * mom) / (aire * mvol), 0.25);
    }

    function calcVol2(base, haut) {
        return (calcLong2() * base * haut);
    }

    function calcMass2() {
        return mvol2 * calcVol2();
    }

    function calcVito2() {
        //(((C24/1000000000)/(C20*C18))^0,25)*SQRT(2*PI()*C25)
    }

    // global for chart2
    function calcChart2() {
        data.long2 = calcLong2(data.knl2, data.freq2, data.myou2, data.mom2, data.aire2, data.mvol2);
        console.log(data.long2);
        data.vol2 = data.long2 * data.base2 * data.haut2;
        console.log(data.vol2);
        data.aire2 = data.base2 * data.haut2;
        console.log(data.aire2);
        data.mass2 = data.vol2 * data.mvol2;
        console.log(data.mass2);
        data.mom2 = data.base2 * Math.pow(data.haut2, 3) / 12;
        console.log(data.mom2);
        data.vito2 = calcVito1(data.haut2, data.mvol2, data.myou2, data.freq2);
        console.log(data.vito2);
    }


    console.log("it's working !");
    // console.log("it's working 2 !");
    // console.log("it's working 3 !");

    // Form submission
    $j("form").submit((e) => {
        // prevent the refreshing of page
        e.preventDefault();
        // retrieve and check data 
        console.log("domElements : ", domElements);
        retrieveData();
        console.log("data", data);
        // calulate 
        calcChart1();
        calcChart2();
        // display output
        displayOutput(data);
    });
});
