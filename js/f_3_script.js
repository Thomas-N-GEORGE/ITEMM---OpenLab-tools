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
    "base",
    "haut",
    "l2app",
    "ltot",
    "mcen",
    "dep",
    "dboi",
    "vol",
    "momq",
    "fapp",
    "myouc",
    "mspec",
];

// no conflict mode in jQuery
var $j = jQuery.noConflict();

// don't do anything until page is loaded : 
$j(document).ready(function () {
    // ===== DOM Elements =====
    // our DOM elements as jquery objects :
    const domElements = {};

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
                data[field] = Number(domElements[field].val());
            }
        });
    }
    // We call it a first time
    retrieveData();

    function displayOutput(data) {
        for (let field of fields) {
            domElements[field].text(data[field]);
            //console.log(domElements[field].val());
        }
    }

    // ===== Calculations =====
    // ( !!! RESPECT ORDER OF CALCULATIONS !!!...)
    
    function calcVol() {
        data.vol =  data.ltot * data.base * data.haut;
    }

    function calcDBois() {
        data.dboi = (data.mcen / data.vol) / 1000;
    }

    function calcMomq() {
        data.momq = data.base * Math.pow(data.haut, 3) / 12;
    }

    function calcFapp() {
        data.fapp = data.mcen * 9.81;
    }

    function calcMyouc() {
        data.myouc = ((data.fapp * Math.pow(data.l2app, 3)) / (48 * data.dep * data.momq)) / 1000000000;
    }

    function calcMspec() {
        data.mspec = data.myouc / data.dboi;
    }

    // global 
    function calcChart() {
        calcVol();
        calcDBois();
        calcMomq();
        calcFapp();
        calcMyouc();
        calcMspec();
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
        calcChart();
        // display output
        displayOutput(data);
    });
});
