/**
 * This is the script file for the PLAQUES_WOODHOUSE tool 
 * 
 * Basically it binds entry input and result output in the HTML.
 * 
 * If some constants need to be reset, please do it the numConstants object below.
 * 
 */


// ===== Numerical constants =====
const numConstants = {
    nu12: 0.3,
    nu21: 0.05,
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
    "nu12",
    "nu21",
    "rf1",
    "rf2",
    "d1",
    "d3",
    "d4",
    "rrigi",
    "rgeo",
    "dres",
    "e1res",
    "e2res",
    "g12res",
    "dfeuil",
    "e1feuil",
    "e2feuil",
    "g12feuil",
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

    //**************************
    //****** Calculations ******
    //**************************
    // ( !!! RESPECT ORDER OF CALCULATIONS !!!...)

    // Renseigner les dimensions des plaques (upper part of chart)
    function calcVol() {
        // D12 = D9*D10*D11
        data.vol = data.long * data.larg * data.epai;
    }

    function calcMvol() {
        // D14 = D13/D12
        data.mvol = data.mass / data.vol;
    }

    // Valeurs de référence
    function calcDres() {
        // C33 = D14 / 1000
        data.dres = data.mvol / 1000;
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

    function calcDfeuil() {
        // C34 = D14 / 1000
        data.dfeuil = data.mvol / 1000;
    }

    function calcE1feuil() {
        //D34 = =(14200+21100*(C34-0,65))/1000
        data.e1feuil = (14200 + 21100 * (data.dfeuil - 0.65)) / 1000;
    }

    function calcE2feuil() {
        //E34 = =(2020+4340*(C34-0,65))/1000
        data.e2feuil = (2020 + 4340 * (data.dfeuil - 0.65)) / 1000;
    }

    function calcG12feuil() {
        //G34 = =(1025+2020*(C34-0,65))/1000
        data.g12feuil = (1025 + 2020 * (data.dfeuil - 0.65)) / 1000;
    }

    function calcDpers() {
        // C34 = D14 / 1000
        data.dpers = data.mvol / 1000;
    }

    //Renseigner les fréquences des modes
    // F torsion plan
    function calcFtres() {
        //M3 =SQRT(((G33*1000000000/3)*D11*D11)/(0,4053*D14*D9*D9*D10*D10))
        data.ftres = Math.sqrt(
            (
                (data.g12res * 1000000000 / 3) * data.epai * data.epai
            ) / (
                0.4053 * data.mvol * data.long * data.long * data.larg * data.larg
            )
        );
    }

    function calcFtfeuil() {
        //N3 =SQRT(((G34*1000000000/3)*D11*D11)/(0,4053*D14*D9*D9*D10*D10))
        data.ftfeuil = Math.sqrt(
            (
                (data.g12feuil * 1000000000 / 3) * data.epai * data.epai
            ) / (
                0.4053 * data.mvol * data.long * data.long * data.larg * data.larg
            )
        );
    }

    function calcFtpers() {
        //O3 =SQRT(((G35*1000000000/3)*D11*D11)/(0,4053*D14*D9*D9*D10*D10))
        data.ftpers = Math.sqrt(
            (
                (data.g12pers * 1000000000 / 3) * data.epai * data.epai
            ) / (
                0.4053 * data.mvol * data.long * data.long * data.larg * data.larg
            )
        );
    }

    // F flexion 1
    function calcFflexres1() {
        //M4 =SQRT(((D33*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
        data.fflexres1 = Math.sqrt(
            (
                (data.e1res * 1000000000) / (12 * (1 - data.nu12 * data.nu21))
                * (data.epai * data.epai)
            ) / (
                0.0789 * data.mvol * Math.pow(data.long, 4)
            )
        );
    }

    function calcFflexfeuil1() {
        //N4 =SQRT(((D34*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
        data.fflexfeuil1 = Math.sqrt(
            (
                (data.e1feuil * 1000000000) / (12 * (1 - data.nu12 * data.nu21))
                * (data.epai * data.epai)
            ) / (
                0.0789 * data.mvol * Math.pow(data.long, 4)
            )
        );
    }

    function calcFflexpers1() {
        //O4 =SQRT(((D35*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
        data.fflexpers1 = Math.sqrt(
            (
                (data.e1pers * 1000000000) / (12 * (1 - data.nu12 * data.nu21))
                * (data.epai * data.epai)
            ) / (
                0.0789 * data.mvol * Math.pow(data.long, 4)
            )
        );
    }

    // F flexion 2
    function calcFflexres2() {
        //M5 =SQRT(((E33*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
        data.fflexres2 = Math.sqrt(
            (
                (data.e2res * 1000000000) / (12 * (1 - data.nu12 * data.nu21))
                * (data.epai * data.epai)
            ) / (
                0.0789 * data.mvol * Math.pow(data.larg, 4)
            )
        );
    }

    function calcFflexfeuil2() {
        //N5 =SQRT(((E34*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
        data.fflexfeuil2 = Math.sqrt(
            (
                (data.e2feuil * 1000000000) / (12 * (1 - data.nu12 * data.nu21))
                * (data.epai * data.epai)
            ) / (
                0.0789 * data.mvol * Math.pow(data.larg, 4)
            )
        );
    }

    function calcFflexpers2() {
        //O5 =SQRT(((E35*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
        data.fflexpers2 = Math.sqrt(
            (
                (data.e2pers * 1000000000) / (12 * (1 - data.nu12 * data.nu21))
                * (data.epai * data.epai)
            ) / (
                0.0789 * data.mvol * Math.pow(data.larg, 4)
            )
        );
    }

    // Renseigner les dimensions de plaques (lower part of chart)
    function calcD1() {
        //D19 =0,0789*L4*L4*D14*D9*D9*D9*D9/(D11*D11)
        data.d1 = 0.0789 * data.fflex1 * data.fflex1 * data.mvol * Math.pow(data.long, 4) / (data.epai * data.epai);
    }

    function calcD3() {
        // D20 =0,0789*L5*L5*D14*D10*D10*D10*D10/(D11*D11)
        data.d3 = 0.0789 * data.fflex2 * data.fflex2 * data.mvol * Math.pow(data.larg, 4) / (data.epai * data.epai);
    }

    function calcD4() {
        //D21 =0,4053*L3*L3*D14*D9*D9*D10*D10/(D11*D11)
        data.d4 = 0.4053 * data.ftplan * data.ftplan * data.mvol * data.long * data.long * data.larg * data.larg / (data.epai * data.epai);
    }

    // Rigidités - Modules spécifiques
    function calcElongr() {
        // D3 =D19*12*(1-D15*D16)*0,000000001
        data.elongr = data.d1 * 12 * (1 - data.nu12 * data.nu21) * 0.000000001;
    }

    function calcElongm() {
        //E3 = =D3/D14*1000
        data.elongm = (data.elongr / data.mvol) * 1000;
    }

    function calcElargr() {
        //D4 = =D20*12*(1-D15*D16)*0,000000001
        data.elargr = data.d3 * 12 * (1 - data.nu12 * data.nu21) * 0.000000001;
    }

    function calcElargm() {
        //E4 = =D4/D14*1000
        data.elargm = (data.elargr / data.mvol) * 1000;
    }

    function calcGplanr() {
        //D5 = =(D21*3*0,000000001)
        data.gplanr = data.d4 * 3 * 0.000000001;
    }

    function calcGplanm() {
        //E5= =D5/D14*1000
        data.gplanm = (data.gplanr / data.mvol) * 1000;
    }

    function calcRani() {
        //D6 =D4/D3
        data.rani = data.elargr / data.elongr;
    }

    // Renseigner les dimensions de plaques (middle part of chart)
    function calcRf1() {
        // D17 = D3*1000000000*D11*D11*D11/(12*(1-0,3*0,3))
        data.rf1 = data.elongr * 1000000000 * Math.pow(data.epai, 3) / (12 * (1 - 0.3 * 0.3));
    }

    function calcRf2() { 
        //D18 =D4*1000000000*D11*D11*D11/(12*(1-0,3*0,3))
        data.rf2 = data.elargr * 1000000000 * Math.pow(data.epai, 3) / (12 * (1 - 0.3 * 0.3));
    }

    // two last calculations 
    function calcRrigi() {
        //G3 = =(D19/D20)^(0,25)
        data.rrigi = Math.pow((data.d1 / data.d3), 0.25);
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
        calcE1res();
        calcE2res();
        calcG12res();
        calcDfeuil();
        calcE1feuil();
        calcE2feuil();
        calcG12feuil();
        calcDpers();
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
        calcD3();
        calcD4();
        calcElongr();
        calcElongm();
        calcElargr();
        calcElargm();
        calcGplanr();
        calcGplanm();
        calcRani();
        calcRf1();
        calcRf2();
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