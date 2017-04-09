///////////////////////////////////////////////////////////////////////////////
var dataset = new Array();
d3.csv("data/ball.csv", function(data)
	{
	  data.forEach(function(d)
		{
		  var sample = new Array();
		  sample.push(+d.pc1);
		  sample.push(+d.pc2);
		  sample.push(d.name);
		  dataset.push(sample);
		})
	  everythingelse();
	});
  console.log(dataset)
///////////////////////////////////////////////////////////////////////////////

function everythingelse() {
///////////////////////////////////////////////////////////////////////////////
  //Width and height
  var widthdiv = document.getElementById('nbadiv').offsetWidth;
  var heightdiv = document.getElementById('nbadiv').offsetHeight;
  var margin = {top: 10, right: 10, bottom: 90, left: 40},
  w = widthdiv - margin.left - margin.right - 20,
  h = heightdiv - margin.top - margin.bottom - 20;

  //Create scale functions
  var xScale = d3.scaleLinear()
			 .domain([
				  d3.min(dataset, function(d) { return d[0]; }),
				  d3.max(dataset, function(d) { return d[0]; })])
			 .range([margin.left, w + margin.left]);

  var xValue = function(d) {return d[0];} // data -> scaled x value

  var yScale = d3.scaleLinear()
			 .domain([
				  d3.min(dataset, function(d) { return d[1]; }),
				  d3.max(dataset, function(d) { return d[1]; })])
			 .range([h + margin.top, margin.top]);

  var yValue = function(d) {return d[1];} // data -> scaled y value

  var rScale = d3.scaleLinear()
			 .domain([
				  d3.min(dataset, function(d) { return d[1]; }),
				  d3.max(dataset, function(d) { return d[1]; })])
			 .range([2, 5]);

  console.log(dataset[0]);

///////////////////////////////////////////////////////////////////////////////
  //Create SVG element
  var svg = d3.select("#nbadiv")
		.append("svg")
		.attr("width", w + margin.left + margin.right)
		.attr("height", h + margin.top + margin.bottom);
		// .append("g")
		//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add the tooltip area to the webpage
  var tooltip = d3.select("body").append("div")
   .attr("class", "tooltip")
   .style("opacity", 100);

///////////////////////////////////////////////////////////////////////////////
  //Create circles
  svg.selectAll("circle")
	 .data(dataset)
	 .enter()
	 .append("circle")
	 .attr("cx", function(d) {
		return xScale(d[0]);
	 })
	 .attr("cy", function(d) {
		return yScale(d[1]);
	 })
	 .attr("r", function(d) {
	   // return Math.abs(rScale(d[1]));
	   return 3
	 })

	.on("mouseover", function(d) {
		tooltip.transition()
			 .duration(200)
			 .style("opacity", .9);
		tooltip.html
		(
		d[2] + "<br/> ("
		+ (Math.round(xValue(d) * 100) / 100) + ", "
		+ (Math.round(yValue(d) * 100) / 100) + ")"
		)
		   .style("left", (d3.event.pageX + 5) + "px")
		   .style("top", (d3.event.pageY - 28) + "px");
	})
	.on("mouseout", function(d) {
		tooltip.transition()
			 .duration(500)
			 .style("opacity", 0);
	});
///////////////////////////////////////////////////////////////////////////////

  //Define X axis
  var xAxis = d3.axisBottom(xScale);

  //Define Y axis
  var yAxis = d3.axisLeft(yScale);

  //Create X axis
  svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0,"
	   + (h + margin.top)
	  + ")")
	.call(xAxis);

  //Create Y axis
  svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate("
	   + margin.left
	  + ",0)")
	.call(yAxis);
  }
