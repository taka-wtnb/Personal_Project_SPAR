export default function chartData(data) {
    let otdData = data.map((row, i) => ((row.otds / row.total) * 100).toFixed(2));

    return [{
        name: "OTD %",
        data: otdData
    }];
}