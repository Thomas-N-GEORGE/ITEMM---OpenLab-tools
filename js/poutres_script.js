/**
 * This is the specific script file for the POUTRES tool
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


// ===== Numerical constants =====
const numConstants = {
    nuxy: 0.3,
    nuyx: 0.03,
    //knl: 4.73,
}

// ===== Data fields in poutres tool ===== 
const fields = [
    "long",
    "larg",
    "epai",
    "vol",
    "volcm3",
    "mass",
    "mvol",
    "nuxy",
    "nuyx",
    "i1",
    "knl",
    "knldisplay",
    "gamma",
    // "j",
    "i2",
    "k",
    "freqflex",
    "myou",
    "myouspe",
    "cond",
    "condsimpl",
    "cphas",
    "londe",
    "rdens",
    "rel",
    "fdens",
    "fel",
    "pdens",
    "pel",
    "rgui",
    "fgui",
    "pers",
];

// (no conflict mode in jQuery loaded in olt_functions.js)

// don't do anything until page is loaded : 
$j(document).ready(function () {

    //************************
    //***** Calculations *****
    //************************
  // ( !!! RESPECT CALCULATION FUNCTION ORDER CALLING !!!...)

    function calcVol(data) {
        data.vol = data.long * data.larg * data.epai;
    }
    
    function calcVolcm3(data) {
        data.volcm3 = 1000000 * data.long * data.larg * data.epai;
    }

    function calcMvol(data) {
        data.mvol = (data.mass / data.vol);
    }

    function calcI1(data) {
        // =C4*C5*C5*C5/12
        data.i1 = data.larg * Math.pow(data.epai, 3) / 12;
    }

    function calcKnldisplay(data) {
        data.knldisplay = data.knl;
    }

    function calcGamma(data) {
        // =C4*C5*C5*C5*((1/3-0,21*(C5/C4)*(1-(C5*C5*C5*C5)/(12*C4*C4*C4*C4))))
        data.gamma = data.larg * Math.pow(data.epai, 3) * ((1 / 3 - 0.21 * (data.epai / data.larg) * (1 - (Math.pow(data.epai, 4) / (12 * Math.pow(data.larg, 4))))));
    }

    function calcI2(data) {
        // =((C4*C5)/12)*(C4*C4+C5*C5)
        data.i2 = (data.larg * data.epai / 12) * (data.larg * data.larg + data.epai * data.epai);
    }

    function calcK(data) {
        // =(C4*C5*C5*C5/16)/(16/3-3,36*(C5/C4)*(1-((C5*C5*C5*C5/(12*C4*C4*C4*C4)))))
        data.k = (data.larg * Math.pow(data.epai, 3)) / 16 / (16 / 3 - 3.36 * (data.epai / data.larg * (1 - Math.pow(data.epai, 4) / (12 * Math.pow(data.larg, 4)))));
    }

    function calcMyou(data) {
        // =(F3*F3*C8*C4*C5*C3*C3*C3*C3*4*3,1416*3,1416)/(C11*C12*C12*C12*C12)/1000000000
        data.myou = (data.freqflex * data.freqflex * data.mvol * data.larg * data.epai * Math.pow(data.long, 4) * 4 * Math.PI * Math.PI) / (data.i1 * Math.pow(data.knl, 4)) / 1000000000;
    }

    function calcMyouspe(data) {
        // =F7/(C8/1000)
        data.myouspe = data.myou / (data.mvol / 1000);
    }

    function calcCond(data) {
        // =SQRT((F7*1000000000*(1-0,3))/(C8*(1+0,3)*(1-2*0,3)))
        data.cond = Math.sqrt(((data.myou * 1000000000) * (1 - 0.3)) / (data.mvol * (1 + 0.3) * (1 - 2 * 0.3)));
    }

    function calcCondsimpl(data) {
        // =SQRT((F7*1000000000)/(C8))
        data.condsimpl = Math.sqrt((data.myou * 1000000000) / (data.mvol));
    }

    function calcCphas(data) {
        // =(((F7*1000000000*C11)/(C8*(C5*C4)))^0,25)*SQRT(2*PI()*F3)
        data.cphas = (Math.pow(((data.myou * 1000000000 * data.i1) / (data.mvol * (data.epai * data.larg))), 0.25) * Math.sqrt(2 * Math.PI * data.freqflex));
    }

    function calcLonde(data) {
        // =F16/F3
        data.londe = data.cphas / data.freqflex;
    }

    function calcRdens(data) {
        // =C8/1000
        data.rdens = data.mvol / 1000;
    }

    function calcRel(data) {
        // =(13000+45000*(C21-0,45))/1000
        data.rel = (13000 + 45000 * (data.rdens - 0.45)) / 1000;
    }

    function calcFdens(data) {
        // =C8/1000
        data.fdens = data.mvol / 1000;
    }

    function calcFel(data) {
        // =(14200+21100*(C22-0,65))/1000
        data.fel = (14200 + 21100 * (data.fdens - 0.65)) / 1000;
    }

    function calcPdens(data) {
        // =C8/1000
        data.pdens = data.mvol / 1000;
    }

    function calcRgui(data) {
        // =((C12*C12)/(C3*C3*2*3,1416))*SQRT((D21*1000000000*C11)/(C8*C4*C5))
        data.rgui = (
            (data.knl * data.knl) / (data.long * data.long * 2 * Math.PI)
        ) * Math.sqrt(
            (data.rel * 1000000000 * data.i1) / (data.mvol * data.larg * data.epai)
        );
    }

    function calcFgui(data) {
        // =((C12*C12)/(C3*C3*2*3,1416))*SQRT((D22*1000000000*C11)/(C8*C4*C5))
        data.fgui = ((data.knl * data.knl) / (data.long * data.long * 2 * Math.PI)) * Math.sqrt((data.fel * 1000000000 * data.i1) / (data.mvol * data.larg * data.epai));
    }

    function calcPers(data) {
        // =((C12*C12)/(C3*C3*2*3,1416))*SQRT((D23*1000000000*C11)/(C8*C4*C5))
        data.pers = ((data.knl * data.knl) / (data.long * data.long * 2 * Math.PI)) * Math.sqrt((data.pel * 1000000000 * data.i1) / (data.mvol * data.larg * data.epai));
    }

    // global 
    function calcChart(data) {
        calcVol(data);
        calcVolcm3(data);
        calcMvol(data);
        calcI1(data);
        calcKnldisplay(data);
        calcGamma(data);
        calcI2(data);
        calcK(data);
        calcMyou(data);
        calcMyouspe(data);
        calcCond(data);
        calcCondsimpl(data);
        calcCphas(data);
        calcLonde(data);
        calcRdens(data);
        calcRel(data);
        calcFdens(data);
        calcFel(data);
        calcPdens(data);
        calcRgui(data);
        calcFgui(data);
        calcPers(data);
    }

  //************************************
  //***** starting point of script *****
  //************************************
  
  // script call debug check
  console.log("it's working !");

  // create a new olt object for our tool
  const poutres = new olt(numConstants, fields);

  // We fetch default values
  poutres.retrieveData();


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
    console.log("poutres.domElements : ", poutres.domElements);

    // warning messages cleanup in page
    poutres.removeBadInputWarnings();

    // we retrieve user data input from page;
    poutres.retrieveData();
    // debug check
    console.log("poutres.data", poutres.data);

    // we do the calulations
    calcChart(poutres.data);

    // we display the output data
    poutres.displayOutput(["knl"]);
    });
});
