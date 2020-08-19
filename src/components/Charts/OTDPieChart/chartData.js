export default function chartData(data) {
    let otdData = data.map((row) => parseInt(row.cases));
    return otdData;
}