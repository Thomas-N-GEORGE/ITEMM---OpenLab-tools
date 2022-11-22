/**
 * This is the script file for the POUTRES tool 
 * 
 * Basically it binds entry input and result output in the HTML.
 * 
 * If some constants need to be reset, please do it here.
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

// no conflict mode in jQuery
var $j = jQuery.noConflict();

// don't do anything until page is loaded : 
$j(document).ready(function () {
    //************************
  //***** DOM Elements *****
  //************************
  // ALL our DOM elements containing numerical fields as an object of jquery objects :
    const domElements = {};

    // we populate it
    fields.forEach((field) => {
        domElements[field] = $j("#olt-" + field);
    });

  // Checking numerical inputs
    // our numerical input fields
  var inputFields = [];
  $j(".olt-input").each(function () {
    inputFields.push($j(this).attr("id"));
  });
  console.log("inputFields", inputFields);

  // <p> warning for bad input
  let badInputWarning = `
    <p class="olt-bad-input-warning">please check your input value</p>
  `;

  // display a warning (as a DOM element <p>)
  function displayBadInputWarning(field) {
    domElements[field].parent().append(badInputWarning);
  }

  // remove any bad input warning
  function removeBadInputWarnings() {
    $j(".olt-bad-input-warning").each(function () {
      $j(this).remove();
      // console.log($j(this));
    });
  }

  //*****************************
  //***** Data input/output *****
  //*****************************
  // our data values object for calculation
    const data = {};

  // we populate it
    function retrieveData() {
    removeBadInputWarnings();
    
    fields.forEach((field) => {
            // check if there are any constants set above
            if (field in numConstants) {
                // console.log("found field ", field, " in numConstants, with value : ", numConstants[field]);
                data[field] = numConstants[field];
            } else {
                // data[field] = Number(domElements[field].val());
                data[field] = (domElements[field].val()).replaceAll(",", ".");
                data[field] = Number(data[field]);
                if (inputFields.includes("olt-" + field) && isNaN(data[field])) {
                    displayBadInputWarning(field);
                  }
            }
        });
    }
    // We call it a first time, fetches default values
    retrieveData();

    function displayOutput(data) {
        for (let field of fields) {
            // display anything but select field
            if (field != "knl") {
                // domElements[field].text(data[field]);
                // Format numerical output : 
                if (Math.abs(data[field]) >= 10000 || Math.abs(data[field]) <= 0.1) {
                    domElements[field].text(data[field].toExponential(3));
                } else {
                    domElements[field].text(data[field].toFixed(3));
                }
            }

            //console.log(domElements[field].val());
        }
    }

    //************************
    //***** Calculations *****
    //************************
    // ( !!! RESPECT ORDER OF CALCULATIONS !!!...)

    function calcVol() {
        data.vol = data.long * data.larg * data.epai;
    }

    function calcMvol() {
        data.mvol = (data.mass / data.vol);
    }

    function calcI1() {
        // =C4*C5*C5*C5/12
        data.i1 = data.larg * Math.pow(data.epai, 3) / 12;
    }

    function calcKnldisplay() {
        data.knldisplay = data.knl;
    }

    function calcGamma() {
        // =C4*C5*C5*C5*((1/3-0,21*(C5/C4)*(1-(C5*C5*C5*C5)/(12*C4*C4*C4*C4))))
        data.gamma = data.larg * Math.pow(data.epai, 3) * ((1 / 3 - 0.21 * (data.epai / data.larg) * (1 - (Math.pow(data.epai, 4) / (12 * Math.pow(data.larg, 4))))));
    }

    function calcI2() {
        // =((C4*C5)/12)*(C4*C4+C5*C5)
        data.i2 = (data.larg * data.epai / 12) * (data.larg * data.larg + data.epai * data.epai);
    }

    function calcK() {
        // =(C4*C5*C5*C5/16)/(16/3-3,36*(C5/C4)*(1-((C5*C5*C5*C5/(12*C4*C4*C4*C4)))))
        data.k = (data.larg * Math.pow(data.epai, 3)) / 16 / (16 / 3 - 3.36 * (data.epai / data.larg * (1 - Math.pow(data.epai, 4) / (12 * Math.pow(data.larg, 4)))));
    }

    function calcMyou() {
        // =(F3*F3*C8*C4*C5*C3*C3*C3*C3*4*3,1416*3,1416)/(C11*C12*C12*C12*C12)/1000000000
        data.myou = (data.freqflex * data.freqflex * data.mvol * data.larg * data.epai * Math.pow(data.long, 4) * 4 * Math.PI * Math.PI) / (data.i1 * Math.pow(data.knl, 4)) / 1000000000;
    }

    function calcMyouspe() {
        // =F7/(C8/1000)
        data.myouspe = data.myou / (data.mvol / 1000);
    }

    function calcCond() {
        // =SQRT((F7*1000000000*(1-0,3))/(C8*(1+0,3)*(1-2*0,3)))
        data.cond = Math.sqrt(((data.myou * 1000000000) * (1 - 0.3)) / (data.mvol * (1 + 0.3) * (1 - 2 * 0.3)));
    }

    function calcCondsimpl() {
        // =SQRT((F7*1000000000)/(C8))
        data.condsimpl = Math.sqrt((data.myou * 1000000000) / (data.mvol));
    }

    function calcCphas() {
        // =(((F7*1000000000*C11)/(C8*(C5*C4)))^0,25)*SQRT(2*PI()*F3)
        data.cphas = (Math.pow(((data.myou * 1000000000 * data.i1) / (data.mvol * (data.epai * data.larg))), 0.25) * Math.sqrt(2 * Math.PI * data.freqflex));
    }

    function calcLonde() {
        // =F16/F3
        data.londe = data.cphas / data.freqflex;
    }

    function calcRdens() {
        // =C8/1000
        data.rdens = data.mvol / 1000;
    }

    function calcRel() {
        // =(13000+45000*(C21-0,45))/1000
        data.rel = (13000 + 45000 * (data.rdens - 0.45)) / 1000;
    }

    function calcFdens() {
        // =C8/1000
        data.fdens = data.mvol / 1000;
    }

    function calcFel() {
        // =(14200+21100*(C22-0,65))/1000
        data.fel = (14200 + 21100 * (data.fdens - 0.65)) / 1000;
    }

    function calcPdens() {
        // =C8/1000
        data.pdens = data.mvol / 1000;
    }

    function calcRgui() {
        // =((C12*C12)/(C3*C3*2*3,1416))*SQRT((D21*1000000000*C11)/(C8*C4*C5))
        data.rgui = (
            (data.knl * data.knl) / (data.long * data.long * 2 * Math.PI)
        ) * Math.sqrt(
            (data.rel * 1000000000 * data.i1) / (data.mvol * data.larg * data.epai)
        );
    }

    function calcFgui() {
        // =((C12*C12)/(C3*C3*2*3,1416))*SQRT((D22*1000000000*C11)/(C8*C4*C5))
        data.fgui = ((data.knl * data.knl) / (data.long * data.long * 2 * Math.PI)) * Math.sqrt((data.fel * 1000000000 * data.i1) / (data.mvol * data.larg * data.epai));
    }

    function calcPers() {
        // =((C12*C12)/(C3*C3*2*3,1416))*SQRT((D23*1000000000*C11)/(C8*C4*C5))
        data.pers = ((data.knl * data.knl) / (data.long * data.long * 2 * Math.PI)) * Math.sqrt((data.pel * 1000000000 * data.i1) / (data.mvol * data.larg * data.epai));
    }

    // global 
    function calcChart() {
        calcVol();
        calcMvol();
        calcI1();
        calcKnldisplay();
        calcGamma();
        calcI2();
        calcK();
        calcMyou();
        calcMyouspe();
        calcCond();
        calcCondsimpl();
        calcCphas();
        calcLonde();
        calcRdens();
        calcRel();
        calcFdens();
        calcFel();
        calcPdens();
        calcRgui();
        calcFgui();
        calcPers();
    }

    console.log("it's working !");
    // console.log("it's working 2 !");
    // console.log("it's working 3 !");


    //**************************
  //***** EVENT LISTENER *****
  //**************************
  // Form submission : Refreshing I/O data, doing calculations
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
