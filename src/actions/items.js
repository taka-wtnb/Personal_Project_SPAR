export const REQUEST_ITEMS_PENDING = 'REQUEST_ITEMS_PENDING';
export const REQUEST_ITEMS_SUCCESS = 'REQUEST_ITEMS_SUCCESS';
export const REQUEST_ITEMS_FAILURE = 'REQUEST_ITEMS_FAILURE';

export const requestItems = () => (dispatch) => {
  dispatch({ type: REQUEST_ITEMS_PENDING })
  fetch('http://localhost:3002/items')
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_ITEMS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ITEMS_FAILURE, payload: error }))
}