/**
 * This is the specific script file for the TEMPLATE tool
 *
 * Here we basically define constants and fiels according to HTML ids.
 * (If ever some constants need to be reset, please do it here)
 *
 * All the calculation functions match the original Google sheet charts.
 * A global calcChart() function calls them all IN THE RIGHT ORDER.
 *
 * After the calculation section, where the script starts,
 * we initialize an olt object to be manipulated when loading the page
 * and inside our Event Listener  :
 * every time we validate the inputs in HTML :
 *    data is fetched,
 *    calculations are called,
 *    updated data is displayed
 *
 */

// ===== We define our local storage key =====
const userStorage = "oltQuartierUserData";

// ===== Numerical defined constants =====
const numConstants = {
  nu: 0.3,
  // artificially added ??
  fmodr: 950,
  // knlfr: 4.58,
};

// ===== Data fields in quarier tool =====
const fields = [
  "long", 
  "larg", 
  "pep",
  "gep",
  "epm",
  "mass",
  "ssl",
  "ssr",
  "vol",
  "mquadl",
  "mquadr",
  "mvol",
  "dens",
  "nu",
  "fmodr",
  // "knlfr",
  "modl",
  "modlsc",
  "modr",
  "modrs",
  "hlong",
  "hlarg",
  "freq",
  "puls",
  "cel",
  "knl",
  "fres",
  "ffeuil",
  "fpers",
  "rdens",
  "rel",
  "rer",
  "rglr",
  "fdens",
  "fel",
  "fer",
  "fglr",
  "pdens",
  "pel",
  "per",
  "pglr",
];

// (no conflict mode in jQuery loaded in olt_functions.js)

