async function draw() {
  // Data
  const dataset = await d3.json('data.json')
  // console.log(dataset)
  const xAccessor = d => d.currently.humidity
  const yAccessor = d => d.length

  // Dimensions
  let dimensions = {
    width: 800,
    height: 400,
    margins: 50
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  // Draw Image
  const svg = d3.select('#chart')
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  // g
  const ctr = svg.append("g")
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])
    .nice()

  const bin = d3.bin()
                .domain(xScale.domain())
                .value(xAccessor)
                .thresholds(10)
  
  const newDataset = bin(dataset)
  const padding = 1

  const yScale = d3.scaleLinear()
                    .domain([0, d3.max(newDataset,yAccessor)])
                    .range([dimensions.ctrHeight, 0])
                    .nice()

  // console.log({original: dataset, new: newDataset})

  ctr.selectAll('rect')
      .data(newDataset)
      .join('rect')
      .attr('width', d=> d3.max([0, xScale(d.x1) -xScale(d.x0)-padding]))
      .attr('height',d => dimensions.ctrHeight - yScale(yAccessor(d)))
      .attr('x', d => xScale(d.x0))
      .attr('y', d=> yScale(yAccessor(d)))
      .attr('fill', '#01c5c4')
  
  const xAxis = d3.axisBottom(xScale)

  const xAxisGroup = ctr.append('g')
                        .style('transform', `translate(0, ${dimensions.ctrHeight}px)` )

  xAxisGroup.call(xAxis)

  const yAxis = d3.axisLeft(yScale);
  const yAxisGroup = ctr.append('g');
  yAxisGroup.call(yAxis);

  svg.append("text")
  .attr("class", "x-axis-label")
  .attr("x", dimensions.width / 2)
  .attr("y", dimensions.height - 10)
  .style("text-anchor", "middle")
  .text("Humidity");

  svg.append("text")
    .attr("class", "y-axis-label")
    .attr("x", -(dimensions.height / 2))
    .attr("y", dimensions.margins - 30)
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle")
    .text("Frequency");

  
}

draw()