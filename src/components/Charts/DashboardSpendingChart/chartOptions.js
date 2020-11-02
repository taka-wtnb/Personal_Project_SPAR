import config from './config';

const colors = config.chartColors;

let chartColors = [colors.blue, colors.green, colors.orange, colors.red, colors.default, colors.gray, colors.teal, colors.pink];

export default function chartOptions(data) {
    let monthLabels = data.map((row, i) => row.monyy);

    return {
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
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
        colors: ['#FDF5E6'],
        plotOptions: {
            bar: {
            columnWidth: '45%',
            }
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 5
        },
        xaxis: {
            categories: monthLabels,
            labels: {
                style: {
                    colors: chartColors,
                    fontSize: '14px'
                }
            },
            title: {
                text: 'Month',
                offsetY: 10,
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
                formatter: function(val) {
                    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
            },
            title: {
                text: 'Total Ordered Amount ($)'
            },
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