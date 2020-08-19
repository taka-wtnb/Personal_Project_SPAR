import config from './config';

const colors = config.chartColors;

let columnColors = [colors.blue, colors.green, colors.orange, colors.red,  colors.teal, colors.pink,colors.default, colors.gray,];

export default function chartOptions(data) {
    let monthLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];//data.map((row, i) => row.monyy);

    return {
        labels: monthLabels,
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '30px',
            }
        },
        colors: columnColors,
        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'right',
            labels: {
                colors: '#FFFFFF',
            },
            onItemHover: {
                highlightDataSeries: false,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '20px',
                            fontWeight: 600,
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            fontWeight: 400,
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total Cases',
                            fontSize: '20px',
                            fontWeight: 600,
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