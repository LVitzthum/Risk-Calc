
function omega(){

 // Calculates Rblind from omega
var age = parseFloat(document.getElementById('age').value);
var Rb = -0.2306 * (0.1 * age - 5.8) / 0.948 ;
var R = -0.2306 * (0.1 * age - 5.8) / 0.948 ;

// BMI calc start
var wt = parseFloat(document.getElementById('weight').value)
var ht = parseFloat(document.getElementById('height').value)

// Unit Conversion
var w_unit = document.getElementById('w_unit').value;
var h_unit = document.getElementById('h_unit').value;
if (w_unit == 1) {
wt = wt / 2.20462262
}
if (h_unit == 1) {
ht = ht * 0.0254
}

//BMI calc end
var bmi = wt/Math.pow(ht, 2);
var Rb = Rb - 0.08198 * (0.2 * bmi -5.17)  / 1.15
var R = R - 0.08198 * (0.2 * bmi -5.17)  / 1.15

var sex = document.querySelector('input[name="sex"]:checked').value;
// var sex = document.getElementById('sex').value;
var R = R + .08463 * ((sex - 0.167) / 0.373);

var race = document.getElementById('race').value;
var R = R + 0.0454 * ((race-0.141)/0.348);


var ed = document.getElementById('ed').value;
var Rb = Rb - 0.00835 * ((ed - 0.308) / 0.462)
var R = R - 0.00835 * ((ed - 0.308) / 0.462)

var mar = document.getElementById('mar').value;
var Rb = Rb + .06975 * ((mar - 0.528) / .499);
var R = R + .06975 * ((mar - 0.528) / .499);

var ecog = document.getElementById('ECOG').value;
var Rb = Rb - 0.0514 * ((ecog - 0.382) / 0.486);
var R = R - 0.0514 * ((ecog - 0.382) / 0.486);

// R based on tumor primary location
var loc = document.getElementById('site').value;
if (loc == 0) {
  var lrnx = 1; var hpx = 0; var oc = 0;
}

else if (loc == 1) {
  var lrnx = 0; var hpx = 1; var oc = 0;
}
else if (loc == 2) {
  var lrnx = 0; var hpx = 0; var oc = 1;
}
else if (loc == 3) {
  var lrnx = 0; var hpx = 0; var oc = 0;
}
var Rb = Rb - 0.05956 * ((lrnx - 0.21) / 0.407) - 0.04083 * ( ( hpx - 0.097) / 0.296) + 0.04364 * ((oc - 0.0577) / 0.233);
var R = R - 0.05956 * ((lrnx - 0.21) / 0.407) - 0.04083 * ( ( hpx - 0.097) / 0.296) + 0.04364 * ((oc - 0.0577) / 0.233);

// R based on T stage
var tstage = document.getElementById('tstage').value;
if (tstage == 0) {
var t02 = 1; var t4 = 0;
}

else if (tstage == 1) {
var t02 = 0; var t4 = 0;
}

else if (tstage == 2) {
var t02 = 0; var t4 = 1;
}

 var Rb = Rb - .075 * ((t02 - 0.323) / 0.468) + 0.15228 * (( t4 - 0.28) / 0.449);
 var R = R - .075 * ((t02 - 0.323) / 0.468) + 0.15228 * (( t4 - 0.28) / 0.449);

// R based on N stage
var nstage = document.getElementById('nstage').value;
if (nstage == 0) {
var n02a = 1; var n3 = 0;
}
if (nstage == 1) {
var n02a = 0; var n3 = 0;
}
else if (nstage == 2) {
var n02a = 0; var n3 = 1;
}

var Rb = Rb - 0.07905 * ((n02a - 0.416) / 0.493) + 0.02246 * ((n3 - 0.0844) / 0.278);
var R = R - 0.07905 * ((n02a - 0.416) / 0.493) + 0.02246 * ((n3 - 0.0844) / 0.278);

// Smoking and p16
var smoke = document.getElementById('smoke').value;
var p16 = document.getElementById('p16').value;

Rb = Rb - 0.2509 * ((p16 - 0.509) / 0.5) + 0.08921 * ((smoke - 0.323) / 0.468);
R = R - 0.2509 * ((p16 - 0.509) / 0.5) + 0.08921 * ((smoke - 0.323) / 0.468);

//  // Calculates omega from Risk score
var wb = Math.exp(Rb)*1.761;
var w = Math.exp(R)*1.761;


var wbp = wb / (wb + 1);
var wp = w / (w + 1);

// rounds omega to nearest to 2 decimels
var wbp = Math.round(wbp * 100) / 100;
var wp = Math.round(wp * 100) / 100;

// If there is insufficient input an error message is created
if (!wb) {
document.getElementById("prompt1").innerHTML = "There is insufficient information to calculate the ω score";
  }
 else {
 // Outputs to index.html
 document.getElementById("prompt1").innerHTML = "GCE ω score (blind to race and gender): ";
 document.getElementById("omega_out").innerHTML = wbp;
 document.getElementById("prompt2").innerHTML = "GCE ω score (w/ race and gender): ";
 document.getElementById("omega2_out").innerHTML = wp;

}
 // CARG scoring Tool //
 // calculates GFR IN mL/min based on Cockcroft model which is different than the Jeliffe formula used in CARG paper

 if (sex == 1) {
   var gndr = 0.85;
 }
 else {
   var gndr = 1;
 };

 var cr = parseFloat(document.getElementById('cr').value);

 var gfr = (gndr * (140 - age)) * wt / 72 / cr;
 var gfr = Math.round(gfr * 100) / 100

 if (!gfr) {
 document.getElementById("CRC").innerHTML = "Invalid Inputs";
   }
else{
   document.getElementById("CRC").innerHTML = gfr;
}
   if (!bmi) {
   document.getElementById("BMI").innerHTML = "Invalid Inputs";
     }
else {
  document.getElementById("BMI").innerHTML = bmi;

}


 if (gfr < 34) {
   var CARG = 3
 }
 else {
   var CARG = 0
 }

// // // Adds up CARG values
if (age >= 72) {
     CARG += 2
}

if (document.getElementById("anemia").checked == true) {
     CARG += 3
}
if (document.getElementById("fall").checked == true) {
     CARG += 3
}
if (document.getElementById("hear").checked == true) {
     CARG += 2
}
if (document.getElementById("walk").checked == true) {
     CARG += 2
}
    if (document.getElementById("meds").checked == true) {
      CARG += 1
}
    if (document.getElementById("soc").checked == true) {
      CARG += 1
}

var pCARG = 100 / (1+ Math.exp (2.055 - CARG * 0.3002))

// // Outputs CARG to index.html
document.getElementById("promptCARG").innerHTML = "CARG score: ";
document.getElementById("CARG_out").innerHTML =CARG;
document.getElementById("promptpCARG").innerHTML = "Risk of chemotherapay toxicity:";
document.getElementById("pCARG_out").innerHTML = Math.round(pCARG);
document.getElementById("CARG%").innerHTML = "%"

// Charlson scoring
var Charlson = 0
if (document.getElementById("MI").checked == true) {
    Charlson += 1
}
if (document.getElementById("HF").checked == true) {
    Charlson += 1
}
if (document.getElementById("PVD").checked == true) {
     Charlson += 1
}
if (document.getElementById("CVD").checked == true) {
    Charlson += 1
}
if (document.getElementById("Dem").checked == true) {
    Charlson += 1
}
if (document.getElementById("CPD").checked == true) {
    Charlson += 1
}
if (document.getElementById("CTD").checked == true) {
    Charlson += 1
}
if (document.getElementById("UD").checked == true) {
    Charlson += 1
}
if (document.getElementById("MLD").checked == true) {
    Charlson += 1
}
if (document.getElementById("DM").checked == true) {
    Charlson += 1
}
if (document.getElementById("HEMI").checked == true) {
    Charlson += 2
}
if (document.getElementById("ModRenal").checked == true) {
    Charlson += 2
}
if (document.getElementById("DMend").checked == true) {
    Charlson += 2
}
if (document.getElementById("leuk").checked == true) {
    Charlson += 2
}
if (document.getElementById("lymph").checked == true) {
    Charlson += 2
}
if (document.getElementById("tumor").checked == true) {
    Charlson += 2
}
if (document.getElementById("ModLD").checked == true) {
    Charlson += 3
}
if (document.getElementById("met").checked == true) {
    Charlson += 6
}
if (document.getElementById("AIDS").checked == true) {
    Charlson += 6
}

// // Outputs CARG to index.html
document.getElementById("promptCharlson").innerHTML = "Charlson Comorbidity score: ";
document.getElementById("Charlson_out").innerHTML =Charlson;

// Determines ultimate eligibility
if (age >= 70){
var ELIG = 0
if (wbp < 0.6) {
ELIG += 1
}
if (document.getElementById('ACE').value >=1) {
ELIG += 1
}
if (Charlson >=1) {
ELIG += 1
}
if (pCARG >= 30) {
ELIG += 1
}
if (ELIG >= 1){
  var eligible_out = ["This patient qualifies by meeting", ELIG, "criteria."]
document.getElementById("ElAlert").className = "alert alert-success";
document.getElementById("ElAlert").innerHTML = eligible_out.join(" ")
}
else {
  document.getElementById("ElAlert").className = "alert alert-warning";
  document.getElementById("ElAlert").innerHTML = "This patient does not qualify"
}
}
if (age < 70){
var ELIG = 0
if (wbp < 0.5) {
ELIG += 1
}
if (document.getElementById('ACE').value >=2) {
ELIG += 1
}
if (Charlson >=2) {
ELIG += 1
}
if (pCARG >= 30) {
ELIG += 1
}
if (ELIG >= 2){
  var eligible_out = ["This patient qualifies by meeting", ELIG, "criteria."]
document.getElementById("ElAlert").className = "alert alert-success";
document.getElementById("ElAlert").innerHTML = eligible_out.join(" ")
}
else {
  document.getElementById("ElAlert").className = "alert alert-warning";
  document.getElementById("ElAlert").innerHTML = "This patient does not qualify"
}
}


}
