export default function chartData(data) {
    let priceData = data.map((row) => parseInt(row.unit_price));

    return [{
        name: "Unit Price ($)",
        data: priceData
    }];
}