$("#myform").validate({
    
});

function calculate(){
    "use strict"
    let form = $("#myform");


     if (form.valid()){

        let Fromvalue = document.getElementById("fromvalue").value;
        let Fromunit = "";

    
        if (document.getElementById("fromcentimeters").checked){
            Fromunit = "cm";
        }
            else if (document.getElementById("frommeters").checked){
                Fromunit = "m";
        }
        
            else if (document.getElementById("fromkilometers").checked){
                Fromunit = "km";
        }

            else if (document.getElementById("frominches").checked){
                Fromunit = "in";
        }

            else if (document.getElementById("fromfeet").checked){
                Fromunit = "ft";
        }
            else if (document.getElementById("fromyards").checked){
                Fromunit = "yd";
        }
            else if (document.getElementById("frommiles").checked){
                Fromunit = "mi";
        }
        
        let Tounit="";

        if (document.getElementById("tocentimenters").checked){
            Tounit = "cm";
        }
            else if (document.getElementById("tometers").checked){
                Tounit = "m";
        }

            else if (document.getElementById("tokilometers").checked){
                Tounit = "km";
        }

            else if (document.getElementById("toinches").checked){
                Tounit = "in";
        }

            else if (document.getElementById("tofeet").checked){
                Tounit = "ft";
        }
            else if (document.getElementById("toyards").checked){
                Tounit = "yd";
        }
            else if (document.getElementById("tomiles").checked){
                Tounit = "mi";
        } 
        
        ConvertUnits(Fromvalue,Fromunit, Tounit);
     }
}

        async function ConvertUnits(Fromvalue, Fromunit, Tounit){
            "use strict";
            let bruceUrl = " https://brucebauer.info/assets/ITEC3650/unitsconversion.php";
            bruceUrl= bruceUrl+ "?FromValue=" + encodeURIComponent(Fromvalue) + "&FromUnit=" + encodeURIComponent(Fromunit) + "&ToUnit=" + encodeURIComponent(Tounit);

            let response = await fetch (bruceUrl);
            let result = await response.json();

            document.getElementById("tovalue").innerHTML=result;

        }

        function clearform(){
            "use strict";
            document.getElementById("fromvalue").value="";

            document.getElementById("fromcentimeters").checked = false;
            document.getElementById("frommeters").checked = false;
            document.getElementById("fromkilometers").checked = false;
            document.getElementById("frominches").checked = false;
            document.getElementById("fromfeet").checked = false;
            document.getElementById("fromyards").checked = false;
            document.getElementById("frommiles").checked = false;

            document.getElementById("tocentimenters").checked = false;
            document.getElementById("tometers").checked = false;
            document.getElementById("tokilometers").checked = false; 
            document.getElementById("toinches").checked = false;
            document.getElementById("tofeet").checked = false; 
            document.getElementById("toyards").checked = false; 
            document.getElementById("tomiles").checked = false; 

            document.getElementById("tovalue").innerHTML="";

        }