$(document).ready(function (){
    $("#display").click(getcurrency);
    $("#clear").click(clearform);
});

let myChart0; 

async function getcurrency(){
    "use strict";
    let form = $("#myform");

    if(form.valid()){
        let basecurrency = document.getElementById("basecurrency").value;
        let convertcurrency = document.getElementById("convertcurrency").value;
        let apikey = "U35Ne42o9GV4sP5US6EWAi10_gtf1LpB";
        let fromdate = document.getElementById("fromdate").value;
        let todate = document.getElementById("todate").value;

        let mylink = `https://api.polygon.io/v2/aggs/ticker/C:${basecurrency}${convertcurrency}/range/1/day/${fromdate}/${todate}?apiKey=${apikey}`;


        let response = await fetch(mylink);

        if (response.ok){
            let data = await response.json();
            
            if (!data.results || data.results.length == 0){
                alert("No Data found from the currency you've selected");
                return;

            }

            let labels = [];
            let datapoints=[];

            data.results.forEach(item => {
                let dateObj = new Date(item.t);  
                labels.push(`${dateObj.toLocaleString('en-US', { month: 'short' })} ${dateObj.getDate()}`);
                datapoints.push(parseFloat(item.c).toFixed(3));

            });

            console.log("Chart Labels:", labels); 
            console.log("Chart Data Points:", datapoints); 

            let ctx0 = document.getElementById("chartjs-0").getContext('2d');



            if (myChart0){
                myChart0.destroy();
            }
            myChart0 = new Chart (ctx0, {
                type:"line", 
                data: {
                    labels: labels, 
                    datasets: [{ 
                        label: `One (${basecurrency} to ${convertcurrency})`,
                        data: datapoints, 
                        fill: false, 
                        borderColor: "rgb(75, 192, 192)",
                        lineTension: 0.1
                    }]
                }, 
                options: {
                    responsive: true, 
                    maintainAspectRatio: false, 
                    title: {
                        display:true, 
                        text:`${basecurrency} to ${convertcurrency}`
                    },
                    scales:{
                        yAxes: [{
                            scaleLabel: {
                                display: true, 
                                labelString: `${convertcurrency}`
                            },
                        }]
                    }
                }
            });
            
        } else{
            alert("Data not found! Status: " + response.status);
        }
        

    }
}

function clearform(){
    "use strict"; 
    $("#basecurrency").val("");
    $("#convertcurrency").val("");
    $("#fromdate").val("");
    $("#todate").val(""); 

    if (myChart0){
        myChart0.destroy();
        myChart0=null;
    }
    
}