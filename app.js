// // const pBrowser = document.querySelector('p')
// const pD3 = d3.select('body')
//               .append('p')
//             //   .attr('class', 'bar')
//               .classed('foo', true)
//               .classed('bar', true)
//               .text('Hello World')
//               .style('color', 'red')

// // console.log(pBrowser)
// console.log(pD3)

const data = [10, 20, 30, 40, 50]

//.data joining
const el = d3.select('ul')
              .selectAll('li')
              .data(data)
              .join(
                 enter => {
                    return enter.append('li')
                                .style('color','yellow')
                 },
                 update => update.style('color', 'red')
              )
              .text(d=>d)


console.log(el)