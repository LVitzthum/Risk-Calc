

function omega(){
 // Calculates R from omega
 var age = parseFloat(document.getElementById('age').value);
  var R =(age-60)/10*-0.12564;

// BMI calc start
var wt = parseFloat(document.getElementById('weight').value)
var ht = parseFloat(document.getElementById('height').value)
var bmi = wt/Math.pow(ht, 2);
//BMI calc end
var R = R + (bmi-26.5)/5 *-0.01726

var sex = document.querySelector('input[name="sex"]:checked').value;
// var sex = document.getElementById('sex').value;
var R = R + sex*0.03084 ;

var race = document.getElementById('race').value;
var R = R + race*0.00910 ;

var income = document.getElementById('income').value;
var R = R + income*0.06524;

var ed = document.getElementById('ed').value;
var R = R + ed*0.00341;

var mar = document.getElementById('mar').value;
var R = R + mar*0.03904;

var ecog = document.getElementById('ECOG').value;
var R = R + ecog*-0.01845;

// R based on tumor primary location
var loc = document.getElementById('site').value;
if (loc == 0) {
  var R = R + -0.01883;
}
else if (loc == 1) {
var R = R + -0.01956
}
else if (loc == 2) {
var R = R + 0.00214
}

// R based on T stage
var tstage = document.getElementById('tstage').value;
if (tstage == 0) {
  var R = R + -0.04377;
}
else if (tstage == 2) {
var R = R + 0.06533
 }
// R based on N stage
var nstage = document.getElementById('nstage').value;
if (nstage == 0) {
  var R = R + -0.05272;
}
else if (nstage == 2) {
var R = R + -0.00506
 }
//  // Calculates omega from Risk score
var w = Math.exp(R)*0.6431;
// rounds omega to nearest to 2 decimels
var w = Math.round(w * 100) / 100
 // Outputs to index.html
 document.getElementById("prompt1").innerHTML = "The ω score for this patient is";
 document.getElementById("omega_out").innerHTML =w;

}
