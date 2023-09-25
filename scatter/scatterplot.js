async function draw(){
    //Data
    const dataset = await d3.json('data.json')

    const xAccessor = (d)=>d.currently.humidity
    const yAccessor = (d)=>d.currently.apparentTemperature
    const rAccessor = (d)=>d.currently.windSpeed

    //Dimensions
    let dimesions = {
        width:800,
        height:800,
        margin:{
            top:50,
            bottom:50,
            right:50,
            left:50
        }
    }

    dimesions.ctrWidth = dimesions.width - dimesions.margin.left-dimesions.margin.right
    dimesions.ctrHeight = dimesions.height - dimesions.margin.top-dimesions.margin.bottom

    // Scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .rangeRound([0, dimesions.ctrWidth])
        .clamp(true)

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .rangeRound([dimesions.ctrHeight, 0])
        .clamp(true)

    //Draw Image
    const svg = d3.select('#chart')
       .append('svg')
       .attr('width', dimesions.width)
       .attr('height', dimesions.height)

    const ctr = svg.append('g')
                .attr(
                    'transform',
                    `translate(${dimesions.margin.left}, ${dimesions.margin.top})`
                )
    ctr.selectAll('circle')
        .data(dataset)
        .join('circle')
        .attr('cx', d=> xScale(xAccessor(d)))
        .attr('cy', d=> yScale(yAccessor(d)))
        .attr('r', d=> rAccessor(d))
        .attr('fill', 'red')

    // Axes
    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .tickValues([0.3, 0.4, 0.6, 0.7, 0.9,])

    const xAxisGroup = ctr.append('g')
        .call(xAxis)
        .style(`transform`, `translateY(${dimesions.ctrHeight}px)`)
        .classed('axis', true)
    
    xAxisGroup.append('text')
                .text('Humidity')
                .attr('x', dimesions.ctrWidth / 2)
                .attr('y', dimesions.margin.bottom-10)
                .attr('fill', 'black')
    
    const yAxis = d3.axisLeft()
                .scale(yScale)
                
    const yAxisGroup = ctr.append('g')
        .call(yAxis)
        .classed('axis', true)

    yAxisGroup.append('text')
            .text('Temperature &deg; F')
            .attr('x', -dimesions.ctrHeight / 2)
            .attr('y', -dimesions.margin.left+15)
            .attr('fill', 'black')
            .style('transform', 'rotate(270deg)')
            .style("text-anchor", "middle")
}
draw()