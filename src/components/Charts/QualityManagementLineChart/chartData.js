export default function chartData(data) {
    let qualityData = data.map((row) => parseInt(row.total));
    console.log(qualityData);
    return [{
        name: "Quality Issue Cases",
        data: qualityData
    }];
}