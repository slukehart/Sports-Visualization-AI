<template>
     <h1 style="font-family: proximaNovaBlack; color: black;"> Top 25 Rankings </h1>

     <table>
    <tr v-for="(currentTeam, index) in currentTeams" :key="currentTeam">
      <td v-if="index % 5 === 0" style="font-family: proximaNovaNormal; padding: 5px;">
       <tr>{{ index + 1 }}. {{ currentTeam }}</tr> 
      </td>
      <td v-else style="font-family: proximaNovaNormal; padding: 5px;">
        <tr>{{ index + 1 }}. {{ currentTeam }}</tr> 
      </td>
    </tr>
  </table>

  
  </template>
  

<script>



export default  {
    name: 'HelloHome',

    data () {
        return{
            
            currentTeams: [],
            prevTeams: [],
            location: new Map()
        };
       
        
    },
    setup () {
      return {}

    },
    computed: {
   
  },
    async mounted(){
        this.getDataOfCurrent();
        this.getDataOfLast();
       
        

    },
  
    created() {
        this.location = this.findLocation(this.currentTeams, this.prevTeams);

    },


    methods:{

        async getDataOfCurrent() {

            const res = await fetch('http://localhost:8080/topteams')
                try{
                let currData = await res.json();
                //console.log("Curr rank" + JSON.stringify(currData));
            
                this.currentTeams = currData;
                
                }catch(e){
                    console.log("error " + e);
                }

                
           
        },

        async getDataOfLast() {
            
            const res = await fetch('http://localhost:8080/previousrank')
                try{
                let prevData = await res.json();
                //console.log("Prev rank" + JSON.stringify(prevData));
                
                this.prevTeams = prevData;
                
                }catch(e){
                    console.log("error " + e);
                }

        },
        findLocation(currentTeams, prevTeams) {
        console.log("Current" + currentTeams.join(', '));
        console.log("Prev" + prevTeams);
        for (let element  of prevTeams) {
            let index = currentTeams.indexOf(element)
            if (index !== -1) {
            this.location.set(element, index)
            }
        }
       console.log(this.location)
       return this.location;
     
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