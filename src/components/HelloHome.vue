<template>
     <h1 style="font-family: proximaNovaBlack; color: black;"> Top 25 Rankings </h1>

     <table>
    <tr v-for="(team, index) in teams" :key="team">
      <td v-if="index % 5 === 0" style="font-family: proximaNovaNormal; padding: 5px;">
       <tr>{{ index + 1 }}. {{ team }}</tr> 
      </td>
      <td v-else style="font-family: proximaNovaNormal; padding: 5px;">
        <tr>{{ index + 1 }}. {{ team }}</tr> 
      </td>
    </tr>
  </table>
  </template>
  

<script>


export default  {
    name: 'HelloHome',

    data () {
        return{
            
            teams: []
        };
       
        
    },
    setup () {
      return {}

    },
    computed: {
    groups() {
      const groups = [];
      for (let i = 0; i < this.teams.length; i += 5) {
        groups.push(this.teams.slice(i, i + 5));
      }
      return groups;
    }
  },
    async mounted(){
        this.getData();

    },


    methods:{

        async getData() {

            const res = await fetch('http://localhost:8080/topteams')
                try{
                let data = await res.json();
                console.log(JSON.stringify(data));
                let webP = data
                this.teams = webP;
                
                }catch(e){
                    console.log("error " + e);
                }
           
        }

    }
}




    
   

              

            
        

    

</script>

<style scoped>
.break {
    flex-basis: 100%;
    height: 0;
}


</style>