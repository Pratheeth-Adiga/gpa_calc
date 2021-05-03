var count = 0;

function getBranch(obj) {
    document.getElementById('branch').innerHTML = 'Branch: ' + obj.getAttribute("href");
    return false;
}

function getSem(obj) {
    document.getElementById('sem').innerHTML = 'Semester: ' + obj.getAttribute("href");
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
            if(dict[i][col[j]] == "20")
            {
                tabCell.innerHTML = "<label id='" + i.toString() + j.toString() + "'>20</label>" ;
            }
        
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("main");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    document.getElementById("right").innerHTML = "<br><br><button type='button' onclick='calculateGpa()' class='btn btn-success'>Calculate</button><label id='result'></label>";
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
         result = parseInt(document.getElementById(i.toString()+"4").value)+parseInt(document.getElementById(i.toString()+"6").value);
         if (isNaN(result))
            document.getElementById(i.toString()+"7").innerHTML = parseInt(document.getElementById(i.toString()+"4").value)+parseInt(document.getElementById(i.toString()+"6").innerHTML);
        else
            document.getElementById(i.toString()+"7").innerHTML = result;
         // 7 refers to column 7
    }

    for (let i = 0; i <= count; i++) {
        total = parseInt(document.getElementById(i.toString()+"7").innerHTML);
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
        credres = parseInt(cred.innerHTML);
        gpres = parseInt(gp.innerHTML);
        cp.innerHTML = gpres*credres;
        total_credits += credres;
        total_credpoints += gpres*credres;
        total_score += total;
    }
    per = total_score/(count+1);
    sgpa = total_credpoints/total_credits;
    document.getElementById("result").innerHTML = "<br><br>Percentage: " + per + "<br><br>SGPA: " + sgpa;

}