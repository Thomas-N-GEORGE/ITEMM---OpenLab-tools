/**
 * This is the script file for the FLEXION 4 POINTS tool 
 * 
 * Basically it binds entry input and result output in the HTML.
 * 
 * If some constants need to be reset, please do it here.
 * 
 */


// ===== Numerical constants =====
const numConstants = {

}

// ===== Data fields in flexion_4_points tool ===== 
const fields = [
    "base",
    "haut",
    "ltot",
    "mpou",
    "l2app",
    "dappf",
    "dappfa",
    "fel",
    "flel",
    "fmax",
    "flmax",
    "dboi",
    "vol",
    "momq",
    "czel",
    "defzel",
    "myou",
    "mspec",
    "cmax",
    "defmax",
    "momax"
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
    // We call it a first time
    retrieveData();

    function displayOutput(data) {
        for (let field of fields) {
            domElements[field].text(data[field]);
            //console.log(domElements[field].val());
        }
    }

    //************************
    //***** Calculations *****
    //************************
    // ( !!! RESPECT ORDER OF CALCULATIONS !!!...)

    function calcVol() {
        data.vol = data.ltot * data.base * data.haut;
    }

    function calcDBois() {
        data.dboi = (data.mpou / data.vol) / 1000;
    }

    function calcMomq() {
        data.momq = data.base * Math.pow(data.haut, 3) / 12;
    }

    function calcCzel() {
        // =(3*C16*C14)/(C7*C8*C8)
        data.czel = 3 * data.fel * data.dappfa / (data.base * data.haut * data.haut);
    }

    function calcDefzel() {
        data.defzel = data.flel / ((3 * data.l2app * data.l2app - 4 * data.dappfa * data.dappfa) / (12 * data.haut));
    }

    function calcMyou() {
        // =((8*C16*C12*C12*C12)/(96*C17*C24))*(C14/C12)*((3*((C14+C13/2)/C12)-3*(((C14+C13/2)*(C14+C13/2))/(C12*C12))-((C14*C14)/(C12*C12))))
        data.myou = ((8 * data.fel * Math.pow(data.l2app, 3) / (96 * data.flel * data.momq)) * (data.dappfa / data.l2app) * ((3 * ((data.dappfa + data.dappf / 2) / data.l2app) - 3 * (((data.dappfa + data.dappf / 2) * (data.dappfa + data.dappf / 2)) / (data.l2app * data.l2app)) - ((data.dappfa * data.dappfa) / (data.l2app * data.l2app)))));
    }

    function calcMspec() {
        data.mspec = data.myou / data.dboi;
    }

    function calcCmax() {
        // =(3*C18*C14)/(C7*C8*C8)
        data.cmax = 3 * data.fmax * data.dappfa / (data.base * data.haut * data.haut);
    }

    function calcDefmax() {
        // =(C19)/((3*C12*C12-4*C14*C14)/(12*C8))
        data.defmax = data.flmax / ((3 * data.l2app * data.l2app - 4 * data.dappfa * data.dappfa) / (12 * data.haut));
    }

    function calcMomax() {
        data.momax = data.fmax * data.dappfa / 2;
    }

    // global 
    function calcChart() {
        calcVol();
        calcDBois();
        calcMomq();
        calcCzel();
        calcDefzel();
        calcMyou();
        calcMspec();
        calcCmax();
        calcDefmax();
        calcMomax();
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
