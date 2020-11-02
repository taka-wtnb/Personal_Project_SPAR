import config from './config';

const colors = config.chartColors;

let chartColors = [colors.blue, colors.green, colors.orange, colors.red, colors.default, colors.gray, colors.teal, colors.pink];

export default function chartOptions(data) {
    let monthLabels = data.map((row, i) => row.order_date);

    return {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: -5,
                tools: {
                    download: '<img src="/static/media/cloud.809bd319.svg" height="30" width="30"/>' | true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                    customIcons: []
                }
            }
        },
        colors: ['#FFFACD'],
        plotOptions: {
            bar: {
            columnWidth: '45%',
            distributed: true
            }
        },
        stroke: {
            width: 7,
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 5
        },
        xaxis: {
            type: 'datetime',
            categories: monthLabels,
            labels: {
                style: {
                    colors: chartColors,
                    fontSize: '14px'
                }
            },
            title: {
                text: 'Month',
                offsetY: 15,
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    color: colors.textColor,
                },
            },
            title: {
                text: 'Price per Unit ($)'
            },
            // tickAmount: 5,
            // min: 0,
            // max: 100,
            decimalsInFloat: 0,
        },
        tooltip: {
            theme: 'dark'
        },
        grid: {
            borderColor: colors.gridLineColor
        }
    }
}