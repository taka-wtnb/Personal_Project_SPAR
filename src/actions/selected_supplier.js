export const DISPLAY_SUPPLIER = 'DISPLAY_SUPPLIER';

export function displaySupplier(supplierName) {
  return {
    type: DISPLAY_SUPPLIER,
    payload: supplierName,
  };
}