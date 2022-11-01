 const axios = require('axios');
 const cors = require("cors");

  let schoolArray = [];
 
 async function getData(){

   

        try {
            await axios.get('https://api.collegefootballdata.com/rankings?year=2022&week=8&seasonType=regular',
            
            {headers: { 
                'Content-Type' : 'application/json',   
                'accept' :'application/json',
                'Authorization': 'Bearer gWAxje/I1VJVLWcuTef5cOMXahi04GUjWYzz+qNxCTJAhwqq7959bLb4TYoK5QH5',
                
             
                
                
          }}).then((res) => {
              
              
            
             let test = res.data[0].polls[0].ranks;
             for (let i = 0; i < test.length; i++) {
                schoolArray.push(test[i].school);
             }

       
       
            console.log(schoolArray);
             
             
            })

           
            

            return schoolArray

        }catch(e) {
            console.log(e)
        }
     

        


    } 



    


getData();