export const REQUEST_SUPPLIERS_PENDING = 'EQUEST_SUPPLIERS_PENDING';
export const REQUEST_SUPPLIERS_SUCCESS = 'REQUEST_SUPPLIERS_SUCCESS';
export const REQUEST_SUPPLIERS_FAILURE = 'REQUEST_SUPPLIERS_FAILURE';

export const requestSuppliers = () => (dispatch) => {
    dispatch({ type: REQUEST_SUPPLIERS_PENDING })
    fetch('http://localhost:3002/suppliers')
      .then(response => response.json())
      .then(data => dispatch({ type: REQUEST_SUPPLIERS_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: REQUEST_SUPPLIERS_FAILURE, payload: error }))
  }