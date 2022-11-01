<template>
    <h1 style="font-family: proximaNovaBlack; color: black">API </h1>
</template>

<script>

import axios from 'axios';
//import { schoolArray, getData }from '../components/http'






export default  {
    name: 'HelloHome',

    data () {
        return{
            
        };
       
        
    },
    setup () {
      return {}

    },

    methods:{

          async getData() {
            let schoolArray = [];

            console.log(hello);

        try {
            await axios.get('https://api.sportsdata.io/v3/cfb/scores/json/LeagueHierarchy', 
            {headers: { 
            'Ocp-Apim-Subscription-Key': '	009e5ab66d044f2bbf3de7afe1b7e39f',
            'content-type' : 'application/json',   
            'accept' :'application/json',
            
            
            
      }}).then((res) => {
          
          
        console.log(res);
         let test = res.data[0].polls[0].ranks;
         for (let i = 0; i < test.length; i++) {
            schoolArray.push(test[i].school);
         }

   
   
        console.log(schoolArray);
         
         
        })

       
        

        return schoolArray

        }catch(e) {
            console.log(error.response);
        }
 

    


    } 





    }
}




    
   

              

            
        

    

</script>

<style>


</style>