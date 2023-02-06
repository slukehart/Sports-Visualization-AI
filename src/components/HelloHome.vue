<template xmlns="http://www.w3.org/1999/html" >
     <h1 style="font-family: proximaNovaBlack; color: black;"> Top 25 Rankings </h1>

  <table style="margin-left: 20px; margin-bottom: 20px">
    <tr  v-for="(currentTeam, index, item) in teamsPreviousRank" :key="currentTeam" >
    <td>
    <tr v-if="currentTeam > item"> {{item + 1}} {{ index }}
      <font-awesome-icon id = "icon" icon="fa-solid fa-arrow-up"  @mouseenter="showSpan(index)" @mouseleave="hideSpan(index)" style="color: green;" />
      <span v-show="showSpanIndex === index"  class="hidden-text"> previous rank: {{ currentTeam + 1 }}</span></tr>
    <tr v-else-if="currentTeam < item"> {{item + 1}} {{ index }}
      <font-awesome-icon id = "icon" icon="fa-solid fa-arrow-down" @mouseenter="showSpan(index)" @mouseleave="hideSpan(index)" style="color: red;" />
      <span v-show="showSpanIndex === index"  class="hidden-text"> previous rank: {{ currentTeam + 1 }}</span> </tr>
    <tr v-else-if="currentTeam === item"> {{item + 1}} {{ index }}
      <font-awesome-icon id = "icon" icon="fa-solid fa-minus" @mouseenter="showSpan(index)" @mouseleave="hideSpan(index)"/>    <span v-show="showSpanIndex === index"  class="hidden-text"> Same Rank</span></tr>
    <tr v-else> {{item + 1}} {{ index }}
      <font-awesome-icon id = "icon" icon="fa-solid fa-minus" @mouseenter="showSpan(index)" @mouseleave="hideSpan(index)"/>   <span v-show="showSpanIndex === index"  class="hidden-text"> Previously Not in top 25</span>
    </tr>
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
            location: {},
            teamsPreviousRank:{},
            showSpanIndex: null,
        };
       
        
    },
    setup () {
      return {}

    },
    computed: {
      columns() {
        return this.teamsPreviousRank.reduce((acc, currentTeam, index) => {
          const rowIndex = Math.floor(index / 5);
          if (!acc[rowIndex]) {
            acc[rowIndex] = [];
          }
          acc[rowIndex].push(currentTeam);
          return acc;
        }, []);
      }

  },
    async mounted(){
       await this.getDataOfCurrent();
        await this.getDataOfLast();
       await  this.findLocation();
       await  this.createMapArray();
       
       
        

    },
  methods: {

    async getDataOfCurrent() {
      const res = await fetch('http://localhost:8080/topteams')
      try {
        //console.log("Curr rank" + JSON.stringify(currData));

        this.currentTeams = await res.json();

      } catch (e) {
        console.log("error " + e);
      }

      return this.currentTeams;

    },

    async getDataOfLast() {

      const res = await fetch('http://localhost:8080/previousrank')
      try {
        //console.log("Prev rank" + JSON.stringify(prevData));

        this.prevTeams = await res.json();

      } catch (e) {
        console.log("error " + e);
      }
      return this.prevTeams;

    },
    async findLocation() {
      let currData = await this.getDataOfCurrent();
      let prevTeams = await this.getDataOfLast();
      let currJson = {};
      let prevJson = {};
      let finalJson = {};


      for (let i = 0; i < prevTeams.length; i++) {

        currJson[currData[i]] = i;
        prevJson[prevTeams[i]] = i;


      }

      for (let key in currJson) {
        let current_stand = 0;
        let prev_stand = 0;
        current_stand = currJson[key];
        try {
          prev_stand = prevJson[key];
          if (current_stand > prev_stand) {
            finalJson[key] = 'down';
          } else if (current_stand === prev_stand) {
            finalJson[key] = 'no change'
          } else if (current_stand < prev_stand) {
            finalJson[key] = 'up'
          } else {
            finalJson[key] = "not previously ranked"
          }

        } catch (e) {
          console.log(e)
          //finalJson[key] = "not previously ranked"
        }
      }

      console.log(JSON.stringify(finalJson));

      this.location = finalJson;
      return this.location;

    },
    async createMapArray() {
      let currData = await this.getDataOfCurrent();
      let prevTeams = await this.getDataOfLast();
      let valueMap = {};
      for (let i = 0; i < currData.length; i++) {
        let index = prevTeams.indexOf(currData[i]);
        if (index !== -1) {
          valueMap[currData[i]] = index;
        } else {
          valueMap[currData[i]] = 'Not in top 25 ';
        }
      }
      console.log(JSON.stringify(valueMap));
      this.teamsPreviousRank = valueMap;
      return this.teamsPreviousRank;


    },
    showSpan(index) {
      this.showSpanIndex = index;
    },
    hideSpan() {
      this.showSpanIndex = null;
    }
  }
   
       
}




    
   

              

            
        

    

</script>

<style scoped>

.hidden-text {
  /* some styles for the hover text  */
  position: absolute;
    height: 7%;
    width: 150px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;

    margin-left: 20px;
    padding: 5px;
    border-radius: 5px;
} 


</style>