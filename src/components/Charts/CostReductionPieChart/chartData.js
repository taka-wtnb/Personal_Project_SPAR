export default function chartData(data) {
    let priceData = data.map((row) => parseInt(row.total));
    return priceData;
}