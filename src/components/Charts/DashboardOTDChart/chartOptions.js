import config from './config';

const colors = config.chartColors;

let columnColors = [colors.blue, colors.green, colors.orange, colors.red, colors.default, colors.gray, colors.teal, colors.pink];

export default function chartOptions() {
    return {
        //       series: [{
        //         data: [21, 22, 10, 28, 16, 21, 13, 30]
        //       }],
        chart: {
            height: 350,
            type: 'line',
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
        colors: columnColors,
        plotOptions: {
            bar: {
            columnWidth: '45%',
            distributed: true
            }
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ['John', 'Joe', 'Jake', 'Amber', 'Peter', 'Mary', 'David', 'Lily'],
            labels: {
                style: {
                    colors: columnColors,
                    fontSize: '14px'
                }
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
                }
            }
        },
        tooltip: {
            theme: 'dark'
        },
        grid: {
            borderColor: colors.gridLineColor
        }
    }
}