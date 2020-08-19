import config from './config';

const colors = config.chartColors;

let columnColors = [colors.blue, colors.teal, colors.green, colors.orange, colors.red, colors.pink,colors.default, colors.gray,];

export default function chartOptions(data) {
    let monthLabels = data.map((row, i) => row.reason);

    return {
        labels: monthLabels,
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '50px',
                colors: [colors.blue, colors.teal, colors.green, colors.orange, colors.red, colors.pink,colors.default, colors.gray,],
            },
            dropShadow: {
                enabled: true,
                color: '#000',
            }
        },
        colors: columnColors,
        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            fontSize: '14px',
            labels: {
                colors: '#FFFFFF',
            },
            onItemHover: {
                highlightDataSeries: true,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    // offsetX: 40,
                    // offsetY: 0,
                    // customScale: 1,
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#FF0000',
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            fontWeight: 400,
                            color: '#FF0000',
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total Cases',
                            // fontSize: 30,
                            // fontWeight: 30,
                            color: '#FFFFFF',
                        }
                    }
                }
            }
        }

    }
}
        // dataLabels: {
        //     enabled: true,
        // },
        //     // theme: {
        //     //     monochrome: {
        //     //         enabled: true,
        //     //         color: colors.blue,
        //     //     }
        //     // },
        // chart: {
        //     width: 380,
        //     type: 'pie',
        // },
        // stroke: {
        //     show: true,
        //     width: 0
        // },
        // legend: true,
        // responsive: [{
        //     breakpoint: 480,
        //     options: {
        //         chart: {
        //             width: 200
        //         },
        //         legend: {
        //             position: 'bottom'
        //         }
        //     }
        // }]