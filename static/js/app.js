function fillSelect(data) {
    const names = data.names;
    const selectObject = d3.select("#selDataset");
    selectObject.html("");
    
    names.forEach((name) => {
        selectObject.append("option").attr("value", name).text(name);
    });

    _selectedMetadata = d3.select("#selDataset").property("value");
}

function buildMetadata(data){
    const [metadata] = data.metadata.filter(m => m.id == _selectedMetadata);
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
}

function renderBarChart(data) {
    const samples = data.samples;
    // const sample = samples[0];
    const [sample] = data.samples.filter(s => s.id == _selectedMetadata);
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
    const [sample] = data.samples.filter(s => s.id == _selectedMetadata);
    const otu_ids = sample.otu_ids;
    const sample_values = sample.sample_values;
   
    bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: 'rgb(38,230,0)'
        },
    }
    var layout = {
        title: 'Belly Button Biodiversity',
    };

    Plotly.newPlot("bubble",[bubbleTrace],layout);
}

function renderGaugeChart(data){
    const [metadata] = data.metadata.filter(m => m.id == _selectedMetadata);
    
    const trace = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: metadata.wfreq,
            title: { text: "Speed" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis:{ range: [0, 9] },                
            }
            
        }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', trace, layout);


}

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

    fillSelect(data);
    renderBarChart(data);
    renderBubbleChart(data);
    buildMetadata(data);
    renderGaugeChart(data);
    

    // register handlers
    d3.select('#selDataset')
        .on('change', () => {
            _selectedMetadata = d3.select("#selDataset").property("value");
            buildMetadata(data, _selectedMetadata);
            renderBarChart(data);
            renderBubbleChart(data);
            renderGaugeChart(data);
        });
};

render()