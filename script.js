let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

let countyData
let educationData

let canvas = d3.select('#canvas')

let drawMap = () => {

    canvas.selectAll('path')
           .data(countyData)
           .enter()
           .append('path')
           .attr('d', d3.geoPath())
           .attr('class', 'county')
           .attr('fill', (countyDataItem) => {
               let id = countyDataItem['id']
               let county = educationData.find((item) => {
                   return item['fips']  === id
               })
               let percentage = county['bachelorsOrHigher']
               switch (true) {
                   case percentage <= 15:
                       return 'tomato'
                       break;
                   case percentage <= 30:
                       return 'orange'
                       break;
                   case percentage <= 45:
                       return 'lightgreen'
                       break;
                   case percentage > 45:
                       return 'limegreen'
                       break;
               }
           })
           .attr('data-fips', (countyDataItem) => countyDataItem['id'])
           .attr('data-education', (countyDataItem) => {
                let id = countyDataItem['id']
                let county = educationData.find((item) => {
                    return item['fips']  === id
                })
                let percentage = county['bachelorsOrHigher']
                return percentage
           })

}

d3.json(countyURL).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            countyData = topojson.feature(data, data.objects.counties).features
            console.log(countyData)

            d3.json(educationURL).then(
                (data, error) => {
                    if(error){
                        console.log(error)
                    }else{
                        educationData = data
                        console.log(educationData)
                        drawMap()
                    }
                }
            )
        }
    }
)
