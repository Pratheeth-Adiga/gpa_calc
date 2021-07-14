var count = 0;

function getBranch(obj) {
    //Stores the branch that was selected in the 'branch' label
    document.getElementById('branch').innerHTML = '<b>Branch: ' + obj.getAttribute("href") + '</b>';
    return false;
}

function getSem(obj) {
    //Stores the semester that was selected in the 'sem' label
    document.getElementById('sem').innerHTML = '<b>Semester: ' + obj.getAttribute("href") + '</b>';
    return false;
}

function CreateTableFromJSON() {
    var ele; //A versatile variable which is used to access label elements within each table
    var file = JSON.parse(data); //A variable to access the JSON data
    //Gets the branch that was selected from the label 'branch' and sanitizes the data
    var branch = document.getElementById('branch').innerText.split(" ")[1];
    //Gets the semester that was selected from the label 'sem' and sanitizes the data
    var sem = document.getElementById('sem').innerText.split(" ")[1];
    //Creates a dictionary with access to the courses under the selected branch and semester
    var dict = file[branch][sem];

    // Extract values for table header  
    var col = [];
    for (var i = 0; i < dict.length; i++) {
        for (var key in dict[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Create dynamic table
    document.getElementById("table").innerHTML = "";
    var table = document.getElementById("table");
    // Create HTML header row using the extracted headers from above

    var tr = table.insertRow(-1);                   // Table row

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // Table header
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // Add JSON data to the table as riws
    for (var i = 0; i < dict.length; i++) {

        tr = table.insertRow(-1);
        window.count=i;

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" + dict[i][col[j]] + "</label>";
            //If the value of the key is "cie" then add a number input field with range 0 to 50
            //This is for the 'CIE' field
            if(dict[i][col[j]] == "cie")
            {
                tabCell.innerHTML = "<input type='number' max='50' min='20' id='" + i.toString() + j.toString() + "'>" ;
                ele = document.getElementById(i.toString() + j.toString());
                ele.addEventListener("input", function(e) {
                    if(this.value>50) {
                        alert("Max value reached!");
                        this.value = 50;
                    }
                });
            }
            //If the value of the key is "internship" then add a number input field with range 0 to 100
            //This is for the 'CIE' field
            if(dict[i][col[j]] == "intern")
            {
                tabCell.innerHTML = "<input type='number' max='100' min='20' id='" + i.toString() + j.toString() + "'>" ;
                ele = document.getElementById(i.toString() + j.toString());
                ele.addEventListener("input", function(e) {
                    if(this.value>100) {
                        alert("Max value reached!");
                        this.value = 100;
                    }
                });
            }
            //If the value of the key is "see" then add a number input field with range 0 to 50
            //This is for the 'SEE' field
            if(dict[i][col[j]] == "see")
            {
                tabCell.innerHTML = "<input type='number' max='50' min='20' id='" + i.toString() + j.toString() + "'>" ;
                ele = document.getElementById(i.toString() + j.toString());
                ele.addEventListener("input", function(e) {
                    if(this.value>50) {
                        alert("Max value reached! ");
                        this.value = 50;
                    }
                });
            }
            //If the value of the key is "total" then add a blank label with ij as the id
            //This is for the 'Total' field
            if(dict[i][col[j]] == "total")
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" ;
                
            //If the value of the key is "grade" then add a blank label with ij as the id
            //This is for the 'Grade' field
            if(dict[i][col[j]] == "grade")
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" ;
            
            //If the value of the key is "gp" then add a blank label with ij as the id
            //This is for the 'Grade Point' field
            if(dict[i][col[j]] == "gp")
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" ;
            
            //If the value of the key is "cp" then add a blank label with ij as the id
            //This is for the 'Credit Point' field
            if(dict[i][col[j]] == "cp")
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" ;
            
            //If the value of the previous key is "True" then add a blank label with ij as the id
            //This is for editing SEE field based on the CIE Only field
            if(dict[i][col[j-1]] == "True")
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'></label>";
            
            //If the value of the key is "---" then add a label with "---" as the text and ij as the id
            //This is for the internship data
            if(dict[i][col[j]] == "---")
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>---</label>";
        }
    }
    // Finally add the created table with the JSON data to a container
    var divContainer = document.getElementById("main");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    // Add a 'Calculate' button
    document.getElementById("right").innerHTML = "<br><br><button type='button' onclick='calculateGpa()' class='btn btn-success'>Calculate</button><br><label id='result' style='color: #fff;'></label>";
}

function calculateGpa()
{
    var result; //A variable to store the total after computing it
    var total; //A variable to extract the total from the 'Total' field
    var g; //A variable to access the 'Grade' field
    var gp; //A variable to access the 'Grade Point' field
    var cred; //A variable to access the 'Credit' field
    var cp; //A variable to access the 'Credit Point' field
    var gpres=0; //A variable to extract the grade point from the 'Grade Point' field
    var credres = 0; //A variable to extract the credit point from the 'Credit Point' field
    var total_credits=0; //A variable to store the result of computing the total number of credits
    var total_credpoints=0; //A variable to store the result of computing the total number of credit points
    var total_score=0; //A variable to store the result of computing the total score
    var sgpa = 0; //A variable to store the result of computing the sgpa

    //Iteratively access the rows
    for(let i=0;i<=count;i++)
    {
        // Check if the 'SEE' field (7th column (j=6)) has "---" as its value
        if(document.getElementById(i.toString()+"6").innerHTML == "---")
            // Take the value from the 'CIE' field (5th column (j=4))
            result = parseFloat(document.getElementById(i.toString()+"4").value);

        else
            // Take the value from the 'CIE' field (5th column (j=4)) and add it to the value 
            // obtained by taking the value from the 'SEE' field (7th column (j=6))
            result = parseFloat(document.getElementById(i.toString()+"4").value)+parseFloat(document.getElementById(i.toString()+"6").value);
        
        // If the SEE field does not have a numerical input box store the value from the 'CIE' field in it
        // and double the value of the CIE field and store it in the 'Total' field (8th column (j=7))
        if (isNaN(result))
        {
            document.getElementById(i.toString()+"7").innerHTML = parseFloat(document.getElementById(i.toString()+"4").value)*2;
            document.getElementById(i.toString()+"6").innerHTML = document.getElementById(i.toString()+"4").value;
        }
        else
            // Store the value which is set in result (Case: When both 'SEE' and 'CIE' have numerical input)
            document.getElementById(i.toString()+"7").innerHTML = result;

    }

    // Compute and store corresponding values in said variables
    for (let i = 0; i <= count; i++) {
        total = parseFloat(document.getElementById(i.toString()+"7").innerHTML);
        g = document.getElementById(i.toString()+"8");
        cred = document.getElementById(i.toString()+"3");
        gp = document.getElementById(i.toString()+"9");
        cp = document.getElementById(i.toString()+"10");
        if(total>=90){
          g.innerHTML="S";
          gp.innerHTML="10";
        }
        else if(total>=75){
          g.innerHTML="A";
          gp.innerHTML="9";
        }
        else if(total>=60){
          g.innerHTML="B";
          gp.innerHTML="8";
        }
        else if(total>=50){
          g.innerHTML="C";
          gp.innerHTML="7";
        }
        else if(total>=45){
          g.innerHTML="D";
          gp.innerHTML="5";
        }
        else if(total>=40){
          g.innerHTML="E";
          gp.innerHTML="4";
        }
        else if(total>0){
          g.innerHTML="F";
          gp.innerHTML="0";
        }
        credres = parseFloat(cred.innerHTML);
        gpres = parseFloat(gp.innerHTML);
        cp.innerHTML = gpres*credres;
        total_credits += credres;
        total_credpoints += gpres*credres;
        total_score += total;
    }
    sgpa = total_credpoints/total_credits;

    // Display the result
    document.getElementById("result").innerHTML = "<br><br>Total: " + total_score + "<br><br>Total Credits: " + total_credits + "<br><br>Your Total Credits: " + total_credits + "<br><br>SGPA: " + sgpa ;
}