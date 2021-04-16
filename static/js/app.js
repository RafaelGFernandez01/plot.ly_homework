function fillSelect(data) {
    const names = data.names;
    const selectObject = d3.select("#selDataset");
    selectObject.html("");
    
    names.forEach((name) => {
        selectObject.append("option").attr("value", name).text(name);
    });
}

function buildMetadata(data, sampleNumber){
    const [metadata] = data.metadata.filter(m => m.id == sampleNumber);
    let metadata_obj = d3.select("#sample-metadata");
    metadata_obj.html(`
        <p><strong>ID:</strong> ${metadata.id}</p>
        <p><strong>Ethnicity:</strong> ${metadata.ethnicity}</p>
        <p><strong>Gender:</strong> ${metadata.gender}</p>
        <p><strong>Age:</strong> ${metadata.age}</p>
        <p><strong>Location:</strong> ${metadata.location}</p>
        <p><strong>BB Type:</strong> ${metadata.bbtype}</p>
        <p><strong>WFREQ:</strong> ${metadata.wfreq}</p>
    `);
    console.log(metadata);
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
        marker: {
            color: 'rgb(38,230,0)'},
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

// function displaySampleMetadata(data){

//      console.log(sampleMetadata)
// }
    
var _data;
var _selectedMetadata;

async function getData() {
    if (_data) {
        return _data;
    } else {
        _data = await d3.json("https://raw.githubusercontent.com/RafaelGFernandez01/plot.ly_homework/main/static/data/samples.json");
        return _data;
    }
}

const render = async () => {
    const data = await getData();
    console.log('data', data);

    // 1...
    fillSelect(data);
    // 2...
    renderBarChart(data);
    // 3...
    renderBubbleChart(data);
    // 4-) Display the sample metadata
    // displaySampleMetadata(data);




    // 5-)Display each key-value pair from the metadata JSON object somewhere on the page
    // 6-)Update all of the plots any time that a new sample is selected
    // 7-)Adapt the Gauge Chart
    // renderGaugeChart(data);
    

    // register handlers
    d3.select('#selDataset')
        .on('change', () => {
            _selectedMetadata = d3.select("#selDataset").property("value");
            buildMetadata(data, _selectedMetadata);
        });
};

render()