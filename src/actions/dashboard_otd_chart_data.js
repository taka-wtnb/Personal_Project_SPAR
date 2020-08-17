export const REQUEST_DB_OTD_CHART_DATA_PENDING = 'REQUEST_DB_OTD_CHART_DATA_PENDING';
export const REQUEST_DB_OTD_CHART_DATA_SUCCESS = 'REQUEST_DB_OTD_CHART_DATA_SUCCESS';
export const REQUEST_DB_OTD_CHART_DATA_FAILURE = 'REQUEST_DB_OTD_CHART_DATA_FAILURE';

export const requestData = (supplierArray, index, months) => (dispatch) => {
    dispatch({ type: REQUEST_DB_OTD_CHART_DATA_PENDING });

    let startDate, endDate;

    let date = new Date();
    date.setDate(0);
    endDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    let today = new Date();

    switch (months) {
      case "Past 3 Months":
        startDate = new Date(today.getFullYear() - (today.getMonth() - 3 > 0 ? 0 : 1), (today.getMonth() - 3 + 12) % 12, 1);
        startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        break;
      case "Past 6 Months":
        startDate = new Date(today.getFullYear() - (today.getMonth() - 6 > 0 ? 0 : 1), (today.getMonth() - 6 + 12) % 12, 1);
        startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        break;
      case "Past 9 Months":
        startDate = new Date(today.getFullYear() - (today.getMonth() - 9 > 0 ? 0 : 1), (today.getMonth() - 9 + 12) % 12, 1);
        startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        break;
      case "Past 12 Months":
        startDate = new Date(today.getFullYear() - (today.getMonth() - 12 > 0 ? 0 : 1), (today.getMonth() - 12 + 12) % 12, 1);
        startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        break;
      default:
        startDate = new Date(today.getFullYear() - (today.getMonth() - 3 > 0 ? 0 : 1), (today.getMonth() - 3 + 12) % 12, 1);
        startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        break;
    }

    let url = new URL("http://localhost:3002/otdchart");
    let params = {supplierId: supplierArray[index].id, start: startDate, end: endDate};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: REQUEST_DB_OTD_CHART_DATA_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: REQUEST_DB_OTD_CHART_DATA_FAILURE, payload: error }))
}