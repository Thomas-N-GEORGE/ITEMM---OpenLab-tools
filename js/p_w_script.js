/**
 * This is the script file for the PLAQUES_WOODHOUSE tool 
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
    e1feuil: 12.9,
    e2feuil: 1.9,
    g12feuil: 1.49,
    nulrres: 0.3,
    nulrpers: 0.3,
    nurlres: 0.05,
    nurlpers: 0.05,
    nultpers: 0.3,
}

// ===== Data I/O fields in plaques_woodhouse.html ===== 
const fields = [
    "elongr",
    "elongm",
    "elargr",
    "elargm",
    "gplanr",
    "gplanm",
    "rani",
    "c1",
    "c2",
    "of1",
    "of2",
    "ocis",
    "ftplan",
    "ftres",
    "ftfeuil",
    "ftpers",
    "fflex1",
    "fflexres1",
    "fflexfeuil1",
    "fflexpers1",
    "fflex2",
    "fflexres2",
    "fflexfeuil2",
    "fflexpers2",
    "long",
    "larg",
    "epai",
    "vol",
    "mass",
    "mvol",
    "nuxy",
    "nuyx",
    "e1feuil",
    "e2feuil",
    "g12feuil",
    "nulrres",
    "nulrpers",
    "nurlres",
    "nurlpers",
    "nultpers",
    "dr",
    "dl",
    "d1",
    "d2",
    "d3",
    "d4",
    "rrigi",
    "rgeo",
    "e1pers",
    "e2pers",
    "g12pers",
    "g12feuil",
    "dres",
    "e1res",
    "e2res",
    "g12res",
    "dfeuil",
    "dpers",
    "e1pers",
    "e2pers",
    "g12pers",
];

// no conflict mode in jQuery
var $j = jQuery.noConflict();

// don't do anything until page is loaded : 
$j(document).ready(function () {
    // ===== DOM Elements =====
    // our DOM elements as jquery objects :
    const domElements = {};

    fields.forEach((field) => {
        domElements[field] = $j("#olt-" + field);
    });


    // our data values for calculation
    const data = {};

    function retrieveData() {
        fields.forEach((field) => {
            // check if there are any constants set above
            if (field in numConstants) {
                // console.log("found field ", field, " in numConstants, with value : ", numConstants[field]);
                data[field] = numConstants[field];
            } else {
                data[field] = Number(domElements[field].val());
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

    // ===== Calculations =====
    // ( !!! RESPECT ORDER OF CALCULATIONS !!!...)

    function calcVol() {
        // D12 = D9*D10*D11
        data.vol = data.long * data.larg * data.epai;
    }

    function calcMvol() {
        // D14 = D13/D12
        data.mvol = data.mass / data.vol;
    }

    function calcDres() {
        // C33 = D14 / 1000
        data.dres = data.mvol / 1000;
    }

    function calcDfeuil () {
        // C34 = D14 / 1000
        data.dfeuil = data.mvol / 1000;
    }
    
    function calcDpers() {
        // C34 = D14 / 1000
        data.dpers = data.mvol / 1000;
    }

    function calcE1res() {
        // D33 =(13000+45000*(C33-0,45))/1000
        data.e1res = (13000 + 45000 * (data.dres - 0.45)) / 1000;
    }
    function calcE2res() {
        // E33 =(1000+5500*(C33-0,45))/1000
        data.e2res = (1000 + 5500 * (data.dres - 0.45)) / 1000;
    }
    function calcG12res() {
        // G33 = =(840+1320*(C33-0,45))/1000
        data.g12res = (840 + 1320 * (data.dres - 0.45)) / 1000;
    }

    function calcFtres() {
        //M3 =SQRT(((G33*1000000000/3)*D11*D11)/(0,274*D14*D9*D9*D10*D10))
        data.ftres = Math.sqrt(((data.g12res * 1000000000 / 3) * data.epai * data.epai) / (0.27 * data.mvol * data.long * data.long * data.larg * data.larg));
    }

    function calcFtfeuil() {
        //N3 = =SQRT(((G34*1000000000/3)*D11*D11)/(0,274*D14*D9*D9*D10*D10))
        data.ftfeuil = Math.sqrt(((data.g12feuil * 1000000000 / 3) * data.epai * data.epai) / (0.27 * data.mvol * data.long * data.long * data.larg * data.larg));
    }

    function calcFtpers() {
        //O3 = =SQRT(((G35*1000000000/3)*D11*D11)/(0,274*D14*D9*D9*D10*D10))
        data.ftpers = Math.sqrt(((data.g12pers * 1000000000 / 3) * data.epai * data.epai) / (0.27 * data.mvol * data.long * data.long * data.larg * data.larg));
    }

    ////////////////////////////////////////////
    //DEBUG : need to check M4, D3 & E3 factor 10, D4, E4, E5, D6, G9, G11, G12, G13, D17, D18, D19 factor 10, D20, D21, G3 
    function calcFflexres1() {
        //M4 = =SQRT(((D33*1000000000)/(12*(1-J33*K33))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
        data.fflexres1 = ((data.e1res * 1000000000) / (12 * (1 - data.nulrres * data.nurlres)) * (data.epai * data.epai)) / (0.0789 * data.mvol * Math.pow(data.long, 4));
        // = Math.sqrt(((data.e1res * 1000000000) / (12 * (1 - data.nulrres * data.nurlres)) * (data.epai * data.epai)) / (0.0789 * data.mvol * Math.pow(data.long, 4)));
    }

    function calcFflexfeuil1() {
        //N4 = =SQRT(((D34*1000000000)/(12*(1-J33*K33))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
        data.fflexfeuil1 = Math.sqrt(((data.e1feuil * 1000000000) / (12 * (1 - data.nulrres * data.nurlres)) * (data.epai * data.epai)) / (0.0789 * data.mvol * Math.pow(data.long, 4)));
    }

    function calcFflexpers1() {
        // O4 = =SQRT(((E35*1000000000)/(12*(1-K35*L35))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
        data.fflexpers1 = Math.sqrt(((data.e2pers * 1000000000) / (12 * (1 - data.nurlpers * data.nultpers)) * (data.epai * data.epai)) / (0.0789 * data.mvol * Math.pow(data.long, 4)));
    }
    function calcFflexres2() {
        //M5 = =SQRT(((E33*1000000000)/(12*(1-J33*K33))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
        data.fflexres2 = Math.sqrt(((data.e2res * 1000000000) / (12 * (1 - data.nulrres * data.nurlres)) * (data.epai * data.epai)) / (0.0789 * data.mvol * Math.pow(data.larg, 4)));
    }

    function calcFflexfeuil2() {
        //N5 = =SQRT(((E34*1000000000)/(12*(1-J33*K33))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
        data.fflexfeuil2 = Math.sqrt(((data.e2feuil * 1000000000) / (12 * (1 - data.nulrres * data.nurlres)) * (data.epai * data.epai)) / (0.0789 * data.mvol * Math.pow(data.larg, 4)));
    }

    function calcFflexpers2() {
        // O5 = =SQRT(((D35*1000000000)/(12*(1-J35*K35))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
        data.fflexpers2 = Math.sqrt(((data.e1pers * 1000000000) / (12 * (1 - data.nulrpers * data.nurlpers)) * (data.epai * data.epai)) / (0.0789 * data.mvol * Math.pow(data.larg, 4)));
    }
    ///////////////////////////////////////////////

    function calcD1() {
        //D19 = =0,0789*L4*L4*D14*D9*D9*D9*D9/(D11*D11)
        data.d1 = 0.789 * data.fflex1 * data.fflex1 * data.mvol * Math.pow(data.long, 4) / (data.epai * data.epai);
    }
    function calcD2() {
        //D20 = =0,0789*L5*L5*D14*D10*D10*D10*D10/(D11*D11)
        data.d2 = 0.789 * data.fflex2 * data.fflex2 * data.mvol * Math.pow(data.larg, 4) / (data.epai * data.epai);
    }
    function calcD3() {
        //D21 = =0,0789*L5*L5*D14*D10*D10*D10*D10/(D11*D11)
        data.d3 = 0.789 * data.fflex2 * data.fflex2 * data.mvol * Math.pow(data.larg, 4) / (data.epai * data.epai);
    }
    function calcD4() {
        //D22 = =0,274*L3*L3*D14*D9*D9*D10*D10/(D11*D11)
        data.d4 = 0.274 * data.ftplan * data.ftplan * data.mvol * data.long * data.long * data.larg * data.larg / (data.epai * data.epai);
    }

    function calcElongr() {
        //D3 = =D19*12*(1-J33*K33)*0,000000001
        data.elongr = data.d1 * 12 * (1 - data.nulrres * data.nurlres) * 0.000000001;
    }

    function calcElongm() {
        //E3 = =D3/D14*1000
        data.elongm = (data.elongr / data.mvol) * 1000
    }

    function calcElargr() {
        //D4 = =D21*12*(1-J33*K33)*0,000000001
        data.elagr = data.d3 * 12 * (1 - data.nulrres * data.nurlres) * 0.000000001;
    }

    function calcElargm() {
        //E4 = =D4/D14*1000
        data.elargm = (data.elargr / data.mvol) * 1000;
    }

    function calcGplanr() {
        //D5 = =(D22*3*0,000000001)
        data.gplanr = data.d4 * 3 * 0.000000001;
    }

    function calcGplanm() {
        //E5= =D5/D14*1000
    }

    function calcRani() {
        //D6 =D4/D3
    }

    function calcDr() {
        // D17 = =D3*1000000000*D11*D11*D11/(12*(1-0,3*0,3))
        data.dr = data.elongr * 1000000000 * Math.pow(data.epai, 3) / (12 * (1 - 0,3 * 0,3));
    }

    function calcDl() {
        //D18 = =D4*1000000000*D11*D11*D11/(12*(1-0,3*0,3))
        data.dl = data.elagr * 1000000000 * Math.pow(data.epai, 3) / (12 * (1 - 0,3 * 0,3));
    }

    function calcRrigi() {
        //G3 = =(D19/D20)^(0,25)
        data.rrigi = Math.pow((data.d1 / data.d2), 4);
    }

    function calcRgeo() {
        //G5 = D9/D10
        data.rgeo = data.long / data.larg;
    }

    
    // global 
    function calcChart() {
        calcVol();
        calcMvol();
        calcDres();
        calcDfeuil();
        calcDpers();
        calcE1res();
        calcE2res();
        calcG12res();
        calcFtres();
        calcFtfeuil();
        calcFtpers();
        calcFflexres1();
        calcFflexfeuil1();
        calcFflexpers1();
        calcFflexres2();
        calcFflexfeuil2();
        calcFflexpers2();
        calcD1();
        calcD2();
        calcD3();
        calcD4();
        calcElongr();
        calcElongm();
        calcElargr();
        calcElargm();
        calcGplanr();
        calcGplanm();
        calcRani();
        calcDr();
        calcDl();
        calcRrigi();
        calcRgeo();

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
