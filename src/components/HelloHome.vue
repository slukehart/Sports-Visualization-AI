<template>
    <h1 style="font-family: proximaNovaBlack; color: black">API </h1>
</template>

<script>


import axios from 'axios';


export default{
    name: 'HelloHome',
    data(){
        return {
            parts: []
        }
    },
    mounted() {
         

                console.log("Hello ")


            let res =  axios('https://api.collegefootballdata.com/rankings?year=2022&week=7&seasonType=regular',{
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer gWAxje/I1VJVLWcuTef5cOMXahi04GUjWYzz+qNxCTJAhwqq7959bLb4TYoK5QH5',
  
  
            }

            })

            let data = JSON.stringify(res.data);
            console.log(data)


            return data;

            
        }

    }

</script>

<style>


</style>