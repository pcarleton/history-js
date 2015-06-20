require.config({
    baseUrl: "js",
    paths: {
        "d3": "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min",
        "backbone": "http://backbonejs.org/backbone",
        "underscore": "http://underscorejs.org/underscore",
        "moment": "http://momentjs.com/downloads/moment",
    },
    "shim": {
        "d3": {
            "exports": "d3"
        },
        "underscore": {
            "exports": "_"
        },
    }
});
require(["d3",
         "moment"],
function(d3, moment) {
//Width and height
var w = 500;
var h = 100;
var dfmt = "YYYY-MM-DD";
var qd = function (datestr) {
    return moment(datestr, dfmt);
};

var dataset = [
                [qd("1985-1-22"), "born"],
                [qd("2006-5-20"), "graduated"]
              ];

d3.min(dataset, function(d) { return [0]; });
//Create scale functions

var xScale = d3.time.scale()
                     .domain([
                        d3.min(dataset, function(d) { return d[0]; }),
                        d3.max(dataset, function(d) { return d[0]; })
                        ])
                     .range([0, w])
                     .nice();

var padding = 20;
//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w + padding)
            .attr("height", h + padding);

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
        return xScale(d[0]);
   })
   .attr("cy", function(d) {
        return 10;
   })
   .attr("r", function(d) {
        return 2;
   });

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
        return d[1];
   })
   .attr("x", function(d) {
        return xScale(d[0]);
   })
   .attr("y", function(d) {
        return 20;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "blue");
});
