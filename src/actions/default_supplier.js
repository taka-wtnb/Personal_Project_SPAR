export const DEFAULT_SUPPLIER = 'DEFAULT_SUPPLIER';

export function setDefaultSupplier(supplierName) {
  return {
    type: DEFAULT_SUPPLIER,
    payload: supplierName,
  };
}