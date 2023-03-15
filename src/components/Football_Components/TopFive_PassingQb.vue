<template>
<div id="top-five-body"></div>


</template>

<script>

import * as d3 from "d3";

export default {
  name: 'TopFive_PassingQb',
  data() {
    return {
      topFiveList: []
    }

  },
  methods: {
    async getTopFive() {
      const res = await fetch('http://localhost:8080/passingyardsqb')
      try{
        this.topFiveList = await res.json();

      }catch(e) {
        console.error("error " + e)
      }
      return this.topFiveList;
    },

    async generateTopChart() {
      let data = await this.getTopFive();
      let dataArray =[];
      console.log(JSON.stringify(data[0].YDS));
      for (let i = 0; i < data.length; i++) {
        dataArray.push(parseInt(data[i].YDS))

      }
console.log(dataArray.reverse())
      dataArray.reverse();
      let margin = {top: 50, right: 90, bottom: 50, left: 140},
          width = 600 - margin.left - margin.right,
          height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
      let svg = d3.select("#top-five-body")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style('background', "white")
          .style('border-radius', '20px');
      svg.append("text")
          .attr("x", width - margin.right + 20)
          .attr("y", margin.top - 20)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .text("Passing Leaders in the 2022 NCAA Season");

      let chartContainer = svg.append('g') // create a new container element
          .classed('chart-container', true)
          .attr('transform','translate(' + (margin.left - 10) + ',' + margin.top + ')');
      let maxYValue = data.length;
      let yScale = d3.scaleBand()
          .domain(data.map(d => d.name))
          .range([0, height])
          .paddingInner(.5)
          .paddingOuter(.5);

      let maxXValue = d3.max(data, d => +d.YDS) + 500;
      console.log(maxXValue)
      let xScale = d3.scaleLinear()
          .domain([0, maxXValue])
          .range([0, width]);
      console.log("Data"+ data[0].YDS)
      console.log(xScale(+data[0].YDS))

// create a left-aligned y-axis based on your y-scale
      let yAxis = d3.axisLeft().scale(yScale).tickSizeOuter(0);
// create a base-aligned x-axis based on your x-scale
      let xAxis = d3.axisBottom().scale(xScale).ticks(5).tickFormat(d => d);


      chartContainer.append('g') // append the y-axis to the container
          .attr('class', 'y-axis')
          .call(yAxis);
      chartContainer.append('g') // append the y-axis to the container
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);


      chartContainer.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr("x", 0)
          .attr("y", d => yScale(d.name))
          .attr("width", d => xScale(+d.YDS))
          .attr("height", yScale.bandwidth())
          .attr("fill", "#324F71")
          .on('mouseover', function(d, i)  {
            d3.select(this)
                .attr("fill", "#715432")
            let index = data.indexOf(d3.select(this).data()[0]); //identify the data source based on the first value that is stored in data()
            let correspondingDataName = data[index].name;
            let correspondingDataTeam = data[index].team;
            let correspondingDataYDS =  data[index].YDS + " Yards"




            chartContainer.selectAll('rect:not(:hover)').attr('opacity', .2)
            // show tooltipContainer
            tooltipContainer.style('visibility', 'visible');

            // update tooltip text
            tooltipContainer.select('text')
                .selectAll('tspan')
                .data([correspondingDataName, correspondingDataTeam, correspondingDataYDS])
                .join('tspan')
                .attr('x', 0)
                .attr('dy', '1.5em')
                .text(function(d) { return d; });

            // position tooltipContainer at the end of the hovered rectangle
            let rectPos = this.getBoundingClientRect();
            let svgPos = svg.node().getBoundingClientRect();
            let xPos = rectPos.x - svgPos.x + rectPos.width - 70;
            let yPos = rectPos.y - svgPos.y - 10;

            tooltipContainer.attr('transform', `translate(${xPos - margin.left + 100},${yPos - margin.top})`);
          })
          .on('mouseout', function(d, i)  {
            d3.select(this).attr("fill", "#324F71");

            // set opacity of hovered element back to 0.8 (partially opaque)
            chartContainer.selectAll('rect')
                .attr('opacity', 1);
            tooltipContainer.style('visibility', 'hidden');


          });
      const tooltipContainer = chartContainer.append('g')
          .attr('class', 'tooltip-container')
          .style('visibility', 'hidden');

// add tooltip rectangle


// add tooltip text
      tooltipContainer.append('text')
          .attr('x', 0)
          .attr('y', -15)
          .attr('fill', '#000')
          .style('font-size', '12px')
          .style('color', 'black')
          .text('');





    }

  },
  async mounted(){
    await this.getTopFive();
    await this.generateTopChart();



  }

}
</script>