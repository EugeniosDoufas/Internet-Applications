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
    console.log(col);
    
    console.log(data[0][col[0]]);
    const xlabels=[];  //date
    const ylabels=[];  //1st dose
    
    var date=data[0][col[6]];
    var y=col.length;
    var x=data.length;
    console.log(date,x,y);
    
    var first=[];
    var second=[];
    var total=[];
    
    var temp1=0;
    var temp2=0;
    for (var i = 0; i < x; i++){
    	if ( date=== data[i][col[6]] ){
    		temp1=temp1+data[i][col[2]];
    		temp2=temp2+data[i][col[3]];
    		
    	}
    	
    }
    
    

}


CreateTableFromJSON();