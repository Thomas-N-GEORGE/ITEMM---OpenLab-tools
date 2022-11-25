/**
 * This is the specific script file for the EQUIVALENTS tool
 *
 * Here we basically define constants and fiels according to HTML ids.
 * (If ever some constants need to be reset, please do it here)
 *
 * All the calculation functions match the original Google sheet charts.
 * A global calcChart() function calls them all IN THE RIGHT ORDER.
 * 
 * Under the calculation section, at the end of this script, we have our
 * Event Listener  : 
 * every time we validate the inputs in HTML : 
 *    data is fetched, 
 *    calculations are called,
 *    updated data is displayed
 *   
 */

// ===== Numerical defined constants =====
const numConstants = {};

// ===== Data fields in flexion_3_points tool =====
const fields = [
    "long1",
    "long2",
    "larg1",
    "larg2",
    "epai1",
    "epai2",
    "myou1",
    "myou2",
    "mvol1",
    "mvol2",
    "istat1",
    "istat2",
    "idyn1",
    "idyn2",
    "imass1",
    "imass2",
];

// (no conflict mode in jQuery loaded in olt_functions.js)

// don't do anything until page is loaded :
$j(document).ready(function () {
  //************************
  //***** Calculations *****
  //************************
  // ( !!! RESPECT CALCULATION FUNCTION ORDER CALLING !!!...)

  function calcIstat1(data) {
    //C8 = =C6*C4*C5*C5*C5/12
    data.istat1 = data.myou1 * data.larg1 * Math.pow(data.epai1, 3) / 12;
  }

  function calcIstat2(data) {
    //D8 = =D6*D4*D5*D5*D5/12
    data.istat2 = data.myou2 * data.larg2 * Math.pow(data.epai2, 3) / 12;
  }

  function calcIdyn1(data) {
    //C9 =(C6*C4*C5*C5*C5/12)/(C7*(C4*C5))
    data.idyn1 = (data.myou1 * data.larg1 * Math.pow(data.epai1, 3) / 12) / (data.mvol1 * data.larg1 * data.epai1);
  }

  function calcIdyn2(data) {
    //D9 =(D6*D4*D5*D5*D5/12)/(D7*(D4*D5))
    data.idyn2 = (data.myou2 * data.larg2 * Math.pow(data.epai2, 3) / 12) / (data.mvol2 * data.larg2 * data.epai2);
  }

  function calcImass1(data) {
    //C10 =C7*C3*C4*C5
    data.imass1 = data.mvol1 * data.long1 * data.larg1 * data.epai1;
  }

  function calcImass2(data) {
    //D10 =D7*D3*D4*D5
    data.imass2 = data.mvol2 * data.long2 * data.larg2 * data.epai2;
  }


  // global
  function calcChart(data) {
    calcIstat1(data);
    calcIstat2(data);
    calcIdyn1(data);
    calcIdyn2(data);
    calcImass1(data);
    calcImass2(data);
  }

  //************************************
  //***** starting point of script *****
  //************************************

  // script call debug check
  console.log("it's working !");

  // create a new olt object for our tool
  const equiv = new olt(numConstants, fields);

  // We fetch default values
  equiv.retrieveData();

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
    console.log("equiv.domElements : ", equiv.domElements);

    // warning messages cleanup in page
    equiv.removeBadInputWarnings();

    // we retrieve user data input from page;
    equiv.retrieveData();
    // debug check
    console.log("equiv.data", equiv.data);

    // we do the calulations
    calcChart(equiv.data);

    // we display the output data
    equiv.displayOutput();
  });
});