// don't do anything until page is loaded :
$j(document).ready(function () {
  //************************
  //***** Calculations *****
  //************************
  // ( !!! RESPECT CALCULATION FUNCTION ORDER CALLING !!!...)

  function calcEpm(data) {
    // =(C6+C7)/2
    data.epm = (data.pep + data.gep) / 2;
  }

  function calcSsl(data) {
    // =C5*C6+(C5*(C7-C6)/2)
    data.ssl = data.larg * data.pep + data.larg * (data.gep - data.pep) / 2;
  }

  function calcSsr(data) {
    // =C4*C8
    data.ssr = data.long * data.epm;
  }
  
  function calcVol(data) {
    // =C10*C4
    data.vol = data.ssl * data.long
  }

  function calcMquadl(data) {
    // =C5*C8*C8*C8/12
    data.mquadl = data.larg * Math.pow(data.epm, 3) / 12;
  }
  
  function calcMquadr(data) {
    // =C4*C8*C8*C8*C8/12
    data.mquadr = data.long * Math.pow(data.epm, 4) / 12;
  }
  
  function calcMvol(data) {
    // =C9/C12
    data.mvol = data.mass / data.vol;
  }

  function calcDens(data) {
    // =C15/1000
    data.dens = data.mvol / 1000;
  }
  
  function calcHlong(data) {
    // =C8/C4
    data.hlong = data.epm / data.long;
  }
  
  function calcHlarg(data) {
    // =C8/C5
    data.hlarg = data.epm / data.larg;
  }
  
  function calcKnl(data) {
    // =4,73-0,208*C22-6,02*C22*C22
    data.knl = 4.73 - 0.208 * data.hlong - 6.02 * data.hlong * data.hlong;
  }

  function calcModl(data) {
    // =(((2*PI()/F7)*F4*C4)^4*C15*C10)/(C13*4*PI()*PI()*F4*F4)/1000000000
    data.modl = 
      ((Math.pow((2 * Math.PI / data.knl) * data.freq * data.long, 4) * data.mvol * data.ssl) /
      (data.mquadl * 4 * Math.PI * Math.PI * data.freq * data.freq)) / 1000000000;
  }
  
  function calcModlsc(data) {
    // =C18/C16
    data.modlsc = data.modl / data.dens;
  }

  function calcKnlfr(data) {
    // =4,73-0,208*C23-6,02*C23*C23
    data.knlfr = 4.73 - 0.208 * data.hlarg - 6.02 * data.hlarg * data.hlarg;
  }

  function calcModr(data) {
    // =(F9*F9*C15*C5*C5*C5*C5*C4*C8*PI()*PI())/(C14*F12*F12*F12*F12)/1000000000
    data.modr = 
      ((data.fmodr * data.fmodr * data.mvol * Math.pow(data.larg, 4) * data.long * data.epm * Math.PI * Math.PI) /
      (data.mquadr * Math.pow(data.knlfr, 4))) / 1000000000;
  }

  function calcModrs(data) {
    // =C20/C16
    data.modrs = data.modr / data.dens;
  }

  function calcPuls(data) {
    // =2*PI()*F4
    data.puls = 2 * Math.PI * data.freq;
  }

  function calcCel(data) {
    // =(2*PI()/F7)*F4*C4
    data.cel = (2 * Math.PI / data.knl) * data.freq * data.long;
  }

  function calcRdens(data) {
    // =C15/1000
    data.rdens = data.mvol / 1000;
  }
  
  function calcRel(data) {
    // =(13000+45000*(F16-0,45))/1000
    data.rel = (13000 + 45000 * (data.rdens - 0.45)) / 1000
  }

  function calcFres(data) {
    // =((F7*F7)/(2*PI()*C4*C4))*SQRT(C13*G16*1000000000/(C15*C10))
    data.fres = 
      (data.knl * data.knl) / (2 * Math.PI * data.long * data.long) * 
      Math.sqrt(data.mquadl *  data.rel * 1000000000 / (data.mvol * data.ssl));
  }

  function calcFdens(data) {
    // =C15/1000
    data.fdens = data.mvol / 1000;
  }

  function calcFel(data) {
    // =(14200+21100*(F17-0,65))/1000
    data.fel = (14200 + 21100 * (data.fdens - 0.65)) / 1000
  }

  function calcFfeuil(data) {
    // =((F7*F7)/(2*PI()*C4*C4))*SQRT(C13*G17*1000000000/(C15*C10))
    data.ffeuil = 
      (data.knl * data.knl) / (2 * Math.PI * data.long * data.long) * 
      Math.sqrt(data.mquadl *  data.fel * 1000000000 / (data.mvol * data.ssl));
  }

  function calcPel(data) {
    data.pel = 12.0;
  }

  function calcFpers(data) {
    // =((F7*F7)/(2*PI()*C4*C4))*SQRT(C13*G18*1000000000/(C15*C10))
    data.fpers = 
      (data.knl * data.knl) / (2 * Math.PI * data.long * data.long) * 
      Math.sqrt(data.mquadl *  data.pel * 1000000000 / (data.mvol * data.ssl));
  }

  function calcRer(data) {
    // =(1000+5500*(F16-0,45))/1000
    data.rer = (1000 + 5500 * (data.rdens - 0.45)) / 1000;
  }

  function calcRglr(data) {
    // =(840+1320*(F16-0,45))/1000
    data.rglr = (840 + 1320 * (data.rdens - 0.45)) / 1000;
  }

  function calcFer(data) {
    // =(2020+4340*(F16-0,65))/1000
    data.fer = (2020 + 4340 * (data.rdens - 0.65)) / 1000;
  }

  function calcFglr(data) {
    // =(1025+2020*(F16-0,65))/1000
    data.fglr = (1025 + 2020 * (data.rdens - 0.65)) / 1000;
  }

  function calcPdens(data) {
    // =C15/1000
    data.pdens = data.mvol / 1000;
  }

  function calcPer(data) {
    data.per = 2.0;
  }

  function calcPglr(data) {
    data.pglr = 1.0;
  }

  // global
  function calcChart(data) {
    calcEpm(data);
    calcSsl(data);
    calcSsr(data);
    calcVol(data);
    calcMquadl(data);
    calcMquadr(data);
    calcMvol(data);
    calcDens(data);
    calcHlong(data);
    calcHlarg(data);
    calcKnl(data);
    calcModl(data);
    calcModlsc(data);
    calcKnlfr(data);
    calcModr(data);
    calcModrs(data);
    calcPuls(data);
    calcCel(data);
    calcRdens(data);
    calcRel(data);
    calcFres(data);
    calcFdens(data);
    calcFel(data);
    calcFfeuil(data);
    calcPel(data);
    calcFpers(data);
    calcRer(data);
    calcRglr(data);
    calcFer(data);
    calcFglr(data);
    calcPdens(data);
    calcPer(data);
    calcPglr(data);
  }

  //************************************
  //***** starting point of script *****
  //************************************

  // script call debug check
  console.log("it's working !");

  // we create a new olt object for our tool
  const quartier = new olt(numConstants, fields, userStorage);

  // and we load our page
  quartier.loadPage();

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
    console.log("quartier.domElements : ", quartier.domElements);

    // warning messages cleanup in page
    quartier.removeBadInputWarnings();

    // we retrieve user data input from page while checking it is correct;
    if (quartier.retrieveData()) {
      // debug check
      console.log("quartier.data", quartier.data);

      // we do the calulations
      calcChart(quartier.data);

      // we try to render our calculations on page
      quartier.render();
    }
  });
});
