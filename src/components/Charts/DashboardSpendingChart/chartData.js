export default function chartData(data) {
    let spendingData = data.map((row) => parseInt(row.total));
    return [{
        name: "Total Ordered Amount ($)",
        data: spendingData
    }];
}