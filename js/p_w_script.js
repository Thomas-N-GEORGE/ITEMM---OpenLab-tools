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
};

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

// (no conflict mode in jQuery loaded in olt_functions.js)

// don't do anything until page is loaded :
$j(document).ready(function () {
  //************************
  //***** Calculations *****
  //************************
  // ( !!! RESPECT CALCULATION FUNCTION ORDER CALLING !!!...)

  // Renseigner les dimensions des plaques (upper part of chart)
  function calcVol(data) {
    // D12 = D9*D10*D11
    data.vol = data.long * data.larg * data.epai;
  }

  function calcMvol(data) {
    // D14 = D13/D12
    data.mvol = data.mass / data.vol;
  }

  // Valeurs de référence
  function calcDres(data) {
    // C33 = D14 / 1000
    data.dres = data.mvol / 1000;
  }

  function calcE1res(data) {
    // D33 =(13000+45000*(C33-0,45))/1000
    data.e1res = (13000 + 45000 * (data.dres - 0.45)) / 1000;
  }

  function calcE2res(data) {
    // E33 =(1000+5500*(C33-0,45))/1000
    data.e2res = (1000 + 5500 * (data.dres - 0.45)) / 1000;
  }

  function calcG12res(data) {
    // G33 = =(840+1320*(C33-0,45))/1000
    data.g12res = (840 + 1320 * (data.dres - 0.45)) / 1000;
  }

  function calcDfeuil(data) {
    // C34 = D14 / 1000
    data.dfeuil = data.mvol / 1000;
  }

  function calcE1feuil(data) {
    //D34 = =(14200+21100*(C34-0,65))/1000
    data.e1feuil = (14200 + 21100 * (data.dfeuil - 0.65)) / 1000;
  }

  function calcE2feuil(data) {
    //E34 = =(2020+4340*(C34-0,65))/1000
    data.e2feuil = (2020 + 4340 * (data.dfeuil - 0.65)) / 1000;
  }

  function calcG12feuil(data) {
    //G34 = =(1025+2020*(C34-0,65))/1000
    data.g12feuil = (1025 + 2020 * (data.dfeuil - 0.65)) / 1000;
  }

  function calcDpers(data) {
    // C34 = D14 / 1000
    data.dpers = data.mvol / 1000;
  }

  //Renseigner les fréquences des modes
  // F torsion plan
  function calcFtres(data) {
    //M3 =SQRT(((G33*1000000000/3)*D11*D11)/(0,4053*D14*D9*D9*D10*D10))
    data.ftres = Math.sqrt(
      (((data.g12res * 1000000000) / 3) * data.epai * data.epai) /
        (0.4053 * data.mvol * data.long * data.long * data.larg * data.larg)
    );
  }

  function calcFtfeuil(data) {
    //N3 =SQRT(((G34*1000000000/3)*D11*D11)/(0,4053*D14*D9*D9*D10*D10))
    data.ftfeuil = Math.sqrt(
      (((data.g12feuil * 1000000000) / 3) * data.epai * data.epai) /
        (0.4053 * data.mvol * data.long * data.long * data.larg * data.larg)
    );
  }

  function calcFtpers(data) {
    // O3 =SQRT(((G35*1000000000/3)*D11*D11)/(0,31*D14*D9*D9*D10*D10))
    data.ftpers = Math.sqrt(
      (((data.g12pers * 1000000000) / 3) * data.epai * data.epai) /
        (0.31 * data.mvol * data.long * data.long * data.larg * data.larg)
    );
  }

  // F flexion 1
  function calcFflexres1(data) {
    //M4 =SQRT(((D33*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
    data.fflexres1 = Math.sqrt(
      (((data.e1res * 1000000000) / (12 * (1 - data.nu12 * data.nu21))) *
        (data.epai * data.epai)) /
        (0.0789 * data.mvol * Math.pow(data.long, 4))
    );
  }

  function calcFflexfeuil1(data) {
    //N4 =SQRT(((D34*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
    data.fflexfeuil1 = Math.sqrt(
      (((data.e1feuil * 1000000000) / (12 * (1 - data.nu12 * data.nu21))) *
        (data.epai * data.epai)) /
        (0.0789 * data.mvol * Math.pow(data.long, 4))
    );
  }

  function calcFflexpers1(data) {
    //O4 =SQRT(((D35*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D9*D9*D9*D9))
    data.fflexpers1 = Math.sqrt(
      (((data.e1pers * 1000000000) / (12 * (1 - data.nu12 * data.nu21))) *
        (data.epai * data.epai)) /
        (0.0789 * data.mvol * Math.pow(data.long, 4))
    );
  }

  // F flexion 2
  function calcFflexres2(data) {
    //M5 =SQRT(((E33*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
    data.fflexres2 = Math.sqrt(
      (((data.e2res * 1000000000) / (12 * (1 - data.nu12 * data.nu21))) *
        (data.epai * data.epai)) /
        (0.0789 * data.mvol * Math.pow(data.larg, 4))
    );
  }

  function calcFflexfeuil2(data) {
    //N5 =SQRT(((E34*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
    data.fflexfeuil2 = Math.sqrt(
      (((data.e2feuil * 1000000000) / (12 * (1 - data.nu12 * data.nu21))) *
        (data.epai * data.epai)) /
        (0.0789 * data.mvol * Math.pow(data.larg, 4))
    );
  }

  function calcFflexpers2(data) {
    //O5 =SQRT(((E35*1000000000)/(12*(1-D15*D16))*(D11*D11))/(0,0789*D14*D10*D10*D10*D10))
    data.fflexpers2 = Math.sqrt(
      (((data.e2pers * 1000000000) / (12 * (1 - data.nu12 * data.nu21))) *
        (data.epai * data.epai)) /
        (0.0789 * data.mvol * Math.pow(data.larg, 4))
    );
  }

  // Renseigner les dimensions de plaques (lower part of chart)
  function calcD1(data) {
    //D19 =0,0789*L4*L4*D14*D9*D9*D9*D9/(D11*D11)
    data.d1 =
      (0.0789 *
        data.fflex1 *
        data.fflex1 *
        data.mvol *
        Math.pow(data.long, 4)) /
      (data.epai * data.epai);
  }

  function calcD3(data) {
    // D20 =0,0789*L5*L5*D14*D10*D10*D10*D10/(D11*D11)
    data.d3 =
      (0.0789 *
        data.fflex2 *
        data.fflex2 *
        data.mvol *
        Math.pow(data.larg, 4)) /
      (data.epai * data.epai);
  }

  function calcD4(data) {
    //D21 =0,4053*L3*L3*D14*D9*D9*D10*D10/(D11*D11)
    data.d4 =
      (0.4053 *
        data.ftplan *
        data.ftplan *
        data.mvol *
        data.long *
        data.long *
        data.larg *
        data.larg) /
      (data.epai * data.epai);
  }

  // Rigidités - Modules spécifiques
  function calcElongr(data) {
    // D3 =D19*12*(1-D15*D16)*0,000000001
    data.elongr = data.d1 * 12 * (1 - data.nu12 * data.nu21) * 0.000000001;
  }

  function calcElongm(data) {
    //E3 = =D3/D14*1000
    data.elongm = (data.elongr / data.mvol) * 1000;
  }

  function calcElargr(data) {
    //D4 = =D20*12*(1-D15*D16)*0,000000001
    data.elargr = data.d3 * 12 * (1 - data.nu12 * data.nu21) * 0.000000001;
  }

  function calcElargm(data) {
    //E4 = =D4/D14*1000
    data.elargm = (data.elargr / data.mvol) * 1000;
  }

  function calcGplanr(data) {
    //D5 = =(D21*3*0,000000001)
    data.gplanr = data.d4 * 3 * 0.000000001;
  }

  function calcGplanm(data) {
    //E5= =D5/D14*1000
    data.gplanm = (data.gplanr / data.mvol) * 1000;
  }

  function calcRani(data) {
    //D6 =D4/D3
    data.rani = data.elargr / data.elongr;
  }

  // Renseigner les dimensions de plaques (middle part of chart)
  function calcRf1(data) {
    // D17 = D3*1000000000*D11*D11*D11/(12*(1-0,3*0,3))
    data.rf1 =
      (data.elongr * 1000000000 * Math.pow(data.epai, 3)) /
      (12 * (1 - 0.3 * 0.3));
  }

  function calcRf2(data) {
    //D18 =D4*1000000000*D11*D11*D11/(12*(1-0,3*0,3))
    data.rf2 =
      (data.elargr * 1000000000 * Math.pow(data.epai, 3)) /
      (12 * (1 - 0.3 * 0.3));
  }

  // two calculations
  function calcRrigi(data) {
    //G3 = =(D19/D20)^(0,25)
    data.rrigi = Math.pow(data.d1 / data.d3, 0.25);
  }

  function calcRgeo(data) {
    //G5 = D9/D10
    data.rgeo = data.long / data.larg;
  }

  //Vitesses calculées :
  function calcC1(data) {
    // G9 = SQRT((D3*1000000000*(1-0,3))/(D14*(1+0,3)*(1-2*0,3)))
    data.c1 = Math.sqrt(
      (data.elongr * 1000000000 * (1 - 0.3)) /
        (data.mvol * (1 + 0.3) * (1 - 2 * 0.3))
    );
  }

  function calcC2(data) {
    // G10 = =SQRT((D4*1000000000*(1-0,3))/(D14*(1+0,3)*(1-2*0,3)))
    data.c2 = Math.sqrt(
      (data.elargr * 1000000000 * (1 - 0.3)) /
        (data.mvol * (1 + 0.3) * (1 - 2 * 0.3))
    );
  }

  function calcOf1(data) {
    // G11 =((((D3*1000000000*D11*D11*D11)/(12*(1-D15*D16)/(D14*D11)))^(1/4)))*SQRT(2*PI()*L4)
    data.of1 =
      Math.pow(
        (data.elongr * 1000000000 * Math.pow(data.epai, 3)) /
          ((12 * (1 - data.nu12 * data.nu21)) / (data.mvol * data.epai)),
        0.25
      ) * Math.sqrt(2 * Math.PI * data.fflex1);
  }

  function calcOf2(data) {
    // G12 =((((D4*1000000000*D11*D11*D11)/(12*(1-D16*D15)/(D14*D11)))^(1/4)))*SQRT(2*PI()*L5)
    data.of2 =
      Math.pow(
        (data.elargr * 1000000000 * Math.pow(data.epai, 3)) /
          ((12 * (1 - data.nu12 * data.nu21)) / (data.mvol * data.epai)),
        0.25
      ) * Math.sqrt(2 * Math.PI * data.fflex2);
  }
  function calcOcis(data) {
    // G13 =0,58*SQRT(D9*D9+D10*D10)*L3
    data.ocis =
      0.58 *
      Math.sqrt(data.long * data.long + data.larg * data.larg) *
      data.ftplan;
  }

  // global
  function calcChart(data) {
    calcVol(data);
    calcMvol(data);
    calcDres(data);
    calcE1res(data);
    calcE2res(data);
    calcG12res(data);
    calcDfeuil(data);
    calcE1feuil(data);
    calcE2feuil(data);
    calcG12feuil(data);
    calcDpers(data);
    calcFtres(data);
    calcFtfeuil(data);
    calcFtpers(data);
    calcFflexres1(data);
    calcFflexfeuil1(data);
    calcFflexpers1(data);
    calcFflexres2(data);
    calcFflexfeuil2(data);
    calcFflexpers2(data);
    calcD1(data);
    calcD3(data);
    calcD4(data);
    calcElongr(data);
    calcElongm(data);
    calcElargr(data);
    calcElargm(data);
    calcGplanr(data);
    calcGplanm(data);
    calcRani(data);
    calcRf1(data);
    calcRf2(data);
    calcRrigi(data);
    calcRgeo(data);
    calcC1(data);
    calcC2(data);
    calcOf1(data);
    calcOf2(data);
    calcOcis(data);
  }

  //************************************
  //***** starting point of script *****
  //************************************
  
  // script call debug check
  console.log("it's working !");

  // create a new olt object for our tool
  const pw = new olt(numConstants, fields);

  // We fetch default values
  pw.retrieveData();

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
    console.log("f3points.domElements : ", pw.domElements);

    // warning messages cleanup in page
    pw.removeBadInputWarnings();

    // we retrieve user data input from page;
    pw.retrieveData();
    // debug check
    console.log("pw.data", pw.data);

    // we do the calulations
    calcChart(pw.data);

    // we display the output data
    pw.displayOutput();
  });
});
