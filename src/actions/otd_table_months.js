export const OTD_TABLE_MONTHS = 'OTD_TABLE_MONTHS';

export function selectMonths(months) {
  return {
    type: OTD_TABLE_MONTHS,
    payload: months,
  };
}