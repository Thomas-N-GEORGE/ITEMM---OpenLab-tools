/**
 * This is the script file for the FLEXION 4 POINTS tool
 *
 * Basically it binds entry input and result output in the HTML.
 *
 * If some constants need to be reset, please do it here.
 *
 */

// ===== Numerical constants =====
const numConstants = {};

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
  "momax",
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

  function calcDBois(data) {
    data.dboi = data.mpou / data.vol / 1000;
  }

  function calcMomq(data) {
    data.momq = (data.base * Math.pow(data.haut, 3)) / 12;
  }

  function calcCzel(data) {
    // =(3*C16*C14)/(C7*C8*C8)
    data.czel =
      (3 * data.fel * data.dappfa) / (data.base * data.haut * data.haut);
  }

  function calcDefzel(data) {
    data.defzel =
      data.flel /
      ((3 * data.l2app * data.l2app - 4 * data.dappfa * data.dappfa) /
        (12 * data.haut));
  }

  function calcMyou(data) {
    // =((8*C16*C12*C12*C12)/(96*C17*C24))*(C14/C12)*((3*((C14+C13/2)/C12)-3*(((C14+C13/2)*(C14+C13/2))/(C12*C12))-((C14*C14)/(C12*C12))))
    data.myou =
      ((8 * data.fel * Math.pow(data.l2app, 3)) /
        (96 * data.flel * data.momq)) *
      (data.dappfa / data.l2app) *
      (3 * ((data.dappfa + data.dappf / 2) / data.l2app) -
        3 *
          (((data.dappfa + data.dappf / 2) * (data.dappfa + data.dappf / 2)) /
            (data.l2app * data.l2app)) -
        (data.dappfa * data.dappfa) / (data.l2app * data.l2app));
  }

  function calcMspec(data) {
    data.mspec = data.myou / data.dboi;
  }

  function calcCmax(data) {
    // =(3*C18*C14)/(C7*C8*C8)
    data.cmax =
      (3 * data.fmax * data.dappfa) / (data.base * data.haut * data.haut);
  }

  function calcDefmax(data) {
    // =(C19)/((3*C12*C12-4*C14*C14)/(12*C8))
    data.defmax =
      data.flmax /
      ((3 * data.l2app * data.l2app - 4 * data.dappfa * data.dappfa) /
        (12 * data.haut));
  }

  function calcMomax(data) {
    data.momax = (data.fmax * data.dappfa) / 2;
  }

  // global
  function calcChart(data) {
    calcVol(data);
    calcDBois(data);
    calcMomq(data);
    calcCzel(data);
    calcDefzel(data);
    calcMyou(data);
    calcMspec(data);
    calcCmax(data);
    calcDefmax(data);
    calcMomax(data);
  }

  //************************************
  //***** starting point of script *****
  //************************************

  // script call debug check
  console.log("it's working !");

  // create a new olt object for our tool
  const f4points = new olt(numConstants, fields);

  // We fetche default values
  f4points.retrieveData();

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
    console.log("domElements : ", f4points.domElements);

    // warning messages cleanup in page
    f4points.removeBadInputWarnings();

    // we retrieve user data input from page;
    f4points.retrieveData();
    // debug check
    console.log("f3points.data", f4points.data);

    // we do the calulations
    calcChart(f4points.data);

    // we display the output data
    f4points.displayOutput();
  });
});
