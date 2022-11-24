/**
 * This is the script file for the TEMPLATE tool
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
    "edge",
    "volm4",
    "volcm4"
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

  // global
  function calcChart(data) {}

  //************************************
  //***** starting point of script *****
  //************************************

  // script call debug check
  console.log("it's working !");

  // create a new olt object for our tool
  const template = new olt(numConstants, fields);

  // We fetch default values
  template.retrieveData();

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
    console.log("f3points.domElements : ", template.domElements);

    // warning messages cleanup in page
    template.removeBadInputWarnings();

    // we retrieve user data input from page;
    template.retrieveData();
    // debug check
    console.log("template.data", template.data);

    // we do the calulations
    calcChart(template.data);

    // we display the output data
    template.displayOutput();
  });
});
