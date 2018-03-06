import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

import chartData from './data';
import * as d3 from "d3";

class AxisX extends Component {
  render() {
    var data = this.props.data;
    var margin = this.props.margin;
    var height = this.props.height - margin.top - margin.bottom;
    var width = this.props.width  - margin.left - margin.right;

    var y = d3.scale.linear()
      .range([height, 0]);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    y.domain(d3.extent(data, function(d) { return d.close; }));

    d3.select(".y").call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

      return(
        <g className="y axis"></g>
      );
  }
}

class AxisY extends Component {
  render() {
    var data = this.props.data;
    var margin = this.props.margin;
    var height = this.props.height - margin.top - margin.bottom;
    var width = this.props.width  - margin.left - margin.right;

    var y = d3.scale.linear()
      .range([height, 0]);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    y.domain(d3.extent(data, function(d) { return d.close; }));

    d3.select(".y").call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

      return(
        <g className="y axis"></g>
      );
  }
}

class Line extends Component {
    render(){
      var data = this.props.data;
      var margin = this.props.margin;
      var height = this.props.height - margin.top - margin.bottom;
      var width = this.props.width  - margin.left - margin.right;

      var x = d3.time.scale()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

      data.forEach(function(d) {
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.close; }));
      });

      var newline = line(data);
      console.log(newline);

      return(
        <path className="line" d={newline}></path>
      );
    }
}


export default class LineChart extends Component {
    constructor(props){
      super(props);
      this.state = {
        graph: "",
        container: "",
        chartWidth: 0,
        chartHeight: 0,
        x: NaN,
        y: NaN,
        data: [],
        margin: {}
      };
      this.handleSubmit = this.handleSubmit.bind(this)
      this.resize = this.resize.bind(this)
      this.getChartSize = this.getChartSize.bind(this)
    }  

    resize(e){
      const container = this.state.container;
      let chartWidth = this.getChartSize(container)[0];
      let chartHeight = this.getChartSize(container)[1];
      
      this.setState({
        chartWidth: chartWidth,
        chartHeight: chartHeight,
      });
    }

    handleSubmit(submittedData){
      let formatDate = d3.time.format("%d-%m-%Y");
      function type(d) {
        d.date = formatDate.parse(d.date);
        d.close = +d.close;
        return d;
      }
      const _this = this;
      d3.csv(submittedData, type, function(error, data) {
        if (error) throw error;
        _this.setState({
          data: data
        });
      });
    }

    componentDidMount(){
      window.addEventListener('resize', this.resize);
    
      const graph = d3.select("#chart");
      const container = d3.select("#graphic");

      const margin = {top: 20, right: 20, bottom: 30, left: 50};

      var containerBB = container.node().getBoundingClientRect();

      var graphBB = graph.node().getBoundingClientRect();

      let chartWidth = this.getChartSize(container)[0];
      let chartHeight = this.getChartSize(container)[1];

      const _this = this;

      let formatDate = d3.time.format("%d-%b-%y");

      function type(d) {
        d.date = formatDate.parse(d.date);
        d.close = +d.close;
        return d;
      }

      d3.csv("data4.csv", type, function(error, data) {
        if (error) throw error;

        _this.setState({
          graph: graph,
          container: container,
          chartWidth: chartWidth,
          chartHeight: chartHeight,
          data: data,
          margin: margin
        });
      });
    }


    getChartSize(el){
        let width = .9*parseInt(el.style('width'));
        let height = .7*parseInt(width*7/9);
        return  [width,height];
    }

    render() {
      var width = this.state.chartWidth;
      var height = this.state.chartHeight;
      var margin = this.state.margin;
      var data = this.state.data;
      return(
        <div>
          <form>
            <input type="radio" name="data" onChange={this.handleSubmit.bind(null, "./data.csv")}/> 2181 Rows<br />
            <input type="radio" name="data" onChange={this.handleSubmit.bind(null, "./data2.csv")}/> 600 Rows<br />
            <input type="radio" name="data" onChange={this.handleSubmit.bind(null, "./data3.csv")}/> 300 Rows<br />
            <input type="radio" name="data" onChange={this.handleSubmit.bind(null, "./data4.csv")}/> 50 Rows
          </form>
          <div id="chart">
            <svg height={height} width={width} >
              <g transform="translate(50,20)">
                <AxisX width={width} height={height} margin={margin} data={data}/>
                <AxisY width={width} height={height} margin={margin} data={data}/>
                <Line width={width} height={height} margin={margin} data={data}/>
              </g>
            </svg>
          </div>
        </div>
      );
    }
  }