function fillSelect(data) {
    const names = data.names;
    const selectObject = d3.select("#selDataset");
    selectObject.html("");
    
    names.forEach((name) => {
        selectObject.append("option").text(name);
    });
}

function buildMetadata(data, sampleNumber){
    let metadata = data.metadata;    
    metadata = metadata.filter(m => m.id == sampleNumber);
    let metadata_obj = d3.select("#sample-metadata");
    metadata_obj.html("");
}

function renderBarChart(data){
    const samples = data.samples;
    const sample = samples[0];
    const otu_ids = sample.otu_ids;
    const otu_labels = sample.otu_labels;
    const sample_values = sample.sample_values;
    
    barTrace = {
        y: otu_ids.slice(0-10).map(otu => `OTU ${otu}`).reverse(),
        x: sample_values.slice(0,10).reverse(),
        type: "bar",
        text: otu_labels.slice(0,10).reverse(),
        orientation: "h"
    }
    Plotly.newPlot("bar", [barTrace]);
}

function renderBubbleChart(data){
    const samples = data.samples;
    const sample = samples[0]
    const otu_ids = sample.otu_ids;
    const sample_values = sample.sample_values;
   
    bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            size: sample_values
        },
    }
    var layout = {
        title: 'Belly Button Biodiversity',
    };

    Plotly.newPlot("bubble",[bubbleTrace],layout);
}

function displaySampleMetadata(data){
    // CODE HERE...
}

const main = async () => {
    const data = await d3.json("https://raw.githubusercontent.com/RafaelGFernandez01/plot.ly_homework/main/static/data/samples.json");
    console.log('data', data);

    // 1...
    fillSelect(data);
    // 2...
    renderBarChart(data);
    // 3...
    renderBubbleChart(data);
    // 4-) Display the sample metadata
    // displaySampleMetadata(data);

    // register handlers
    d3.select('#selDataset')
        .on('change', () => {
            const name = this.value;
            buildMetadata(data, name);
        });
};

main()