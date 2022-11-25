/**
 * This is the specific script file for the CORDES tool
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
  "long",
  "rigi",
  "ray",
  "apothex",
  "mquadcyl",
  "mquadhex",
  "raidcyl",
  "raidhex",
  "mvol",
  "airecyl",
  "airehex",
  "mlinacyl",
  "mlinahex",
  "mlinfcyl",
  "mlinfhex",
  "mlintotcyl",
  "mlintothex",
  "masscyl",
  "masshex",
  "tenscyl",
  "tenshex",
  "contcyl",
  "conthex",
  "defcyl",
  "defhex",
  "inharcyl",
  "inharhex",
  "mod1cyl",
  "mod1hex",
  "mod2cyl",
  "mod2hex",
  "mod3cyl",
  "mod3hex",
  "mod4cyl",
  "mod4hex",
  "mod5cyl",
  "mod5hex",
  "mod6cyl",
  "mod6hex",
  "mod7cyl",
  "mod7hex",
  "mod8cyl",
  "mod8hex",
  "mod9cyl",
  "mod9hex",
  "mod10cyl",
  "mod10hex",
  "mod11cyl",
  "mod11hex",
  "mod12cyl",
  "mod12hex",
];

// (no conflict mode in jQuery loaded in olt_functions.js)

// don't do anything until page is loaded :
$j(document).ready(function () {
  //************************
  //***** Calculations *****
  //************************
  // ( !!! RESPECT CALCULATION FUNCTION ORDER CALLING !!!...)

  function calcMquadcyl(data) {
    // D7 =(PI()*(2*D5)^4)/64
    data.mquadcyl = (Math.PI * Math.pow((2 * data.ray), 4)) / 64;
  }

  function calcMquadhex(data) {
    // D8 =5*D6*D6*D6*D6*SQRT(3)/16
    data.mquadhex = (5 * Math.pow(data.apothex, 4) * Math.sqrt(3)) / 16;
  }

  function calcRaidcyl(data) {
    //D9 = =3*D4*D7/(D3*D3*D3)
    data.raidcyl = (3 * data.rigi * data.mquadcyl) / Math.pow(data.long, 3);
  }

  function clacRaidhex(data) {
    //D10 =3*D4*D8/(D3*D3*D3)
    data.raidhex = (3 * data.rigi * data.mquadhex) / Math.pow(data.long, 3);
  }

  function calcAirecyl(data) {
    //D12 =PI()*D5*D5
    data.airecyl = Math.PI * data.ray * data.ray;
  }

  function calcAirehex(data) {
    //D13 =(1/2)*6*(D6/SQRT(3))*D6
    data.airehex = (1 / 2) * 6 * (data.apothex / Math.sqrt(3)) * data.apothex;
  }

  function calcMlinacyl(data) {
    //D14 =D11*D12
    data.mlinacyl = data.mvol * data.airecyl;
  }

  function calcMlinahex(data) {
    //D15 =D11*D13
    data.mlinahex = data.mvol * data.airehex;
  }

  function calcMlintotcyl(data) {
    //D18 =D14+D16
    data.mlintotcyl = data.mlinacyl + data.mlinfcyl;
  }

  function calcMlintothex(data) {
    //D19 = D15+D17
    data.mlintothex = data.mlinahex + data.mlinfhex;
  }

  function calcTenscyl(data) {
    //D24 =9,81*D22
    data.tenscyl = 9.81 * data.masscyl;
  }

  function calcTenshex(data) {
    //D25 =D23*9,81
    data.tenshex = 9.81 * data.masshex;
  }

  function calcContcyl(data) {
    //D26 = =D24/D12
    data.contcyl = data.tenscyl / data.airecyl;
  }

  function calcConthex(data) {
    //D27 ==D25/D13
    data.conthex = data.tenshex / data.airehex;
  }

  function calcDefcyl(data) {
    //D28 ==D26/D4
    data.defcyl = data.contcyl / data.rigi;
  }

  function calcDefhex(data) {
    //D29 ==D27/D4
    data.defhex = data.conthex / data.rigi;
  }

  function calcInharcyl(data) {
    //D30 ==(PI()*PI()*D4*D7)/(D24*D3*D3)
    data.inharcyl =
      (Math.PI * Math.PI * data.rigi * data.mquadcyl) /
      (data.tenscyl * data.long * data.long);
  }

  function calcInharhex(data) {
    //D31 = =(PI()*PI()*D4*D8)/(D25*D3*D3)
    data.inharhex =
      (Math.PI * Math.PI * data.rigi * data.mquadhex) /
      (data.tenshex * data.long * data.long);
  }

  function calcMod1cyl(data) {
    //C33 ==SQRT(D24/D18)*(1/(2*D3))*SQRT(1+D30)
    data.mod1cyl =
      Math.sqrt(data.tenscyl / data.mlintotcyl) *
      (1 / (2 * data.long)) *
      Math.sqrt(1 + data.inharcyl);
  }
  function calcMod1hex(data) {
    //D33 ==SQRT(D25/D19)*(1/(2*D3)) ??? *SQRT(1+D31) ???
    data.mod1hex =
      Math.sqrt(data.tenshex / data.mlintothex) *
      (1 / (2 * data.long)) *
      Math.sqrt(1 + data.inharhex);
  }
  function calcMod2cyl(data) {
    //C34 ==B34*$C$33*SQRT(1+$D$30*B34*B34)
    data.mod2cyl = 2 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 2 * 2);
  }
  function calcMod2hex(data) {
    //D34 ==B34*$D$33*SQRT(1+$D$31*B34*B34)
    data.mod2hex = 2 * data.mod1hex * Math.sqrt(1 + data.inharhex * 2 * 2);
  }
  function calcMod3cyl(data) {
    //C35 ==B35*$C$33*SQRT(1+$D$30*B35*B35)
    data.mod3cyl = 3 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 3 * 3);
  }
  function calcMod3hex(data) {
    //D35 ==B35*$D$33*SQRT(1+$D$31*B35*B35)
    data.mod3hex = 3 * data.mod1hex * Math.sqrt(1 + data.inharhex * 3 * 3);
  }
  function calcMod4cyl(data) {
    //C36 ==B36*$C$33*SQRT(1+$D$30*B36*B36)
    data.mod4cyl = 4 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 4 * 4);
  }
  function calcMod4hex(data) {
    //D36 ==B36*$D$33*SQRT(1+$D$31*B36*B36)
    data.mod4hex = 4 * data.mod1hex * Math.sqrt(1 + data.inharhex * 4 * 4);
  }
  function calcMod5cyl(data) {
    //C37 ==B37*$C$33*SQRT(1+$D$30*B37*B37)
    data.mod5cyl = 5 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 5 * 5);
  }
  function calcMod5hex(data) {
    //D37 = =B37*$D$33*SQRT(1+$D$31*B37*B37)
    data.mod5hex = 5 * data.mod1hex * Math.sqrt(1 + data.inharhex * 5 * 5);
  }
  function calcMod6cyl(data) {
    //C38 ==B38*$C$33*SQRT(1+$D$30*B38*B38)
    data.mod6cyl = 6 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 6 * 6);
  }
  function calcMod6hex(data) {
    //D38 ==B38*$D$33*SQRT(1+$D$31*B38*B38)
    data.mod6hex = 6 * data.mod1hex * Math.sqrt(1 + data.inharhex * 6 * 6);
  }
  function calcMod7cyl(data) {
    //C39 ==B39*$C$33*SQRT(1+$D$30*B39*B39)
    data.mod7cyl = 7 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 7 * 7);
  }
  function calcMod7hex(data) {
    //D39 ==B39*$D$33*SQRT(1+$D$31*B39*B39)
    data.mod7hex = 7 * data.mod1hex * Math.sqrt(1 + data.inharhex * 7 * 7);
  }
  function calcMod8cyl(data) {
    //C40 ==B40*$C$33*SQRT(1+$D$30*B40*B40)
    data.mod8cyl = 8 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 8 * 8);
  }
  function calcMod8hex(data) {
    //D40 ==B40*$D$33*SQRT(1+$D$31*B40*B40)
    data.mod8hex = 8 * data.mod1hex * Math.sqrt(1 + data.inharhex * 8 * 8);
  }
  function calcMod9cyl(data) {
    //C41 ==B41*$C$33*SQRT(1+$D$30*B41*B41)
    data.mod9cyl = 9 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 9 * 9);
  }
  function calcMod9hex(data) {
    //D41 ==B41*$D$33*SQRT(1+$D$31*B41*B41)
    data.mod9hex = 9 * data.mod1hex * Math.sqrt(1 + data.inharhex * 9 * 9);
  }
  function calcMod10cyl(data) {
    //C42 ==B42*$C$33*SQRT(1+$D$30*B42*B42)
    data.mod10cyl = 10 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 10 * 10);
  }
  function calcMod10hex(data) {
    //D42 ==B42*$D$33*SQRT(1+$D$31*B42*B42)
    data.mod10hex = 10 * data.mod1hex * Math.sqrt(1 + data.inharhex * 10 * 10);
  }
  function calcMod11cyl(data) {
    //C43 ==B43*$C$33*SQRT(1+$D$30*B43*B43)
    data.mod11cyl = 11 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 11 * 11);
  }
  function calcMod11hex(data) {
    //D43 ==B43*$D$33*SQRT(1+$D$31*B43*B43)
    data.mod11hex = 11 * data.mod1hex * Math.sqrt(1 + data.inharhex * 11 * 11);
  }
  function calcMod12cyl(data) {
    //C44 ==B44*$C$33*SQRT(1+$D$30*B44*B44)
    data.mod12cyl = 12 * data.mod1cyl * Math.sqrt(1 + data.inharcyl * 12 * 12);
  }
  function calcMod12hex(data) {
    //D44 ==B44*$D$33*SQRT(1+$D$31*B44*B44)
    data.mod12hex = 12 * data.mod1hex * Math.sqrt(1 + data.inharhex * 12 * 12);
  }

  // global
  function calcChart(data) {
    calcMquadcyl(data);
    calcMquadhex(data);
    calcRaidcyl(data);
    clacRaidhex(data);
    calcAirecyl(data);
    calcAirehex(data);
    calcMlinacyl(data);
    calcMlinahex(data);
    calcMlintotcyl(data);
    calcMlintothex(data);
    calcTenscyl(data);
    calcTenshex(data);
    calcContcyl(data);
    calcConthex(data);
    calcDefcyl(data);
    calcDefhex(data);
    calcInharcyl(data);
    calcInharhex(data);
    calcMod1cyl(data);
    calcMod1hex(data);
    calcMod2cyl(data);
    calcMod2hex(data);
    calcMod3cyl(data);
    calcMod3hex(data);
    calcMod4cyl(data);
    calcMod4hex(data);
    calcMod5cyl(data);
    calcMod5hex(data);
    calcMod6cyl(data);
    calcMod6hex(data);
    calcMod7cyl(data);
    calcMod7hex(data);
    calcMod8cyl(data);
    calcMod8hex(data);
    calcMod9cyl(data);
    calcMod9hex(data);
    calcMod10cyl(data);
    calcMod10hex(data);
    calcMod11cyl(data);
    calcMod11hex(data);
    calcMod12cyl(data);
    calcMod12hex(data);
  }

  //************************************
  //***** starting point of script *****
  //************************************

  // script call debug check
  console.log("it's working !");

  // create a new olt object for our tool
  const cordes = new olt(numConstants, fields);

  // We fetch default values
  cordes.retrieveData();

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
    console.log("cordes.domElements : ", cordes.domElements);

    // warning messages cleanup in page
    cordes.removeBadInputWarnings();

    // we retrieve user data input from page;
    cordes.retrieveData();
    // debug check
    console.log("cordes.data", cordes.data);

    // we do the calulations
    calcChart(cordes.data);

    // we display the output data
    cordes.displayOutput();
  });
});
