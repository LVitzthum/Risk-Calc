$(document).ready(function() {

  $("input").change(function(){
    omega();
  });

  $("*").click(function(){
    omega();
  });

  // Section 1 is minmum;

  // Force selection

  $(".ACETopicBtn").click(function() {
    window.open("https://www.rtog.org/LinkClick.aspx?fileticket=oClaTCMufRA%3D&tabid=290", '_blank');
  });

  function getACE() {
    var ACEVal;
    $( ".ACERadioVal" ).each(function( index , value ) {
      if($(this).prop('checked')) {
        if (index === 4) {
          ACEVal = 9;
        } else {
          ACEVal = index;
        }
      }
    });
    return ACEVal;
  }

  $(".CIRSTopicBtn").click(function() {
    $(this).closest(".CIRSTopic").find(".helpDiv").slideToggle( "fast", function() {});
    console.log('here');
  });

  function calculateCIRS(){
    var CIRSVal = 0;
    $( ".CIRSRadioVal" ).each(function( index , value ) {
      if($(this).prop('checked')) {
        CIRSVal += index % 5;
      }
    });
    return CIRSVal;
  }

  // function displayhelpDiv(type) {
  //   console.log(type);
  //
  //   if (type === "heart") {
  //
  //     console.log('here');
  //
  //     $( "#heartHelp" ).slideToggle( "fast", function() {});
  //    }
  //
  //
  // }



  function omega(){
// Make a Running string to output
var deets_out = 'Name (Last, First):' + '\n' + 'DOB (MM/DD/YYYY):' + '\n'

    // Calculates R
    var age = parseFloat(document.getElementById('age').value);
    var R = -.3135292 * (0.1 * age - 5.72) / .9126 
     deets_out += 'age:' + age + '\n'

    // BMI calc start
    var wt = parseFloat(document.getElementById('weight').value)
    var ht = parseFloat(document.getElementById('height').value)

    // Unit Conversion
    var w_unit = document.getElementById('w_unit').value;
    var h_unit = document.getElementById('h_unit').value;

    if (w_unit == 1) {wt /= 2.20462262};
    if (h_unit == 1) {ht *= 2.54};

    //BMI calc end

    var bmi = wt/Math.pow((ht / 100 ), 2);
    var BMI_int = 1

        if (bmi < 20) {
        BMI_int = 0
    }
    var R = R + .18329 * (BMI_int - 0.1044)  / 0.306
    bmi= Math.round(bmi*100) / 100


     deets_out += 'bmi:' + bmi + '\n'

    //goheres

    var sex = document.getElementById('sex_unit').value;

    // var sex = document.querySelector('input[name="sex"]:checked').value;
    // var sex = document.getElementById('sex').value;

    var ecog = document.getElementById('ECOG').value;

  var ecog_int = 0

    if (ecog > 0) {
      var ecog_int = 1
    }

    var R = R - 0.2386 * ((ecog_int - 0.3643) / 0.4817);

    // R based on tumor primary location
    var loc = document.getElementById('site').value;


    var R = R + 0.176 * ((loc - 0.03985) / .1958)


    // R based on N stage
    var nstage = document.getElementById('nstage').value;


    var R = R - 0.1537 * ((nstage - 0.1461) / 0.3536);

    // Smoking and p16
    var p16 = document.getElementById('p16').value;

    R = R - 0.2368 * ((p16 - 0.5028) / 0.5);
    //  // Calculates omega from Risk score
    var w = Math.exp(R)*1.761;

    var wp = w / (w + 1);

    // rounds omega to nearest to 2 decimels
    var wp = Math.round(wp * 100) / 100;

    // Age Output
    document.getElementById("AGE1").innerHTML = age;
    document.getElementById("AGE2").innerHTML = age;

    // If there is insufficient input an error message is created
    // if (!wb) {
    // document.getElementById("prompt1").innerHTML = "There is insufficient information to calculate the ω score";
    //   }
    //  else {
    // Outputs to index.html
    // document.getElementById("prompt1").innerHTML = "GCE ω score (blind to race and gender): ";
    document.getElementById("omega_out").innerHTML = wp;

  // Output autofilled info for GCE model
$("#age_gce").text(age)
$("#ECOG_gce").text(ecog)
$("#BMI_gce").text(bmi)

    // document.getElementById("prompt2").innerHTML = "GCE ω score (w/ race and gender): ";
    // document.getElementById("omega2_out").innerHTML = wp;
    // }

    // // CARG scoring Tool //
    // // calculates GFR IN mL/min based on Cockcroft model which is different than the Jeliffe formula used in CARG paper
    //
    // var gndr = 1;
    // if (sex == 1) gndr = 0.85;
    //
    var cr = parseFloat(document.getElementById('cr').value);
    //
    // var gfr = (gndr * (140 - age)) * wt / 72 / cr;
    // var gfr = Math.round(gfr * 100) / 100

    // Jeliffe model taken from CARG website
var we = 0;
//male
if (sex == 0) {
    we = 50;
    //female
} else if (sex == 1) {
    we = 45.5;
}

// Calculates ideal body weight
var ibw = we + 2.3*(ht * 0.3937 - 60);

//Body Surface Area (BSA) = (ideal body weight (kg)^0.425) &times; (height (cm)^0.725) &times; 0.007184
var bodySA = Math.pow(ibw, 0.425) * Math.pow(ht, 0.725) * 0.007184;

//Male ((9.8-0.8(age-20)) X(BSA/1.73))/serum creatinine
//Female((9.8-0.8(age-20)) X 0.9 X (BSA/1.73))/serum creatinine
var ccl = parseFloat(0);
if (sex == 0) {
  ccl = ((98 - (0.8 * (age - 20))) * (bodySA / 1.73)) / cr;
  ccl = Math.round(ccl*10) / 10;

} else {
  ccl = ((98 - (0.8 * (age - 20))) * 0.9 * (bodySA / 1.73)) / cr;
ccl = Math.round(ccl*10) / 10;
}

// Cockroft-Gault formula
if (sex == 1){
var CGF = 0.85*(140-age) / cr * wt / 72
}
else if (sex ==0){
  var CGF = (140-age) / cr * wt / 72
}
CGF = Math.round(CGF*10) / 10;


deets_out += 'Cr Clearance (Jeliffe):' + ccl + '\n'
deets_out += 'Cr Clearance (Cockroft-Gault):' + CGF + '\n'

    if (!ccl) {
      document.getElementById("CRC1").innerHTML = "Invalid Inputs";
      // document.getElementById("CRC2").innerHTML = "Invalid Inputs";
    } else {
      document.getElementById("CRC1").innerHTML = ccl;
      document.getElementById("CRC2").innerHTML = ccl;
      document.getElementById("CRC3").innerHTML = CGF;

    }
    // BMI output
    if (!bmi) {
      document.getElementById("BMI1").innerHTML = "Invalid Inputs";
      //  document.getElementById("BMI2").innerHTML = "Invalid Inputs";
    } else {
      document.getElementById("BMI1").innerHTML = bmi;
      // document.getElementById("BMI2").innerHTML = bmi;
    }

    var CARG = 0;
    if (ccl < 34) CARG = 3;

    // Adds up CARG values
    if (age >= 72) CARG += 2;

    if (document.getElementById("anemia").checked) CARG += 3;
    if (document.getElementById("fall").checked) CARG += 3;
    if (document.getElementById("hear").checked) CARG += 2;
    if (document.getElementById("walk").checked) CARG += 2;
    if (document.getElementById("meds").checked) CARG += 1;
    if (document.getElementById("soc").checked) CARG += 1;

    var pCARG = 100 / (1+ Math.exp (2.055 - CARG * 0.3002));

    // // Outputs CARG to index.html
    // document.getElementById("promptCARG").innerHTML = "CARG score: ";
    document.getElementById("CARG_out").innerHTML = "<div class = 'medtxt'>" + Math.round(pCARG) + "%" +"<small>" + "(" + CARG + ")" + "</small>"+ "</div>";
    // document.getElementById("promptpCARG").innerHTML = "Risk of chemotherapy toxicity:";
    // document.getElementById("pCARG_out").innerHTML = Math.round(pCARG);
    // document.getElementById("CARG%").innerHTML = "%"

    // Charlson scoring
    var Charlson = 0
    if (document.getElementById("MI").checked) Charlson += 1;
    if (document.getElementById("HF").checked) Charlson += 1;
    if (document.getElementById("PVD").checked) Charlson += 1;
    if (document.getElementById("CVD").checked) Charlson += 1;
    if (document.getElementById("Dem").checked) Charlson += 1;
    if (document.getElementById("CPD").checked) Charlson += 1;
    if (document.getElementById("CTD").checked) Charlson += 1;
    if (document.getElementById("UD").checked) Charlson += 1;
    if (document.getElementById("MLD").checked) Charlson += 1;
    if (document.getElementById("DM").checked) Charlson += 1;
    if (document.getElementById("HEMI").checked) Charlson += 2;
    if (document.getElementById("ModRenal").checked) Charlson += 2;
    if (document.getElementById("DMend").checked) Charlson += 2;
    if (document.getElementById("AIDS").checked) Charlson += 6;

    // // Outputs CARG to index.html
    // document.getElementById("promptCharlson").innerHTML = "Charlson Comorbidity score: ";
    document.getElementById("Charlson_out").innerHTML =Charlson;

    // Calculates G8 Score //
    var food = parseFloat( document.getElementById('Food').value);
    var wl = parseFloat( document.getElementById('WL').value);
    var mob = parseFloat(document.getElementById('Mob').value);
    var psy = parseFloat(document.getElementById('Psy').value);
    var rx = parseFloat(document.getElementById('Rx').value);
    var self = parseFloat(document.getElementById('Self').value);

    var g8age = 0;
    if (age <= 85 && age >= 80) g8age = 1;
    if (age < 80) g8age = 2;

    var g8BMI = 0;
    if (bmi < 21 && bmi >= 19) g8BMI = 1;
    if (bmi < 23 && bmi >= 21) g8BMI = 2;
    if (bmi >= 23) g8BMI = 3;

    var g8 = food + wl + mob + psy + rx + self + g8age + g8BMI;
    // Outputs G8 Score //
    document.getElementById("G8Score").innerHTML =g8;

    // GETS CIRS-G and ACE and outputs them//

    var cirs = calculateCIRS();
    var ace = getACE();

    if (ace === undefined) {
      ace = '-';
    }

    document.getElementById("aceout").innerHTML = ace



    //var ace = document.getElementById('CIRS').value
    document.getElementById("cirsout").innerHTML = cirs;
// !!!!NEW BUTTON FEATURE!!!!
    $("#calcelg").click(function(){

    if (age >= 70){
      var ELIG = 0;

      if (wp < 0.6) ELIG += 1;
      if (ace >= 1) ELIG += 1;
      if (cirs >= 6) ELIG += 1;
      if (Charlson >=1) ELIG += 1;
      if (pCARG >= 20) ELIG += 1;
      if (g8 <= 14) ELIG += 1;

      if (ELIG >= 1){
        var eligible_out = ["Qualifies by ", ELIG, "criteria."]
        document.getElementById("elgout").innerHTML = eligible_out.join(" ")
      }
       else if (document.getElementById("AST").checked) {
        var eligible_out = ["Qualifies by Cisplatin Contraindication"]
        document.getElementById("elgout").innerHTML = eligible_out

      }
      else if (document.getElementById("Bili").checked) {
       var eligible_out = ["Qualifies by Cisplatin Contraindication"]
       document.getElementById("elgout").innerHTML = eligible_out

     }
     else if (document.getElementById("pneuro").checked) {
      var eligible_out = ["Qualifies by Cisplatin Contraindication"]
      document.getElementById("elgout").innerHTML = eligible_out

    }
    else if (document.getElementById("hearloss").checked) {
     var eligible_out = ["Qualifies by Cisplatin Contraindication"]
     document.getElementById("elgout").innerHTML = eligible_out

   }
   else if (document.getElementById("AST").checked) {
    var eligible_out = ["Qualifies by Cisplatin Contraindication"]
    document.getElementById("elgout").innerHTML = eligible_out

  }
  else if (ecog > 1) {
   var eligible_out = ["Qualifies by Cisplatin Contraindication"]
   document.getElementById("elgout").innerHTML = eligible_out

 }
 else if (CGF < 60) {
  var eligible_out = ["Qualifies by Cisplatin Contraindication"]
  document.getElementById("elgout").innerHTML = eligible_out

}
      else {
        document.getElementById("elgout").innerHTML = "Does not qualify"
      }
    } else {
      var ELIG = 0
      if (wp < 0.5) ELIG += 1;
      if (ace >=2) ELIG += 1;
      if (Charlson >= 2) ELIG += 1;
      if (pCARG >= 29) ELIG += 1;
      if (cirs >= 6) ELIG += 1;
      if (g8 <= 14) ELIG += 1;

      if (ELIG >= 2) {
        var eligible_out = ["Qualifies by ", ELIG, "criteria."]
        // document.getElementById("ElAlert").className = "alert alert-success";
        document.getElementById("elgout").innerHTML = eligible_out.join(" ")
      }
      else if (document.getElementById("AST").checked) {
       var eligible_out = ["Qualifies by Cisplatin Contraindication"]
       document.getElementById("elgout").innerHTML = eligible_out

     }
     else if (document.getElementById("Bili").checked) {
      var eligible_out = ["Qualifies by Cisplatin Contraindication"]
      document.getElementById("elgout").innerHTML = eligible_out

    }
    else if (document.getElementById("pneuro").checked) {
     var eligible_out = ["Qualifies by Cisplatin Contraindication"]
     document.getElementById("elgout").innerHTML = eligible_out

   }
   else if (document.getElementById("hearloss").checked) {
    var eligible_out = ["Qualifies by Cisplatin Contraindication"]
    document.getElementById("elgout").innerHTML = eligible_out

  }
  else if (document.getElementById("AST").checked) {
   var eligible_out = ["Qualifies by Cisplatin Contraindication"]
   document.getElementById("elgout").innerHTML = eligible_out

 }
 else if (ecog > 1) {
  var eligible_out = ["Qualifies by Cisplatin Contraindication"]
  document.getElementById("elgout").innerHTML = eligible_out

}
else if (CGF < 60) {
 var eligible_out = ["Qualifies by Cisplatin Contraindication"]
 document.getElementById("elgout").innerHTML = eligible_out

}
      else {
        // document.getElementById("ElAlert").className = "alert alert-warning";
        document.getElementById("elgout").innerHTML = "Does not qualify"
      }
    }
  });
    // Output those details
    deets_out += 'GCE ω:' + wp + '\n'
    deets_out += 'CARG Score:' + CARG + '\n'
    deets_out += 'CCI Score:' + Charlson + '\n'
    deets_out += 'G8 Score:' + g8 + '\n'
    deets_out += 'CIRS-G Score:' + cirs + '\n'
    deets_out += 'ACE-27 Score:' + ace + '\n'


    $("#deets").val(deets_out);

  }


  //
  // Determines ultimate eligibility //
  function elig() {

    if (age >= 70){
      var ELIG = 0;

      if (wp < 0.6) ELIG += 1;
      if (ace >= 1) ELIG += 1;
      if (cirs >= 6) ELIG += 1;
      if (Charlson >=1) ELIG += 1;
      if (pCARG >= 30) ELIG += 1;
      if (g8 <= 14) ELIG += 1;

      if (ELIG >= 1){
        var eligible_out = ["This patient qualifies by meeting", ELIG, "criteria."]
        document.getElementById("elgout").innerHTML = eligible_out.join(" ")
      } else {
        document.getElementById("elgout").innerHTML = "This patient does not qualify"
      }
    } else {
      var ELIG = 0
      if (wp < 0.5) ELIG += 1;
      if (ace >= 2) ELIG += 1;
      if (Charlson >=2) ELIG += 1;
      if (pCARG >= 30) ELIG += 1;
      if (cirs >= 6) ELIG += 1;
      if (g8 <= 14) ELIG += 1;

      if (ELIG >= 2) {
        var eligible_out = ["This patient qualifies by meeting", ELIG, "criteria."]
        // document.getElementById("ElAlert").className = "alert alert-success";
        document.getElementById("elgout").innerHTML = eligible_out.join(" ")
      } else {
        // document.getElementById("ElAlert").className = "alert alert-warning";
        document.getElementById("elgout").innerHTML = "This patient does not qualify"
      }
    }


  }

});
