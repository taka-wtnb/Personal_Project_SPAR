export const OTD_BEST_TABLE_MONTHS = 'OTD_BEST_TABLE_MONTHS';

export function selectMonths(months) {
  return {
    type: OTD_BEST_TABLE_MONTHS,
    payload: months,
  };
}