
var getData = $.get('/data');
const data1 = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
        // label: '',
        backgroundColor: 'white',
        borderColor: 'white',
        fill: false,
        data: [],
    }]
};
const config1 = {
    type: 'line',
    data: data1,
};
var chart = new Chart(
    document.getElementById('plot'),
    config1
);






function updateChart() {
    var getDataFit = $.get('/data');
    getDataFit.done(function (xydata) {

        for (i = 1; i <= xydata.xdata.length; i++) {
            if (xydata.xdata[i] == null){
                xydata.xdata.splice(i, 1)
                xydata.ydata.splice(i, 1)
            }
        }


        

        labels = creatLabels(xydata);

        datasets = creatDatasets(xydata);

        for (let i = 0; i < 15111; i++) {
            console.log('-----labels----', labels)
            console.log('-----datasets----', datasets.data)
        }

        
        chart.destroy()



        const data = {
            labels: labels,
            datasets: datasets,
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    title: {
                        text: '1D Photoemission Spectra',
                        display: true
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Binding Energy (eV)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Intensity (arb. unit)'
                        }
                    }
                },
            },
        };
        var chart = new Chart(
            document.getElementById('plot'),
            config
        );
    })
}




$('#display').on('click', updateChart)

//--------------------------------

function creatDatasets(data) {
    let dataset = []
    let xdata = data.xdata;
    let ydata = data.ydata;
    for (i = 1; i < xdata.length; i++) {

        for (let j = 0; j < 15111; j++) {
            console.log('-----i----', i)
            console.log('-----creatData(xdata[i], ydata[i]).labels----', creatData(xdata[i], ydata[i]).labels[1])
        }
        
        const newDataset = {
            // label: 'Dataset ' + (data.datasets.length + 1),
            backgroundColor: 'blue',
            borderColor: 'blue',
            fill: false,
            data: creatData(xdata[i], ydata[i]).labels
        };
        dataset.push(newDataset);
    }
    return dataset
}

function makeLabels(xx) {
    let arr = xx;
    // arr = arr.sort((a, b) => a - b);
    let newarr = arr.map(item => ({ x: item, y: item }));
    return {
        labels: newarr,
        array: arr
    };
};

function creatData(xx, yy) {
    let arr = yy;
    let lineLabels = makeLabels(xx).array
    let labels = arr.map((item, i) => ({ x: lineLabels[i], y: item }))
    return { labels, arr };
}








function creatLabels(data) {
    let min = 10000;
    let max = 0;
    let len = 1;
    let res = 10000;
    let xdata = data.xdata

    for (let i = 0; i <= xdata.length; i++) {
        if (xdata[i] != null) {

            if (Math.min(...xdata[i]) < min) {
                min = Math.min(...xdata[i])
            }

            if (max < Math.max(...xdata[i])) {
                max = Math.max(...xdata[i])
            }


            resxdata = xdata[i][0] - xdata[i][1];
            if (resxdata < res) {
                res = resxdata;
            }
        }


    }

    const labels = [];
    labels[0] = min
    len = (max - min) / res
    for (let i = 1; i <= len; i++) {
        labels[i] = labels[i - 1] + res;
    }

    return labels
}