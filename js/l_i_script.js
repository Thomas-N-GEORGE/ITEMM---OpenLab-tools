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
  //   aire2: 0.00004,
  mom2: 1.33e-11,
  vito2: 130.0271552,
};

// ===== Data fields in lames_idiophones tool =====
const fields = [
  "long1",
  "knl1",
  "base1",
  "haut1",
  "vol1",
  "vol1cm3",
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
  "vol2cm3",
  "mvol2",
  "aire2",
  "mom2",
  "mass2",
  "myou2",
  "freq2",
  "vito2",
];

// (no conflict mode in jQuery loaded in olt_functions.js)

// don't do anything until page is loaded :
$j(document).ready(function () {
  //************************
  //***** Calculations *****
  //************************
  // ( !!! RESPECT ORDER OF CALCULATIONS !!!...)

  // chart 1
  function calcVol1(data) {
    data.vol1 = data.long1 * data.base1 * data.haut1;
  }

  function calcVol1cm3(data) {
    data.vol1cm3 = 1000000 * data.long1 * data.base1 * data.haut1;
  }

  function calcAire1(data) {
    data.aire1 = data.base1 * data.haut1;
  }

  function calcMass1(data) {
    data.mass1 = data.vol1 * data.mvol1;
  }

  function calcMom1(data) {
    data.mom1 = (data.base1 * Math.pow(data.haut1, 3)) / 12;
  }

  function calcFreq1(data) {
    // ((C3*C3)/(C2*C2*2*PI()))*SQRT((C11*C9)/(C8*C7))
    data.freq1 =
      ((data.knl1 * data.knl1) / (data.long1 * data.long1 * 2 * Math.PI)) *
      Math.sqrt((data.myou1 * data.mom1) / (data.aire1 * data.mvol1));
  }

  function calcVito1(data) {
    // (((C11/1000000000)/(C7*C5))^0,25)*SQRT(2*PI()*C12)
    data.vito1 =
      Math.pow(data.myou1 / 1000000000 / (data.haut1 * data.mvol1), 0.25) *
      Math.sqrt(2 * Math.PI * data.freq1);
  }

  // Chart2
  function calcVol2(data) {
    data.vol2 = data.long2 * data.base2 * data.haut2;
  }

  function calcVol2cm3(data) {
    data.vol2cm3 = 1000000 * data.long2 * data.base2 * data.haut2;
  }

  function calcAire2(data) {
    data.aire2 = data.base2 * data.haut2;
  }

  function calcVito2(data) {
    //(((C24/1000000000)/(C20*C18))^0,25)*SQRT(2*PI()*C25)
    data.vito2 =
      Math.pow(data.myou2 / 1000000000 / (data.haut2 * data.mvol2), 0.25) *
      Math.sqrt(2 * Math.PI * data.freq2);
  }

  function calcLong2(data) {
    // SQRT((C16*C16)/(2*PI()*C25))*(((C24*C22)/(C21*C20))^0,25)
    data.long2 =
      Math.sqrt((data.knl2 * data.knl2) / (2 * Math.PI * data.freq2)) *
      Math.pow((data.myou2 * data.mom2) / (data.aire2 * data.mvol2), 0.25);
  }

  function calcVol2(data) {
    data.vol2 = data.long2 * data.base2 * data.haut2;
  }

  function calcMass2(data) {
    data.mass2 = data.mvol2 * data.vol2;
  }

  function caclMom2(data) {
  // MISSING FORMULA ?
      data.mom2 = (data.base2 * Math.pow(data.haut2, 3)) / 12;
  }

  // global
  function calcChart(data) {
    calcVol1(data);
    calcVol1cm3(data);
    calcAire1(data);
    calcMass1(data);
    calcMom1(data);
    calcFreq1(data);
    calcVito1(data);
    calcVol2(data);
    calcAire2(data);
    calcVito2(data);
    calcLong2(data);
    calcVol2(data);
    calcVol2cm3(data);
    calcMass2(data);
  }

  //************************************
  //***** starting point of script *****
  //************************************

  // script call debug check
  console.log("it's working !");

  // create a new olt object for our tool
  const lamIdio = new olt(numConstants, fields);

  // We fetche default values
  lamIdio.retrieveData();

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
    console.log("lamIdio.domElements : ", lamIdio.domElements);

    // we retrieve user data input from page;
    lamIdio.retrieveData();
    // debug check
    console.log("lamIdio.data", lamIdio.data);

    // we do the calulations
    calcChart(lamIdio.data);

    // we display the output data
    lamIdio.displayOutput();
  });
});
