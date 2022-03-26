


        const data = {
            labels: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.2, 5.9, 6.11, 7.23, 7.45],
            datasets: [{
                label: 'Dataset with point data',
                backgroundColor: 'grean',
                borderColor: 'green',
                fill: false,
                data: [
                {
                    x: 0,
                    y: 1
                }, {
                    x: 2,
                    y: 5
                }, {
                    x: 3.5,
                    y: 7
                }, {
                    x: 5,
                    y: 12
                }],
            },{
                label: 'Dataset22222 with point data',
                backgroundColor: 'blue',
                borderColor: 'blue',
                fill: false,
                data: [{
                    x: 2,
                    y: 1
                }, {
                    x: 2.5,
                    y: 7
                }, {
                    x: 4.5,
                    y: 12
                }, {
                    x: 5.9,
                    y: 16
                }, {
                    x: 6.11,
                    y: 11
                }, {
                    x: 7.23,
                    y: 9
                }],
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    title: {
                        text: 'Chart.js Time Scale',
                        display: true
                    }
                },
                scales: {
                    x: {
                        // type: 'time',
                        // time: {
                        //     // Luxon format string
                        //     // tooltipFormat: 'DD T'
                        // },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'value'
                        }
                    }
                },
            },
        };
        const chart = new Chart(
            document.getElementById('plot'),
            config
        );