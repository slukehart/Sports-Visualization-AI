
<template>
  <div style="display: flex; flex-direction: column; align-items: start">
  <div style="display: flex; padding-bottom: 20px;">
    <input id="search-input" class="searchTerm" style="height: 40px; border-color: transparent" v-model="searchName" placeholder="Search">
    <button id="submitButton" class="button-6"> submit</button>
    <button id="clearButton" style="background-color: transparent; border-color: transparent"><font-awesome-icon :icon="['fas', 'xmark']" style="color: #ffffff; background-color: transparent; height: 30px; display: flex"/> </button>
  </div>

  <div id="qb-body">  </div>
<!--  <p style="color: white">{{quarterBackList}}</p>-->

  </div>
</template>

<script>
import * as d3 from 'd3';
import { select } from 'd3-selection';
import {createCommentVNode} from "vue";



export default {

  name: 'QuarterbackBarChart',
  data() {
    return {
      quarterBackList: [],
      searchName: '',
      searchArray: []
    }
  },

  methods: {
    async getQuarterBackCompletion() {

      const res = await fetch('http://localhost:8080/passingcompletion')
      try {
        this.quarterBackList = await res.json();
      // console.log(this.quarterBackList[0].name)

      } catch (e) {
        console.log("error " + e);
      }

      return this.quarterBackList;

    },

    async generateChart() {
      let data = await this.getQuarterBackCompletion();

      // console.log(JSON.stringify(data));
      data.sort((a, b) => a.PCT - b.PCT)
      // console.log(JSON.stringify(data));

      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;
      let pctArray =[];
      window.addEventListener('resize', function(event) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        console.log(windowWidth)



      });

        // Do something with the window width, such as updating the chart

      console.log('Outside Window width: ' + windowWidth);
      let margin = { top: 40, right: 20, bottom: 60, left: 80 };
      let width = ((windowWidth / 2) + 125) - margin.left - margin.right;
      let height = ((windowHeight / 2) + 125) - margin.top - margin.bottom;
     for (let i = 0; i < data.length; i++)  {
          pctArray.push(data[i].PCT * 100)
      }

     pctArray.sort();
     for (let i = 0; i < pctArray.length; i++){
       pctArray[i] = pctArray[i].toFixed(1);
     }


      let svg =  d3.select('#qb-body')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .style('background', "white")
          .style('border-radius', '20px');
      svg.append("text")
          .attr("x", width / 2 + 50)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", (windowWidth / 100) + "px")
          .text("NCAA Quarterback Completion Percentage for Quarterbacks With Over 75 completions for the 2022 Season");
      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -(height/2) - 40)
          .attr("y", 35)
          .style("text-anchor", "middle")
          .style('margin-left', '30px')
          .text("Quarterback Percentage out of 100");
      svg.append("text")
          .attr('x', width / 2 + 50)
          .attr('y', height + 80)
          .style("text-anchor", "middle")
          .style('margin-left', '30px')
          .text("Amount of Players With Over 75 Completions for the Season");

      let chartContainer = svg.append('g') // create a new container element
          .classed('chart-container', true)
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // shift the container to account for the margins

// create a y-scale based on your data range
      let yScale = d3.scaleLinear()
          .domain([0, 100])
          .range([height, 0]);
      let maxXValue = data.length;
      let xScale = d3.scaleLinear()
          .domain([0, maxXValue])
          .range([0, width]);

// create a left-aligned y-axis based on your y-scale
      let yAxis = d3.axisLeft(yScale).tickSizeOuter(0);
      // create a base-aligned x-axis based on your x-scale
      let xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

      chartContainer.append('g') // append the y-axis to the container
          .attr('class', 'y-axis')
          .call(yAxis);
      chartContainer.append('g') // append the y-axis to the container
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);

      chartContainer.selectAll('.bar')
          .data(pctArray)
          .enter()
          .append('rect')
          .classed('bar', true)
          .attr("x", (d, i) => xScale(i))
          .attr("y", (d, i) => yScale(d)) // use yScale to map the data to pixel coordinates
          .attr("width", xScale(1) - xScale(0))
          .attr("height", (d, i) =>  height - yScale(d))
          .attr('fill', '#324F71')
          .on('mouseover', function(d, i, nodes) {
            let value;
            d3.select(this).attr("fill", "red").html(d).text(function (d, i, nodes){
              value = nodes[i].__data__ ; //get the value of the element that is setting the height of rect
              return value;
            })

            let index = pctArray.indexOf(d3.select(this).data()[0]); //identify the data source based on the first value that is stored in data()
            let correspondingData = data[index];
            chartContainer.selectAll('rect:not(:hover)')
                .attr('opacity', .2);// set opacity of non-hovered elements to 0.2 (partially opaque)
            //display value of the hovered element in a tooltip
        tooltip.html(d).attr("text-anchor", "middle").style('opacity', 1)
            .html("Name: " + correspondingData.name + "<br>College: " + correspondingData.team + "<br>Completion Percentage: " + value + "%")

      })
          .on('mouseout', function() {
            d3.select(this).attr("fill", "#324F71");
                 // set opacity of hovered element back to 0.8 (partially opaque)
            chartContainer.selectAll('rect')
                .attr('opacity', 1); // set opacity of all elements back to 0.8 (partially opaque)
            // hide the tooltip
            tooltip.style('opacity', 0);
          });
      let tooltip = d3.select('#qb-body')
          .append('div')
          .classed('tooltip', true)
          .attr("class", "tooltip")
          .style('position', 'relative')
          .style('width', '225px')
          .style('top', '0')
          .style('left', (width - 100) + 'px')
          .style('z-index', '1')
          .style('padding', '10px')
          .style('background', 'steelblue')
          .style('color', 'white')
          .style('border', '1px solid white')
          .style('opacity', 0);

      document.querySelector('#submitButton').addEventListener('click', function (d, i, nodes) {

        const searchQuery = document.querySelector('#search-input').value.toLowerCase();
        console.log(searchQuery);
        const index = data.findIndex(d => d.name.toLowerCase() === searchQuery);
        console.log("Index" + JSON.stringify(data[index]));


        if (index !== -1) {
          // Select corresponding bar element and change color
          const bar = d3.select(`.bar:nth-child(${index + 3})`);
          bar.style('fill', 'red');


          tooltip
              .html("Name: " + data[index].name + "<br>College: " + data[index].team + "<br>Completion Percentage: " + (data[index].PCT * 100).toPrecision(3) + "%").transition().duration(500)
              .attr("text-anchor", "middle")
              .style('opacity', 1);

        }else {
          tooltip.html("Player not found").transition().duration(500).attr("text-anchor", "middle").style('opacity', 1)

          console.log("player not found")
        }


      });
      document.querySelector('#clearButton').addEventListener('click', function () {
        // Reset bar colors
        d3.selectAll('.bar')
            .style('fill', '#324F71');

        // Hide tooltip
        tooltip.style('opacity', 0);
        document.querySelector('#search-input').value = '';
      });


      return svg;

    }




  },
  async mounted() {
    await this.getQuarterBackCompletion();
    await this.generateChart();

  },
}



</script>

<style scoped>
svg {
  font-family: 'Roboto', sans-serif;
  background-color: #222;
}

.y-axis line {
  stroke: #ccc;
}

.y-axis text {
  fill: #ccc;
  font-size: 14px;
}
.x-axis line {
  stroke: #ccc;
}
.x-axis text {
  fill: #ccc;
  font-size: 14px;
}

rect {
  fill: #08f;
  transition: fill 0.2s ease-in-out;
}

rect:hover {
  fill: #f08;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  transition: opacity 0.2s ease-in-out;
}

.tooltip:after {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 8px;
  border-color: transparent rgba(0, 0, 0, 0.8) transparent transparent;
  top: 50%;
  margin-top: -8px;
  left: 100%;
  transform: translateX(8px);
}

.tooltip h3 {
  font-size: 16px;
  margin: 0 0 8px 0;
}

.tooltip p {
  margin: 0;
}


.searchTerm {
  width: 100%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: black;
}


/* CSS */
.button-6 {
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  height: 40px;
  margin: 0 10px 10px 10px;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.button-6:hover,
.button-6:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
  transform: translateY(-1px);
}

.button-6:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}


</style>