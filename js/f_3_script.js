/**
 * This is the script file for the FLEXION 3 POINTS tool
 *
 * Basically it binds entry input and result output in the HTML.
 *
 * If some constants need to be reset, please do it here.
 *
 */

// ===== Numerical defined constants =====
const numConstants = {};

// ===== Data fields in flexion_3_points tool =====
const fields = [
  "base",
  "haut",
  "l2app",
  "ltot",
  "mcen",
  "dep",
  "mpou",
  "dboi",
  "vol",
  "volcm3",
  "momq",
  "fapp",
  "myouc",
  "mspec",
];

// (no conflict mode in jQuery loaded in olt_functions.js)

// don't do anything until page is loaded :
$j(document).ready(function () {

  //************************
  //***** Calculations *****
  //************************
  // ( !!! RESPECT CALCULATION FUNCTION ORDER CALLING !!!...)

  function calcVol(data) {
    data.vol = data.ltot * data.base * data.haut;
  }
  
  function calcVolcm3(data) {
    data.volcm3 = 1000000 * data.ltot * data.base * data.haut;
  }

  function calcDBois(data) {
    data.dboi = data.mpou / data.vol / 1000;
  }

  function calcMomq(data) {
    data.momq = (data.base * Math.pow(data.haut, 3)) / 12;
  }

  function calcFapp(data) {
    data.fapp = data.mcen * 9.81;
  }

  function calcMyouc(data) {
    // =(C17*C8*C8*C8)/(48*C11*C16)/1000000000
    data.myouc =
      (data.fapp * Math.pow(data.l2app, 3)) /
      (48 * data.dep * data.momq) /
      1000000000;
  }

  function calcMspec(data) {
    data.mspec = data.myouc / data.dboi;
  }

  // global
  function calcChart(data) {
    calcVol(data);
    calcVolcm3(data);
    calcDBois(data);
    calcMomq(data);
    calcFapp(data);
    calcMyouc(data);
    calcMspec(data);
  }


  //************************************
  //***** starting point of script *****
  //************************************
  
  // script call debug check
  console.log("it's working !");

  // create a new olt object for our tool
  const f3points = new olt(numConstants, fields);

  // We fetch default values
  f3points.retrieveData();


  //****************************
  //***** EVENT LISTENER *******
  //***** tool interaction *****
  //****************************
  
  // Form submission in HTML : 
  // We refresh I/O data, do calculations
  $j("form").submit((e) => {
    // prevent the refreshing of page by browser
    e.preventDefault();

    // debug check
    console.log("f3points.domElements : ", f3points.domElements);

    // warning messages cleanup in page
    f3points.removeBadInputWarnings();

    // we retrieve user data input from page;
    f3points.retrieveData();
    // debug check
    console.log("f3points.data", f3points.data);

    // we do the calulations
    calcChart(f3points.data);

    // we display the output data
    f3points.displayOutput();
  });
});
