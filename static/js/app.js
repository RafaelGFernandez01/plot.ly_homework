// var url = `http://robdunnlab.com/projects/belly-button-biodiversity/`

// ## Step 1: Plotly

// 1. Use the D3 library to read in `samples.json`.
// d3.json("data/samples.json").then()

// d3.json("/static/data/samples.json", function(data) {
//     console.log(data);
// });

// function buildMetadata(samplenumber){
//     var sampledata = d3.json("../../samples.json").then(function(data) {
//         sampledata = data.metadata.filter(data => data.id == samplenumber),


// Homework Review 4/21/2021   

// function builtMetadata(sampleNumber){
// d3.json("./samples.json").then((data) => {
//    metadata = data.metadata;
//    metadata = filter(metadata => metadata.id == sampleNumber)
//    var_metadata_obj = d3.select("#sample-metadata");
//    metadata_object.html("")
//    Object.entries(sample).forEach(({key, value}) => {
//         metadata_object.append("h6").text(`${key.toUpperCase}: ${value}`
//    });
// })
// }


// 1. Use the D3 library to read in `samples.json`.

function fillSelect(data) {
    const names = data.names;
    const selectObject = d3.select("#selDataset");
    selectObject.html("");
    console.log(names,selectObject);

    names.forEach((name) => {
        selectObject.append("option").text(name);
    });
}

// function optionChanged(value){
//     console.log(value);  
//     buildMetadata(value);
// }

// buildMetadata();

function buildMetadata(data, sampleNumber){
    let metadata = data.metadata;    
    metadata = metadata.filter(m => m.id == sampleNumber);
    let metadata_obj = d3.select("#sample-metadata");
    metadata_obj.html("")

    console.log('metadata', metadata);

}

       
const main = async () => {
    const data = await d3.json("https://raw.githubusercontent.com/RafaelGFernandez01/plot.ly_homework/main/static/data/samples.json");
    console.log('data', data);

    fillSelect(data);
    d3.select('#selDataset')
        .on('change', () => {
            const name = this.value;
            buildMetadata(data, name);
        });
};

main()

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// * Use `sample_values` as the values for the bar chart.
// * Use `otu_ids` as the labels for the bar chart.
// * Use `otu_labels` as the hovertext for the chart.
//   ![bar Chart](Images/hw01.png)
// function buildCharts(sampleNumber)

        d3.json("https://raw.githubusercontent.com/RafaelGFernandez01/plot.ly_homework/main/static/data/samples.json").then((data) => {
        samples = data.samples;
        var sample = samples[0]
        var otu_ids = sample.otu_ids;
        var otu_labels = sample.otu_labels;
        var sample_values = sample.sample_values;

    barTrace = {
        y: otu_ids.slice(0-10).map(otu => `OTU ${otu}`).reverse(),
        x: sample_values.slice(0,10).reverse(),
        type: "bar",
        text: otu_labels.slice(0,10).reverse(),
        orientation: "h"
    

    }
Plotly.newPlot("bar",[barTrace]);

})


//init function :
//populate the drop down menu (id=selDataset)
//loop though data and append an option for each sample name
//call buildChart and buildMetadata on the first value in samples.json
//Google buble chart and follow information given 

//optionChange: call buildChart and builddMetada on the new sample





    // }





// }



// console.log(importedData);
    

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.

//   ![bar Chart](Images/hw01.png)

// 3. Create a bubble chart that displays each sample.

// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.

// ![Bubble Chart](Images/bubble_chart.png)

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// ![hw](Images/hw03.png)

// 6. Update all of the plots any time that a new sample is selected.

// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

// ![hw](Images/hw02.png)

// ## Advanced Challenge Assignment (Optional)

// The following task is advanced and therefore optional.

// * Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

// * You will need to modify the example gauge code to account for values ranging from 0 through 9.

// * Update the chart whenever a new sample is selected.

// ![Weekly Washing Frequency Gauge](Images/gauge.png)

// ## Deployment

// * Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo.

// * Ensure your repository has regular commits (i.e. 20+ commits) and a thorough README.md.
