<template>
  <div id="col-body"> </div>
<!--  <p style="color: white">{{quarterBackList}}</p>-->


</template>

<script>
import * as d3 from 'd3';
import { select } from 'd3-selection';
import {createCommentVNode} from "vue";



export default {

  name: 'QuarterbackBarChart',
  data() {
    return {
      quarterBackList: []
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

      let pctArray =[];
      let margin = { top: 40, right: 20, bottom: 60, left: 80 };
      let width = 600 - margin.left - margin.right;
      let height = 350 - margin.top - margin.bottom;
     for (let i = 0; i < data.length; i++)  {
          pctArray.push(data[i].PCT * 100)
      }

     pctArray.sort();
     for (let i = 0; i < pctArray.length; i++){
       pctArray[i] = pctArray[i].toFixed(1);
     }


      let svg =  d3.select('#col-body')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .style('background', "white")
          .style('border-radius', '20px');
      svg.append("text")
          .attr("x", width - 200)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "12px")
          .text("NCAA Quarterback Completion Percentage for Quarterbacks With Over 75 completions for the 2022 Season");
      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -(height/2) - 40)
          .attr("y", 35)
          .style("text-anchor", "middle")
          .style('margin-left', '30px')
          .text("Quarterback Percentage out of 100");
      svg.append("text")
          .attr('x', width - 200)
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
            d3.select(this).attr("fill", "#715432").html(d).text(function (d, i, nodes){
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
      let tooltip = d3.select('#col-body')
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

      return svg;

    },


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


</style>