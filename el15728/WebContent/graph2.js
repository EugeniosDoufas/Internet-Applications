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
    //var count=0;
    var temp1=0;
    var temp2=0;
    for (var i = 0; i < x; i++){
    	if ( date=== data[i][col[6]] ){
    		temp1=temp1+data[i][col[2]];
    		temp2=temp2+data[i][col[3]];
    		
    	}else{
    		xlabels.push(date);
    		first.push(temp1);
    		second.push(temp2);
    		total.push(temp1+temp2);
    	    temp1=0;
    	    temp2=0;
    	    date=data[i][col[6]]
    		
    	}
    	
    }
    console.log(first, second, xlabels	);
    
    var ctx = document.getElementById('chart').getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data:{
        labels: xlabels,
        datasets:[{
        	data:first,
        	label:"first dose",
        	borderColor: "#3e95cd",
            fill: false
        },
        {
        	data:second,
        	label:"second dose",
        	borderColor: "#8e5ea2",
            fill: false
        },
        {
        	data:total,
        	label:"total",
        	borderColor: "#e8c3b9",
            fill: false
        }
        	
        ]
        },  
    options: {
        title: {
            display: true,
            text: 'Data for greece covid vaccination'
          }
        }
      });
    
    

}


CreateTableFromJSON();