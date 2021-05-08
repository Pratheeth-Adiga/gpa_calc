var count = 0;

function getBranch(obj) {
    document.getElementById('branch').innerHTML = '<b>Branch: ' + obj.getAttribute("href") + '</b>';
    return false;
}

function getSem(obj) {
    document.getElementById('sem').innerHTML = '<b>Semester: ' + obj.getAttribute("href") + '</b>';
    return false;
}

function CreateTableFromJSON() {
    var ele;
    var cie = [];
    var see = [];
    var file = JSON.parse(data);
    var branch = document.getElementById('branch').innerText.split(" ")[1];
    var sem = document.getElementById('sem').innerText.split(" ")[1];
    var dict = file[branch][sem];

    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < dict.length; i++) {
        for (var key in dict[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    document.getElementById("table").innerHTML = "";
    var table = document.getElementById("table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < dict.length; i++) {

        tr = table.insertRow(-1);
        window.count=i;

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" + dict[i][col[j]] + "</label>";
            if(dict[i][col[j]] == "cie")
            {
                tabCell.innerHTML = "<input type='number' max='50' min='20' id='" + i.toString() + j.toString() + "'>" ;
                ele = document.getElementById(i.toString() + j.toString());
                cie.push(i.toString() + j.toString());
                ele.addEventListener("input", function(e) {
                    if(this.value>50) {
                        alert("Max value reached!");
                        this.value = 50;
                    }
                });
            }
            if(dict[i][col[j]] == "intern")
            {
                tabCell.innerHTML = "<input type='number' max='100' min='20' id='" + i.toString() + j.toString() + "'>" ;
                ele = document.getElementById(i.toString() + j.toString());
                cie.push(i.toString() + j.toString());
                ele.addEventListener("input", function(e) {
                    if(this.value>100) {
                        alert("Max value reached!");
                        this.value = 100;
                    }
                });
            }
            if(dict[i][col[j]] == "see")
            {
                tabCell.innerHTML = "<input type='number' max='50' min='20' id='" + i.toString() + j.toString() + "'>" ;
                ele = document.getElementById(i.toString() + j.toString());
                see.push(i.toString() + j.toString());
                ele.addEventListener("input", function(e) {
                    if(this.value>50) {
                        alert("Max value reached! ");
                        this.value = 50;
                    }
                });
            }
        
            if(dict[i][col[j]] == "total")
            {
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" ;
            }
            if(dict[i][col[j]] == "grade")
            {
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" ;
            }
            if(dict[i][col[j]] == "gp")
            {
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" ;
            }
            if(dict[i][col[j]] == "cp")
            {
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>" ;
            }
            if(dict[i][col[j-1]] == "True")
            {
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'></label>";
            }
            if(dict[i][col[j]] == "---")
            {
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>---</label>";
            }
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("main");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    document.getElementById("right").innerHTML = "<br><br><button type='button' onclick='calculateGpa()' class='btn btn-success'>Calculate</button><br><label id='result' style='color: #fff;'></label>";
}

function calculateGpa()
{
    var result;
    var total;
    var g;
    var gp;
    var cred;
    var cp;
    var gpres=0;
    var credres = 0;
    var total_credits=0;
    var total_credpoints=0;
    var total_score=0;
    var sgpa = 0;
    var per = 0;
    for(let i=0;i<=count;i++)
    {
        if(document.getElementById(i.toString()+"6").innerHTML == "---")
        {
            result = parseFloat(document.getElementById(i.toString()+"4").value);
        }
        else
            result = parseFloat(document.getElementById(i.toString()+"4").value)+parseFloat(document.getElementById(i.toString()+"6").value);
        if (isNaN(result))
        {
            document.getElementById(i.toString()+"7").innerHTML = parseFloat(document.getElementById(i.toString()+"4").value)*2;
            document.getElementById(i.toString()+"6").innerHTML = document.getElementById(i.toString()+"4").value;
        }
        else
            document.getElementById(i.toString()+"7").innerHTML = result;
        // 7 refers to column 7
    }

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
          gp.innerHTML="6";
        }
        else if(total>=40){
          g.innerHTML="E";
          gp.innerHTML="5";
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
    per = total_score/(count+1);
    sgpa = total_credpoints/total_credits;
    document.getElementById("result").innerHTML = "<br><br>Total: " + total_score + "<br><br>Total Creds: " + total_credits + "<br><br>SGPA: " + sgpa ;
}