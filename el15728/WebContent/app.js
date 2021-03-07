src ="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"
const api_url='https://data.gov.gr/api/v1/query/mdg_emvolio' ;
const token = '190bbad12287c4e29c6cc248f2127d1f0579859a';
async function CreateTableFromJSON(){
	const response=await fetch(api_url , {headers: {Authorization: `token ${token}`}});
	const data=await response.json();
	console.log(data);
	

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}






var xmlhttp;
//XMLHttpRequest.onreadystatechange = callback;
function loadDoc(url) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = onComplete;
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}
//0   UNSENT  open() has not been called yet.
//1   OPENED  send() has been called.
//2   HEADERS_RECEIVED    send() has been called, and headers and status are available.
//3   LOADING Downloading; responseText holds partial data.
//4   DONE    The operation is complete.
function onComplete(event) {
	if (xmlhttp.readyState == 4)
		writeContent(xmlhttp.responseText);
}

function writeContent(data) {
	document.getElementById("content").innerHTML = data;
}

function asyncLoadContent(url) {
	writeContent("Please Wait<br/>Loading...");
	loadDoc(url);
}