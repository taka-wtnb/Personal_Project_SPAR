export const OTD_WORST_TABLE_MONTHS = 'OTD_WORST_TABLE_MONTHS';

export function selectMonths(months) {
  return {
    type: OTD_WORST_TABLE_MONTHS,
    payload: months,
  };
}