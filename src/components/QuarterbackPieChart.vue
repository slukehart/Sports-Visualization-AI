<template>
  <div id="col-body"> </div>
<!--  <p style="color: white">{{quarterBackList}}</p>-->


</template>

<script>
import * as d3 from 'd3';
import { select } from 'd3-selection';
import {createCommentVNode} from "vue";



export default {

  name: 'QuarterbackPieChart',
  data() {
    return {
      quarterBackList: []
    }
  },

  methods: {
    async getQuarterBackCompletion() {
      let qbObj = {}
      const res = await fetch('http://localhost:8080/passingcompletion')
      try {
        this.quarterBackList = await res.json();
        console.log(this.quarterBackList[0].name)

      } catch (e) {
        console.log("error " + e);
      }

      return this.quarterBackList;

    },

    async generateChart() {
      let data = await this.getQuarterBackCompletion();

      console.log(JSON.stringify(data));
      data.sort((a, b) => a.PCT - b.PCT)
      console.log(JSON.stringify(data));

      let pctArray =[];
      let margin = { top: 20, right: 20, bottom: 60, left: 80 };
      let width = 1100 - margin.left - margin.right;
      let height = 550 - margin.top - margin.bottom;
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
          .attr("transform", "rotate(-90)")
          .attr("x", -(height/2))
          .attr("y", 25)
          .style("text-anchor", "middle")
          .style('margin-left', '30px')
          .text("Quarterback Percentage out of 100");
      svg.append("text")
          .attr("x", width/2)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .text("NCAA Quarterback Completion Percentage for Quarterbacks With Over 75 completions for the 2022 Season");
      svg.append("text")
          .attr('x', width/2).attr('y', height + 60).style("text-anchor", "middle")
          .style('margin-left', '30px')
          .text("Amount of Players With Over 75 Completions for the Season");

      let chartContainer = svg.append('g') // create a new container element
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // shift the container to account for the margins

// create a y-scale based on your data range
      let yScale = d3.scaleLinear()
          .domain([0, 100])
          .range([height, 0]);
      let maxXValue = data.length;
      const xScale = d3.scaleLinear()
          .domain([0, maxXValue])
          .range([0, width]);

// create a left-aligned y-axis based on your y-scale
      let yAxis = d3.axisLeft(yScale);
      let xAxis = d3.axisBottom(xScale);

      chartContainer.append('g') // append the y-axis to the container
          .attr('class', 'y-axis')
          .call(yAxis);
      chartContainer.append('g') // append the y-axis to the container
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);

      chartContainer.selectAll('rect')
          .data(pctArray)
          .enter()
          .append('rect')
          .attr("x", (d, i) => xScale(i))
          .attr("y", (d, i) => yScale(d)) // use yScale to map the data to pixel coordinates
          .attr("width", xScale(1) - xScale(0))
          .attr("height", (d, i) =>  height - yScale(d))
          .attr('fill', 'steelblue')
          .on('mouseover', function(d, i, nodes) {
            let value;


            d3.select(this).attr("fill", "red").html(d).text(function (d, i, nodes){
              value = nodes[i].__data__ ; //get the value of the element that is setting the height of rect
              return value;
            })

            let index = pctArray.indexOf(d3.select(this).data()[0]); //identify the data source based on the first value that is stored in data()
            let correspondingData = data[index];
            chartContainer.selectAll('rect:not(:hover)')
                .attr('opacity', .4);// set opacity of non-hovered elements to 0.4 (partially opaque)
            //display value of the hovered element in a tooltip
        tooltip.style('opacity', 1)
            .html(d).attr("text-anchor", "middle")
            .text("Name: " + correspondingData.name + "\nTeam: " + correspondingData.team + "\nCompletion Percentage: " + value + "%")
      })
          .on('mouseout', function() {
            d3.select(this).attr("fill", "steelblue");
                 // set opacity of hovered element back to 0.8 (partially opaque)
            chartContainer.selectAll('rect')
                .attr('opacity', 1); // set opacity of all elements back to 0.8 (partially opaque)
            // hide the tooltip
            tooltip.style('opacity', 0);
          });
      let tooltip = d3.select('#col-body')
          .append('div')
          .style('position', 'absolute')
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